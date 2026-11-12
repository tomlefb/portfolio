import { expect, test } from '@playwright/test';

const MINORS = [
  { title: 'NutriAI', tech: 'React Native', github: false },
  { title: 'IALocal', tech: 'Ollama', github: true },
  { title: 'Gestion des stages', tech: 'Angular', github: false },
  { title: 'EcoPursue', tech: 'Spring Boot', github: false },
  { title: 'FairsonJob Notifier', tech: 'ntfy', github: false },
];

test.describe('autres projets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/autres-projets');
  });

  test('porte son titre', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Autres projets');
    await expect(page).toHaveTitle(/Autres projets/);
  });

  test('liste les cinq projets dans l’ordre, avec phrase et technos', async ({ page }) => {
    const cards = page.getByTestId('minor-project');
    await expect(cards).toHaveCount(MINORS.length);
    for (const [index, minor] of MINORS.entries()) {
      const card = cards.nth(index);
      await expect(card.getByRole('heading', { level: 2 })).toHaveText(minor.title);
      await expect(card.getByTestId('minor-tagline')).not.toBeEmpty();
      await expect(card.getByRole('list', { name: 'Technologies' })).toContainText(minor.tech);
      await expect(card.getByRole('link', { name: /GitHub/ })).toHaveCount(minor.github ? 1 : 0);
    }
  });
});

test.describe('parcours', () => {
  test('commence par le poste actuel et descend dans le temps', async ({ page }) => {
    await page.goto('/parcours');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Parcours');
    const rows = page.getByTestId('parcours-row');
    await expect(rows).toHaveCount(7);
    await expect(rows.first()).toContainText('Capgemini');
    await expect(rows.first()).toHaveAttribute('data-current', 'true');
    await expect(rows.last()).toContainText('Baccalauréat');
    await expect(page.locator('[data-current="true"]')).toHaveCount(1);
  });

  test('range les technos sur trois lignes', async ({ page }) => {
    await page.goto('/parcours');
    const lines = page.getByTestId('techno-line');
    await expect(lines).toHaveCount(3);
    await expect(lines.nth(0)).toContainText('Au quotidien');
    await expect(lines.nth(2)).toContainText('Déjà utilisé');
  });

  test('montre le portrait sur grand écran', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/parcours');
    await expect(page.getByAltText('Portrait de Tom Lefevre-Bonzon')).toBeVisible();
  });

  test('masque le portrait sur mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/parcours');
    await expect(page.getByAltText('Portrait de Tom Lefevre-Bonzon')).toBeHidden();
  });
});
