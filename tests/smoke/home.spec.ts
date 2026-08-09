import { test, expect } from '@playwright/test';

test.describe('AVI Hotel - Smoke', () => {
  test('la página principal carga correctamente', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/AVI/i);
    await expect(page.getByText('TuHotel', { exact: true })).toBeVisible();
  });
});