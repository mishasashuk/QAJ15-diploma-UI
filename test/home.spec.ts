import { test, expect } from '@playwright/test';

test('home page should open', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Practice Software Testing/);
});