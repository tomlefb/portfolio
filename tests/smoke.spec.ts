import { expect, test } from '@playwright/test';
import { collectErrors } from './helpers';

test("l'accueil répond sans erreur console", async ({ page }) => {
  const errors = collectErrors(page);
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toBeVisible();
  expect(errors).toEqual([]);
});
