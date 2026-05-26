import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page, '/');

    this.pageTitle = page.locator('[data-test="page-title"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.productCards = page.locator('.card');
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
  }

  async getProductsCount() {
    return this.productCards.count();
  }
}