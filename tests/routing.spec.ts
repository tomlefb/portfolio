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
  await expect(footer.getByRole('heading', { name: 'Écrivez-moi' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'tom.lefevrebonzon@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:tom.lefevrebonzon@gmail.com',
  );
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
});
