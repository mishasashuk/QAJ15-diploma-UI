import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productImage: Locator;
  readonly productPrice: Locator;

  readonly quantityInput: Locator;
  readonly quantityDecreaseButton: Locator;
  readonly quantityIncreaseButton: Locator;

  readonly addToCartButton: Locator;
  readonly addToFavouritesButton: Locator;

  readonly categoryValue: Locator;
  readonly brandValue: Locator;
  readonly productDescription: Locator;
  readonly specificationsSection: Locator;

  readonly toastMessage: Locator;
  readonly alertMessage: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.locator('[data-test="product-name"]');
    this.productImage = page.locator(".figure-img.img-fluid");
    this.productPrice = page.locator('[data-test="unit-price"]');

    this.quantityDecreaseButton = page.locator("#btn-decrease-quantity");
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.quantityIncreaseButton = page.locator("#btn-increase-quantity");

    this.addToCartButton = page.locator("#btn-add-to-cart");
    this.addToFavouritesButton = page.locator("#btn-add-to-favorites");

    this.categoryValue = page.locator('[aria-label="category"]');
    this.brandValue = page.locator('[aria-label="brand"]');
    this.productDescription = page.locator("#description");
    this.specificationsSection = page.locator('[data-test="specs-title"]');

    this.toastMessage = page.locator('[role="alert"]');
    this.alertMessage = page.locator('.alert, [role="alert"]');
    this.cartBadge = page.locator(
      '[data-test="cart-quantity"], .cart-quantity',
    );
  }

  async setQuantity(value: string) {
    await this.quantityInput.fill(value);
  }

  async increaseQuantity() {
    await this.quantityIncreaseButton.click();
  }

  async decreaseQuantity() {
    await this.quantityDecreaseButton.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToFavourites() {
    await this.addToFavouritesButton.click();
  }
}
