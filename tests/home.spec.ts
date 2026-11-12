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

  test('renvoie vers la page des autres projets en les nommant', async ({ page }) => {
    const teaser = page.getByTestId('others-teaser');
    await expect(teaser).toHaveAttribute('href', '/autres-projets');
    for (const name of ['NutriAI', 'IALocal', 'Gestion des stages', 'EcoPursue']) {
      await expect(teaser.getByText(name)).toBeVisible();
    }
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
