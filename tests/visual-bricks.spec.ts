import { expect, test } from '@playwright/test';

test.describe('briques visuelles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__bricks');
  });

  test('un cadre de téléphone garde son format et montre le texte de remplacement si l’image manque', async ({
    page,
  }) => {
    const frame = page.getByTestId('phone-missing');
    await expect(frame.getByText('Écran introuvable de démonstration')).toBeVisible();
    await expect(frame.locator('img')).toHaveCount(0);
    const box = await frame.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width / box!.height).toBeCloseTo(430 / 932, 1);
  });

  test('une capture garde ses dimensions et montre le texte de remplacement si l’image manque', async ({
    page,
  }) => {
    const shot = page.getByTestId('shot-missing');
    await expect(shot.getByText('Capture introuvable de démonstration')).toBeVisible();
    const box = await shot.boundingBox();
    expect(box!.height).toBeGreaterThan(100);
  });

  test('une image présente s’affiche dans son cadre', async ({ page }) => {
    const img = page.getByTestId('phone-ok').locator('img');
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  });
});
