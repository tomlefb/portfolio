import { expect, test, type Page } from '@playwright/test';

/** Largeur de la page et proportions de quelques repères, rapportées à la largeur de l'écran. */
async function measure(page: Page, width: number, height = Math.round((width * 9) / 16)) {
  await page.setViewportSize({ width, height });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const view = document.documentElement.clientWidth;
    const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
    const shell = rect('.shell');
    return {
      shellLeft: shell.left,
      shellWidth: shell.width,
      view,
      capped: document.documentElement.dataset.capped === 'true',
      nameRatio: rect('[data-testid="hero"] h1').width / view,
      navLinkRatio: rect('nav a[href="/parcours"]').height / view,
      introRatio: rect('[data-testid="hero"] p').height / view,
      navFontPx: parseFloat(getComputedStyle(document.querySelector('nav a[href="/parcours"]')!).fontSize),
      zoom: Number(getComputedStyle(document.querySelector('.shell')!).zoom),
    };
  });
}

test('de 1600 à 3840 px, la page remplit l’écran et tout grossit dans les mêmes proportions', async ({ page }) => {
  const reference = await measure(page, 1600);
  for (const width of [1920, 2560, 3200, 3840]) {
    const wide = await measure(page, width);
    expect(Math.abs(wide.shellWidth - wide.view), `largeur à ${width}`).toBeLessThanOrEqual(2);
    expect(Math.abs(wide.shellLeft), `marge à ${width}`).toBeLessThanOrEqual(1);
    expect(wide.capped, `bandes latérales à ${width}`).toBe(false);
    expect(wide.nameRatio, `nom à ${width}`).toBeCloseTo(reference.nameRatio, 2);
    expect(wide.navLinkRatio, `navigation à ${width}`).toBeCloseTo(reference.navLinkRatio, 3);
    expect(wide.introRatio, `présentation à ${width}`).toBeCloseTo(reference.introRatio, 2);
  }
});

test('en 1920×1080, la navigation et les textes sont agrandis de 20 %', async ({ page }) => {
  const fullHd = await measure(page, 1920, 1080);
  expect(fullHd.zoom).toBeCloseTo(1.2, 2);
});

test('sur un écran très bas, le grossissement est limité par la hauteur et la page reste centrée', async ({ page }) => {
  const ultra = await measure(page, 3440, 1440);
  expect(ultra.zoom).toBeCloseTo(1440 / 760, 2);
  expect(ultra.capped).toBe(true);
  expect(ultra.shellWidth).toBeCloseTo(1600 * (1440 / 760), -1);
  expect(ultra.shellLeft).toBeCloseTo((ultra.view - ultra.shellWidth) / 2, -1);
  // La page de garde tient tout l'écran : le nom en entier, les projets juste en dessous.
  const nameBottom = await page.locator('.hm-hero h1').evaluate((el) => el.getBoundingClientRect().bottom);
  expect(nameBottom).toBeLessThan(1440);
  const fold = await page.locator('.hm-rubric').evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.abs(fold - 1440)).toBeLessThanOrEqual(2);
});

test('au-delà de 3840 px, la page s’arrête de grossir et reste centrée', async ({ page }) => {
  const huge = await measure(page, 4600);
  expect(huge.shellWidth).toBeCloseTo(3840, -1);
  expect(huge.shellLeft).toBeCloseTo((huge.view - 3840) / 2, -1);
  expect(huge.capped).toBe(true);
});

test('en dessous de 1600 px, rien n’est agrandi', async ({ page }) => {
  const laptop = await measure(page, 1440, 900);
  expect(laptop.shellWidth).toBeCloseTo(1440, 0);
  expect(laptop.zoom).toBe(1);
  expect(laptop.capped).toBe(false);
});
