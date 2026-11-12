import { expect, test, type Page } from '@playwright/test';

/** Largeur de la page et proportions de quelques repères, rapportées à la largeur de l'écran. */
async function measure(page: Page, width: number) {
  await page.setViewportSize({ width, height: Math.round((width * 9) / 16) });
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
      nameRatio: rect('[data-testid="hero"] h1').width / view,
      navLinkRatio: rect('nav a[href="/parcours"]').height / view,
      introRatio: rect('[data-testid="hero"] p').height / view,
    };
  });
}

test('de 1920 à 3840 px, la page remplit l’écran et tout grossit dans les mêmes proportions', async ({ page }) => {
  const reference = await measure(page, 1920);
  for (const width of [2560, 3200, 3840]) {
    const wide = await measure(page, width);
    expect(Math.abs(wide.shellWidth - wide.view), `largeur à ${width}`).toBeLessThanOrEqual(2);
    expect(Math.abs(wide.shellLeft), `marge à ${width}`).toBeLessThanOrEqual(1);
    expect(wide.nameRatio, `nom à ${width}`).toBeCloseTo(reference.nameRatio, 2);
    expect(wide.navLinkRatio, `navigation à ${width}`).toBeCloseTo(reference.navLinkRatio, 3);
    expect(wide.introRatio, `présentation à ${width}`).toBeCloseTo(reference.introRatio, 2);
  }
});

test('au-delà de 3840 px, la page s’arrête de grossir et reste centrée', async ({ page }) => {
  const huge = await measure(page, 4600);
  expect(huge.shellWidth).toBeCloseTo(3840, -1);
  expect(huge.shellLeft).toBeCloseTo((huge.view - 3840) / 2, -1);
});

test('en dessous de 1920 px, rien n’est agrandi', async ({ page }) => {
  const laptop = await measure(page, 1440);
  expect(laptop.shellWidth).toBeCloseTo(1440, 0);
  const zoom = await page.evaluate(() => getComputedStyle(document.querySelector('.shell')!).zoom);
  expect(Number(zoom)).toBe(1);
});
