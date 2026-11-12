import { expect, test } from '@playwright/test';
import { ROUTES } from './helpers';

for (const route of ROUTES) {
  test(`chargement direct de ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Page introuvable')).toHaveCount(0);
  });
}

test('une adresse inconnue affiche la page introuvable', async ({ page }) => {
  await page.goto('/inconnu');
  await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible();
  await expect(page.getByRole('link', { name: "Retour à l'accueil" })).toHaveAttribute('href', '/');
});

test('la navigation mobile montre ses liens sans menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  for (const name of ['Projets', 'Parcours', 'Contact', 'CV']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  }
  await expect(nav.getByRole('button')).toHaveCount(0);
});

test('le pied de page donne les moyens de contact', async ({ page }) => {
  await page.goto('/parcours');
  const footer = page.locator('#contact');
  await expect(footer.getByRole('heading', { level: 2, name: 'Contact' })).toBeVisible();
  for (const name of ['LinkedIn', 'GitHub', 'CV (PDF)', '06 50 33 60 95', 'Code source']) {
    await expect(footer.getByRole('link', { name })).toBeVisible();
  }
  await expect(footer.getByText(/Écrivez-moi|fait à la main|Mis à jour/i)).toHaveCount(0);
});

test('un clic sur l’adresse la copie et le confirme', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const copy = page.locator('#contact').getByRole('button', { name: /tom\.lefevrebonzon@gmail\.com/ });
  await copy.click();
  await expect(page.locator('#contact').getByText('Adresse copiée')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('tom.lefevrebonzon@gmail.com');
});

test('le pied de page reste discret', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const box = await page.locator('#contact').boundingBox();
  expect(box!.height).toBeLessThanOrEqual(340);
  const size = await page
    .locator('#contact')
    .getByRole('button', { name: /tom\.lefevrebonzon@gmail\.com/ })
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeLessThanOrEqual(64);
});
