import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/factory/PageFactory';
import { quantityData } from './fixtures/testData';

test.describe('Product Page Test Suite', () => {
  let pages: PageFactory;

  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);

    await pages.homePage.open();
    await pages.homePage.openProductByName('Claw Hammer');
  });

  test('product details page should be opened', async ({ page }) => {
    await expect(page).toHaveURL(/\/product\//);
  });

  test('selected product name should be displayed', async () => {
    await expect(pages.productPage.productTitle).toBeVisible();
    await expect(pages.productPage.productTitle).toHaveText('Claw Hammer');
  });

  test('product image should be available', async () => {
    await expect(pages.productPage.productImage).toBeVisible();
  });

  test('product price should be displayed as valid amount', async () => {
    await expect(pages.productPage.productPrice).toBeVisible();

    const priceText = (await pages.productPage.productPrice.textContent())?.trim() ?? '';
    const priceAmount = Number(priceText.replace(/[^0-9.]/g, ''));

    expect(priceAmount).toBeGreaterThan(0);
  });

  test('quantity field should contain default value', async () => {
    await expect(pages.productPage.quantityInput).toHaveValue(
      quantityData.defaultQuantity
    );
  });

  test('quantity can be increased by plus button', async () => {
    await pages.productPage.increaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(
      quantityData.increasedQuantity
    );
  });

  test('quantity can be decreased after increase', async () => {
    await pages.productPage.increaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(
      quantityData.increasedQuantity
    );

    await pages.productPage.decreaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(
      quantityData.defaultQuantity
    );
  });

  test('add to cart button should be visible and clickable', async () => {
    await expect(pages.productPage.addToCartButton).toBeVisible();
    await expect(pages.productPage.addToCartButton).toBeEnabled();
  });

  test('specifications block should be shown', async () => {
    await expect(pages.productPage.specificationsSection).toBeVisible();
  });

  test('guest user should see authorization message after adding to favourites', async () => {
    await pages.productPage.addToFavourites();

    await expect(pages.productPage.toastMessage).toBeVisible();

    await expect(pages.productPage.toastMessage).toContainText(
      'Unauthorized'
    );
  });
});