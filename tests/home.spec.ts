import { expect, test } from '@playwright/test';

test.describe('accueil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('affiche le nom en titre principal', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('Tom');
    await expect(h1).toContainText('Lefevre-Bonzon');
  });

  test('présente Tom en deux phrases et deux faits', async ({ page }) => {
    const hero = page.getByTestId('hero');
    await expect(hero.getByText('Je développe des applications complètes')).toBeVisible();
    await expect(hero.getByText('Alternant développeur, Capgemini')).toBeVisible();
    await expect(hero.getByText('Mastère Développement Full Stack, Sup de Vinci')).toBeVisible();
  });

  test('mène aux trois projets majeurs, dans l’ordre', async ({ page }) => {
    const links = page.locator('#projets a[data-testid="spread"]');
    await expect(links).toHaveCount(3);
    await expect(links.nth(0)).toHaveAttribute('href', '/projets/vizly');
    await expect(links.nth(1)).toHaveAttribute('href', '/projets/tti');
    await expect(links.nth(2)).toHaveAttribute('href', '/projets/cyna');
    for (const title of ['Vizly', 'TTI', 'CYNA']) {
      await expect(page.locator('#projets').getByRole('heading', { level: 2, name: title, exact: true })).toBeVisible();
    }
  });

  test('liste les autres projets en index, chacun menant à sa fiche', async ({ page }) => {
    const index = page.getByTestId('others-index');
    await expect(index.getByRole('link', { name: 'Tous les détails' })).toHaveAttribute('href', '/autres-projets');
    const rows = index.getByTestId('others-row');
    await expect(rows).toHaveCount(4);
    const expected = [
      ['NutriAI', '/autres-projets#nutriai'],
      ['IALocal', '/autres-projets#ialocal'],
      ['Stages', '/autres-projets#lycee-hotelier'],
      ['EcoPursue', '/autres-projets#ecopursue'],
    ];
    for (const [i, [name, href]] of expected.entries()) {
      await expect(rows.nth(i)).toHaveAttribute('href', href);
      await expect(rows.nth(i).getByRole('heading', { level: 3 })).toHaveText(name);
    }
    // Pas d'image qui surgit au survol : l'index reste typographique.
    await expect(index.locator('img')).toHaveCount(0);
  });

  test('une ligne de l’index passe en gris au survol', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Sans défilement doux : sinon la souris peut survoler une autre ligne pendant que la page défile.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const row = page.getByTestId('others-row').first();
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    // Sur l'accueil, le survol reste en gris : les couleurs des petits projets sont réservées à leur page.
    await expect(row).toHaveCSS('background-color', 'rgb(211, 213, 215)');
    await expect(row).toHaveCSS('color', 'rgb(14, 14, 14)');
  });

  test('un lien de l’index amène au bon projet sur la page Autres projets', async ({ page }) => {
    await page.getByTestId('others-row').nth(3).click();
    await expect(page).toHaveURL(/\/autres-projets#ecopursue$/);
    await expect(page.locator('#ecopursue')).toBeInViewport();
    await expect(page.locator('#ecopursue').getByRole('button', { name: 'EcoPursue' })).toHaveAttribute('aria-expanded', 'true');
  });

  test('donne un nom court à chaque lien de projet', async ({ page }) => {
    for (const title of ['Vizly', 'TTI', 'CYNA']) {
      await expect(page.getByRole('link', { name: `Voir le projet ${title}`, exact: true })).toBeVisible();
    }
  });

  test('ramène aux projets à chaque clic sur « Projets », même deux fois de suite', async ({ page }) => {
    const link = page.getByRole('navigation').getByRole('link', { name: 'Projets', exact: true });
    await link.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await link.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  });

  test('ne mentionne plus FairsonJob', async ({ page }) => {
    await expect(page.getByText(/FairsonJob/i)).toHaveCount(0);
  });

  test('ne montre pas le portrait', async ({ page }) => {
    await expect(page.locator('img[src*="profile"]')).toHaveCount(0);
  });

  test('ne parle pas de recherche d’alternance', async ({ page }) => {
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/recherche (d['’])?alternance|chef de projet it/i);
  });

  for (const width of [640, 860, 1000, 1200, 1440]) {
    test(`ne pose pas la présentation sur le nom à ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overlaps = await page.evaluate(() => {
        const name = [...document.querySelectorAll('[data-testid="hero"] h1 span')].map((el) => el.getBoundingClientRect());
        const texts = [...document.querySelectorAll('[data-testid="hero"] p, [data-testid="hero"] dt, [data-testid="hero"] dd')];
        return texts
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return name.some((n) => r.left < n.right && r.right > n.left && r.top < n.bottom - 4 && r.bottom > n.top + 4);
          })
          .map((el) => el.textContent?.slice(0, 30));
      });
      expect(overlaps).toEqual([]);
    });
  }
});

test.describe('page de garde', () => {
  for (const [width, height] of [
    [390, 844],
    [768, 1024],
    [1280, 800],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ]) {
    test(`occupe tout l’écran en ${width}×${height}, les projets ne viennent qu’en défilant`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const fold = await page.locator('.hm-rubric').evaluate((el) => el.getBoundingClientRect().top);
      expect(Math.abs(fold - height)).toBeLessThanOrEqual(2);
      const nameBottom = await page.locator('.hm-hero h1').evaluate((el) => el.getBoundingClientRect().bottom);
      expect(nameBottom).toBeLessThan(height);
    });
  }
});

test.describe('renvoi vers le parcours', () => {
  for (const width of [1440, 1024, 390]) {
    test(`l’accueil se termine par PARCOURS sur un aplat anis, texte centré dans l’aplat, à ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const teaser = page.getByRole('link', { name: /Parcours/ }).filter({ has: page.locator('.hm-pc__title') });
      await expect(teaser).toHaveAttribute('href', '/parcours');
      await expect(teaser.locator('.hm-pc__block')).toHaveCSS('background-color', 'rgb(201, 232, 106)');
      await expect(teaser.getByText('Voir le parcours')).toBeVisible();
      if (width >= 640) {
        // Le texte est centré dans la partie visible de l'aplat (après le « S » mordu), en hauteur et en largeur.
        const offsets = await teaser.evaluate((el) => {
          const band = el.getBoundingClientRect();
          const block = el.querySelector('.hm-pc__block')!.getBoundingClientRect();
          const title = el.querySelector('.hm-pc__title')!.getBoundingClientRect();
          const cap = el.querySelector('.hm-pc__cap')!.getBoundingClientRect();
          const visibleLeft = Math.max(block.left, title.right);
          return {
            vertical: Math.abs((cap.top + cap.bottom) / 2 - (band.top + band.bottom) / 2),
            horizontal: Math.abs((cap.left + cap.right) / 2 - (visibleLeft + block.right) / 2),
          };
        });
        expect(offsets.vertical).toBeLessThanOrEqual(4);
        expect(offsets.horizontal).toBeLessThanOrEqual(8);
      }
    });
  }
});

