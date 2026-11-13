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
  await expect(page.getByRole('link', { name: "Retour à l’accueil" })).toHaveAttribute('href', '/');
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

test('le pied de page donne les moyens de contact et les pages du site', async ({ page }) => {
  await page.goto('/parcours');
  const footer = page.locator('#contact');
  await expect(footer.getByRole('heading', { level: 2, name: 'Contact' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'tom.lefevrebonzon@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:tom.lefevrebonzon@gmail.com',
  );
  for (const name of ['LinkedIn', 'GitHub', 'CV (PDF)', '06 50 33 60 95', 'Code source']) {
    await expect(footer.getByRole('link', { name })).toBeVisible();
  }
  const pages = footer.getByRole('navigation', { name: 'Pages du site' });
  await expect(pages.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
  await expect(pages.getByRole('link', { name: 'Autres projets' })).toHaveAttribute('href', '/autres-projets');
  await expect(pages.getByRole('link', { name: 'Parcours' })).toHaveAttribute('href', '/parcours');
  await expect(footer.getByText(/Écrivez-moi|fait à la main|Mis à jour/i)).toHaveCount(0);
});

test('le bouton Copier copie l’adresse et le confirme', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.locator('#contact').getByRole('button', { name: 'Copier l’adresse e-mail' }).click();
  await expect(page.locator('#contact').getByText('Adresse copiée')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('tom.lefevrebonzon@gmail.com');
});

test('le pied de page reste discret', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const box = await page.locator('#contact').boundingBox();
  expect(box!.height).toBeLessThanOrEqual(360);
  const size = await page
    .locator('#contact')
    .getByRole('link', { name: 'tom.lefevrebonzon@gmail.com' })
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeLessThanOrEqual(64);
});

test('« Projets » est marqué comme page active sur les pages de projets', async ({ page }) => {
  for (const route of ['/projets/vizly', '/autres-projets']) {
    await page.goto(route);
    const nav = page.getByRole('navigation', { name: 'Navigation principale' });
    await expect(nav.getByRole('link', { name: 'Projets', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Parcours', exact: true })).not.toHaveAttribute('aria-current', 'page');
  }
});

test('un lien d’évitement mène au contenu dès la première tabulation', async ({ page }) => {
  await page.goto('/parcours');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Aller au contenu' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await skip.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('chaque page suit un ordre de titres sans saut', async ({ page }) => {
  for (const route of ['/', '/projets/tti', '/autres-projets', '/parcours']) {
    await page.goto(route);
    const levels = await page.locator('main h1, main h2, main h3, main h4').evaluateAll((els) =>
      els.filter((el) => !el.closest('.sr-only')).map((el) => Number(el.tagName[1])),
    );
    expect(levels[0], route).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1], `${route} : titre ${i}`).toBeLessThanOrEqual(1);
    }
  }
});

test('la page introuvable a son titre d’onglet et son pied de page en bas', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/inconnu');
  await expect(page).toHaveTitle(/Page introuvable/);
  const footerBottom = await page.locator('#contact').evaluate((el) => el.getBoundingClientRect().bottom);
  expect(footerBottom).toBeGreaterThanOrEqual(899);
});

for (const width of [1440, 390]) {
  test(`« Contact » mène au pied de page et y signale l’adresse à ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/parcours');
    await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Contact', exact: true }).click();
    const footer = page.locator('#contact');
    await expect(footer).toBeInViewport();
    await expect(footer).toHaveClass(/ft--called/);
    await expect(footer.getByRole('link', { name: 'tom.lefevrebonzon@gmail.com' })).toBeFocused();
    await expect(footer).not.toHaveClass(/ft--called/, { timeout: 4000 });
  });
}

test('« Contact » signale l’adresse même quand le pied de page est déjà visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/inconnu');
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.locator('#contact')).toHaveClass(/ft--called/);
});

test('sur mobile, les liens forment une grille de quatre cases égales, la page active en noir', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/parcours');
  const links = page.getByRole('navigation', { name: 'Navigation principale' }).locator('.site-nav__links a');
  await expect(links).toHaveCount(4);
  const boxes = await links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect()).map((r) => ({ top: Math.round(r.top), width: Math.round(r.width) })));
  expect(new Set(boxes.map((b) => b.top)).size).toBe(1);
  expect(Math.max(...boxes.map((b) => b.width)) - Math.min(...boxes.map((b) => b.width))).toBeLessThanOrEqual(1);
  await expect(links.filter({ hasText: 'Parcours' })).toHaveCSS('background-color', 'rgb(14, 14, 14)');
});
