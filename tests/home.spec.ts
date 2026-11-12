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
});
