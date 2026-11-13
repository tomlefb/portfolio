import { expect, test } from '@playwright/test';

const MINORS = [
  { title: 'NutriAI', tech: 'React Native', github: false },
  { title: 'IALocal', tech: 'Ollama', github: true },
  { title: 'Gestion des stages', tech: 'Angular', github: false },
  { title: 'EcoPursue', tech: 'Spring Boot', github: false },
];

test.describe('autres projets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/autres-projets');
  });

  test('porte son titre', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Autres projets');
    await expect(page).toHaveTitle(/Autres projets/);
  });

  test('liste les projets dans l’ordre, avec phrase et technos', async ({ page }) => {
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
  test('reste lisible par un lecteur d’écran, du plus récent au plus ancien', async ({ page }) => {
    await page.goto('/parcours');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Parcours');
    const rows = page.getByTestId('parcours-row');
    await expect(rows).toHaveCount(7);
    await expect(rows.first()).toContainText('Capgemini');
    await expect(rows.last()).toContainText('Baccalauréat');
  });

  test('montre la frise avec ses deux lignes, ses barres et ses stages', async ({ page }) => {
    await page.goto('/parcours');
    const frise = page.getByRole('figure', { name: /Frise du parcours/ });
    await expect(frise).toBeVisible();
    await expect(frise.getByRole('heading', { name: 'Formation' })).toBeVisible();
    await expect(frise.getByRole('heading', { name: 'Expérience' })).toBeVisible();
    for (const title of ['Lycée', 'BTS SIO', 'Bachelor', 'Mastère', 'Alternance Capgemini']) {
      await expect(frise.getByTestId('tl-bar').filter({ hasText: title })).toBeVisible();
    }
    await expect(frise.getByTestId('tl-stage')).toHaveCount(2);
    await expect(frise.getByText('Stage Ouest-France')).toBeVisible();
    await expect(frise.getByText('Stage lycée hôtelier')).toBeVisible();
    await expect(frise.getByText('Aujourd’hui')).toBeVisible();
    await expect(frise.locator('[data-ongoing="true"]')).toHaveCount(2);
  });

  for (const width of [390, 640, 768, 999, 1000, 1024, 1180, 1440, 1920]) {
    test(`aucun libellé ne déborde de sa barre à ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/parcours');
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll('[data-testid="tl-bar"], [data-testid="tl-next"]')].flatMap((bar) => {
          const b = bar.getBoundingClientRect();
          return [...bar.querySelectorAll('.tl__label > *')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1;
            })
            .map((el) => el.textContent);
        }),
      );
      expect(overflow).toEqual([]);
    });
  }

  for (const width of [390, 768, 1440]) {
    test(`l’étiquette « Aujourd’hui » ne chevauche ni une année ni une barre à ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/parcours');
      const hits = await page.evaluate(() => {
        const tag = document.querySelector('.tl__today')!.getBoundingClientRect();
        const others = [...document.querySelectorAll('.tl__year, [data-testid="tl-bar"]')];
        return others
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.left < tag.right && r.right > tag.left && r.top < tag.bottom && r.bottom > tag.top;
          })
          .map((el) => el.textContent);
      });
      expect(hits).toEqual([]);
    });
  }

  test('annonce la suite après l’alternance au bout de la frise', async ({ page }) => {
    await page.goto('/parcours');
    const next = page.getByTestId('tl-next');
    await expect(next).toBeVisible();
    await expect(next).toContainText('Ensuite');
    await expect(next).toContainText('CDI');
    await expect(page.getByText('À la fin de l’alternance, un CDI de développeur full stack, à Rennes ou en télétravail.')).toBeVisible();
  });

  test('résume le parcours en quatre cases, dans l’ordre du temps', async ({ page }) => {
    await page.goto('/parcours');
    const cards = page.getByTestId('parcours-highlight');
    await expect(cards).toHaveCount(4);
    await expect(cards.nth(0)).toContainText('Avant');
    await expect(cards.nth(1)).toContainText('Alternant développeur');
    await expect(cards.nth(2)).toContainText('Mastère');
    await expect(cards.nth(3)).toContainText('Après 2028');
  });

  test('range les technos sur trois lignes', async ({ page }) => {
    await page.goto('/parcours');
    const lines = page.getByTestId('techno-line');
    await expect(lines).toHaveCount(3);
    await expect(lines.nth(0)).toContainText('Au quotidien');
    await expect(lines.nth(2)).toContainText('Déjà utilisé');
  });

  test('met le présent en couleur anis : les deux cases « Aujourd’hui » et les barres en cours', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/parcours');
    const backgrounds = await page
      .getByTestId('parcours-highlight')
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(backgrounds).toEqual(['rgba(0, 0, 0, 0)', 'rgb(201, 232, 106)', 'rgb(201, 232, 106)', 'rgba(0, 0, 0, 0)']);
    const ongoing = page.locator('[data-ongoing="true"]');
    await expect(ongoing).toHaveCount(2);
    for (const image of await ongoing.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundImage))) {
      expect(image).toContain('rgb(201, 232, 106)');
    }
  });

  for (const width of [1440, 1280, 1024]) {
    test(`le cartouche d’une barre en cours est centré en hauteur à ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/parcours');
      const gaps = await page.locator('[data-ongoing="true"]').evaluateAll((bars) =>
        bars.map((bar) => {
          const outer = bar.getBoundingClientRect();
          const label = bar.querySelector('.tl__label')!.getBoundingClientRect();
          return { top: label.top - outer.top, bottom: outer.bottom - label.bottom };
        }),
      );
      for (const gap of gaps) expect(Math.abs(gap.top - gap.bottom)).toBeLessThanOrEqual(1);
    });
  }

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
