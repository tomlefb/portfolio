import { expect, test } from '@playwright/test';

const MAJORS = [
  { id: 'vizly', title: 'Vizly', next: 'TTI', nextHref: '/projets/tti', sections: ["Ce que j’ai fait", 'Comment c’est construit', 'Le plus dur'] },
  { id: 'tti', title: 'TTI', next: 'CYNA', nextHref: '/projets/cyna', sections: ['La méthode', 'Comment c’est construit', 'Ce qui n’a pas marché', 'Le plus dur'] },
  { id: 'cyna', title: 'CYNA', next: 'Vizly', nextHref: '/projets/vizly', sections: ["Ce que j’ai fait", 'Comment c’est construit', "L’organisation", 'Le plus dur'] },
];

for (const project of MAJORS) {
  test.describe(`page du projet ${project.id}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/projets/${project.id}`);
    });

    test('porte le titre du projet et ses quatre faits', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
      await expect(page.getByTestId('fact')).toHaveCount(4);
      await expect(page.getByTestId('fact').first()).toContainText('Mon rôle');
    });

    test('affiche chaque section annoncée', async ({ page }) => {
      for (const title of project.sections) {
        await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible();
      }
    });

    test('ramène à la liste des projets', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Tous les projets' })).toHaveAttribute('href', '/#projets');
    });

    test('mène au projet suivant', async ({ page }) => {
      const next = page.getByRole('link', { name: new RegExp(`Projet suivant.*${project.next}`, 'i') });
      await expect(next).toHaveAttribute('href', project.nextHref);
    });

    test('met le nom du projet dans le titre de l’onglet', async ({ page }) => {
      await expect(page).toHaveTitle(new RegExp(project.title));
    });
  });
}

test('la page TTI ne montre aucun montant ni pourcentage', async ({ page }) => {
  await page.goto('/projets/tti');
  const text = await page.locator('main').innerText();
  expect(text).not.toMatch(/[€$%]/);
});

test('la page Vizly mène au site en ligne, pas la page TTI', async ({ page }) => {
  await page.goto('/projets/vizly');
  await expect(page.getByRole('link', { name: 'Voir le site' })).toHaveAttribute('href', 'https://www.vizly.fr');
  await page.goto('/projets/tti');
  await expect(page.getByRole('link', { name: 'Voir le site' })).toHaveCount(0);
});

for (const id of ['ialocal', 'xyz']) {
  test(`/projets/${id} affiche « Projet introuvable »`, async ({ page }) => {
    await page.goto(`/projets/${id}`);
    await expect(page.getByRole('heading', { name: 'Projet introuvable' })).toBeVisible();
    await expect(page.getByRole('link', { name: "Retour à l’accueil" })).toBeVisible();
  });
}

for (const id of ['vizly', 'tti', 'cyna']) {
  test(`sur mobile, l’aplat de l’en-tête de ${id} ne coupe aucune lettre du titre`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/projets/${id}`);
    await page.evaluate(() => document.fonts.ready);
    const { titleRight, blockLeft } = await page.evaluate(() => {
      const title = document.querySelector('.pj-head__title')!;
      const range = document.createRange();
      range.selectNodeContents(title);
      const rects = [...range.getClientRects()];
      return {
        titleRight: Math.max(...rects.map((r) => r.right)),
        blockLeft: document.querySelector('.pj-head__block')!.getBoundingClientRect().left,
      };
    });
    expect(blockLeft).toBeGreaterThanOrEqual(titleRight - 1);
  });
}
