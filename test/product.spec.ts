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

  test('product page opens successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/product\//);
  });

  test('product title is visible and correct', async () => {
    await expect(pages.productPage.productTitle).toBeVisible();
    await expect(pages.productPage.productTitle).toHaveText('Claw Hammer');
  });

  test('product image is visible', async () => {
    await expect(pages.productPage.productImage).toBeVisible();
  });

  test('product price is visible and valid', async () => {
    await expect(pages.productPage.productPrice).toBeVisible();

    const priceText = (await pages.productPage.productPrice.textContent())?.trim() ?? '';

    const priceValue = Number(priceText.replace(/[^0-9.]/g, ''));

    expect(priceValue).toBeGreaterThan(0);
  });

  test('quantity input has default value', async () => {
    await expect(pages.productPage.quantityInput).toHaveValue(quantityData.defaultQuantity);
  });

  test('user can increase quantity', async () => {
    await pages.productPage.increaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(quantityData.increasedQuantity);
  });

  test('user can decrease quantity after increasing', async () => {
    await pages.productPage.increaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(quantityData.increasedQuantity);

    await pages.productPage.decreaseQuantity();

    await expect(pages.productPage.quantityInput).toHaveValue(quantityData.defaultQuantity);
  });

  test('add to cart button is visible and enabled', async () => {
    await expect(pages.productPage.addToCartButton).toBeVisible();
    await expect(pages.productPage.addToCartButton).toBeEnabled();
  });

  test('product description is visible', async () => {
    await expect(pages.productPage.productDescription).toBeVisible();
    await expect(pages.productPage.productDescription).toHaveText(/\S/);
  });

  test('unauthorized user gets error after add to favourites', async () => {
    await pages.productPage.addToFavourites();

    await expect(pages.productPage.toastMessage).toBeVisible();

    await expect(pages.productPage.toastMessage).toContainText('Unauthorized, can not add product to your favorite list.');
  });
});