for (const width of [360, 390, 430]) {
  test(`sur mobile, chaque ligne du nom prend toute la largeur sans déborder à ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const lines = await page.locator('.hm-hero__first, .hm-hero__part').evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, text: el.textContent };
      }),
    );
    expect(lines.map((l) => l.text)).toEqual(['Tom', 'Lefevre-', 'Bonzon']);
    const available = width - 2 * 16;
    for (const line of lines) {
      expect(line.right, line.text!).toBeLessThanOrEqual(width - 16 + 1);
      expect(line.right - line.left, line.text!).toBeGreaterThanOrEqual(available * 0.95);
    }
  });
}

test('sur mobile, l’aplat de chaque projet laisse une bande grise et le texte est sur le gris', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const id of ['vizly', 'tti', 'cyna']) {
    const spread = page.locator(`.hm-${id}`);
    const { block, art, cap } = await spread.evaluate((el) => ({
      block: el.querySelector('.hm-block')!.getBoundingClientRect().width,
      art: el.querySelector('.hm-art')!.getBoundingClientRect().width,
      cap: getComputedStyle(el.querySelector('.hm-cap')!).backgroundColor,
    }));
    expect(block, id).toBeLessThan(art * 0.85);
    expect(cap, id).toBe('rgba(0, 0, 0, 0)');
  }
});
