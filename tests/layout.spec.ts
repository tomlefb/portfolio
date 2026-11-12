import { expect, test } from '@playwright/test';
import { ROUTES } from './helpers';

const LAYOUT_WIDTHS = [390, 640, 700, 768, 860, 1000, 1024, 1180, 1440];

/** Fait défiler toute la page pour charger les images différées, puis remonte. */
async function loadWholePage(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

for (const route of ROUTES) {
  for (const width of LAYOUT_WIDTHS) {
    test.describe(`${route} à ${width} px`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await loadWholePage(page);
      });

      test('ne défile pas horizontalement', async ({ page }) => {
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });

      test('charge toutes ses images', async ({ page }) => {
        const broken = await page.evaluate(() =>
          [...document.images].filter((img) => img.offsetParent !== null && img.naturalWidth === 0).map((img) => img.src),
        );
        expect(broken).toEqual([]);
      });

      test('ne recouvre aucun texte', async ({ page }) => {
        // Pour chaque titre et paragraphe visible, le point central de chaque ligne de texte
        // doit appartenir à l'élément lui-même (ou à l'un de ses descendants ou ancêtres directs de lien).
        const covered = await page.evaluate(() => {
          const results: string[] = [];
          const nodes = document.querySelectorAll('main h1, main h2, main p, main li, main dd, main dt, footer a');
          for (const node of nodes) {
            const el = node as HTMLElement;
            if (el.offsetParent === null || el.closest('[aria-hidden="true"]') || el.closest('svg')) continue;
            const range = document.createRange();
            range.selectNodeContents(el);
            for (const rect of range.getClientRects()) {
              if (rect.width < 4 || rect.height < 4) continue;
              const x = rect.left + rect.width / 2;
              const y = rect.top + rect.height / 2 + window.scrollY;
              window.scrollTo(0, Math.max(0, y - window.innerHeight / 2));
              const top = document.elementFromPoint(x, y - window.scrollY);
              if (!top) continue;
              if (!(el.contains(top) || top.contains(el))) {
                results.push(`${el.tagName} « ${el.textContent?.trim().slice(0, 40)} » recouvert par ${top.tagName}.${top.className}`);
                break;
              }
            }
          }
          window.scrollTo(0, 0);
          return results;
        });
        expect(covered).toEqual([]);
      });
    });
  }

  test(`${route} : texte courant d'au moins 16 px sur mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('main p, main li, main dd')]
        .filter((el) => (el as HTMLElement).offsetParent !== null && !el.closest('svg'))
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 14)
        .map((el) => `${el.className || el.tagName} ${getComputedStyle(el).fontSize}`),
    );
    expect(small).toEqual([]);
    const body = await page.evaluate(() =>
      [...document.querySelectorAll('.pj-section__text, .mn__text, .hm-cap > p:first-child, .pc-row__text, .hm-hero__text > p')]
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
        .map((el) => `${el.className} ${getComputedStyle(el).fontSize}`),
    );
    expect(body).toEqual([]);
  });

  test(`${route} : tout le contenu reste visible sans animation`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('main h1, main h2, main p')]
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .filter((el) => {
          let node: Element | null = el;
          while (node) {
            if (parseFloat(getComputedStyle(node).opacity) < 1 && !node.matches('.hm-cap__meta, .mn__meta, .pc-row__place, dt')) return true;
            node = node.parentElement;
          }
          return false;
        })
        .map((el) => el.textContent?.trim().slice(0, 40)),
    );
    expect(hidden).toEqual([]);
  });
}

test('chaque lien de l’accueil reçoit un contour de focus visible', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('a').count();
  for (let i = 0; i < Math.min(count, 12); i += 1) {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return { tag: el.tagName, width: parseFloat(style.outlineWidth), style: style.outlineStyle };
    });
    expect(outline.tag).toBe('A');
    expect(outline.width).toBeGreaterThanOrEqual(2);
    expect(outline.style).not.toBe('none');
  }
});
