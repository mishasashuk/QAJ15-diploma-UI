import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly pageBanner: Locator;

  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly searchClearButton: Locator;
  readonly searchResultTitle: Locator;
  readonly searchResultsGrid: Locator;
  readonly searchResultCards: Locator;
  readonly searchResultNames: Locator;

  readonly paginationPages: Locator;
  readonly nextPage: Locator;
  readonly previousPage: Locator;
  readonly activePaginationPage: Locator;

  readonly sortingDropdown: Locator;

  readonly priceSliderControllerMin: Locator;
  readonly priceSliderControllerMax: Locator;

  constructor(page: Page) {
    super(page);

    this.pageBanner = page.locator(".img-fluid");

    this.productCards = page.locator('a.card[data-test^="product-"]');
    this.productNames = this.productCards.locator("h5");
    this.productPrices = this.productCards.locator(".card-footer");

    this.searchField = page.getByPlaceholder("Search");
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.searchClearButton = page.locator(".btn.btn-warning");
    this.searchResultTitle = page.locator('[data-test="search-caption"]');
    this.searchResultsGrid = page.locator('[data-test="search_completed"]');
    this.searchResultCards = this.searchResultsGrid.locator(
      'a.card[data-test^="product-"]',
    );
    this.searchResultNames = this.searchResultCards.locator("h5");

    this.sortingDropdown = page.locator(".form-select");

    this.priceSliderControllerMin = page.locator(
      ".ngx-slider-span.ngx-slider-pointer.ngx-slider-pointer-min",
    );
    this.priceSliderControllerMax = page.locator(
      ".ngx-slider-span.ngx-slider-pointer.ngx-slider-pointer-max",
    );

    this.previousPage = page.locator('[data-test="pagination-prev"]');
    this.nextPage = page.locator('[data-test="pagination-next"]');
    this.paginationPages = page.locator('.page-link[aria-label^="Page-"]');
    this.activePaginationPage = page.locator("li.page-item.active .page-link");
  }

  async open() {
    await this.navigate("/");
  }

  async search(query: string) {
    await this.searchField.fill(query);
    await this.searchButton.click();
  }

  async clearSearch() {
    await this.searchClearButton.click();
  }

  async sortProducts(option: string) {
    await this.sortingDropdown.selectOption({ label: option });
  }

  async moveMinSliderRight() {
    await this.priceSliderControllerMin.focus();
    await this.priceSliderControllerMin.press("ArrowRight");
  }

  async moveMaxSliderLeft() {
    await this.priceSliderControllerMax.focus();
    await this.priceSliderControllerMax.press("ArrowLeft");
  }

  pageButton(pageNumber: number): Locator {
    return this.page.locator(`.page-link[aria-label="Page-${pageNumber}"]`);
  }

  async goToPage(pageNumber: number) {
    await this.pageButton(pageNumber).click();
  }

  async goToNextPage() {
    await this.nextPage.click();
  }

  async goToPrevPage() {
    await this.previousPage.click();
  }

  async countProducts() {
    await this.productCards.first().waitFor();
    return this.productCards.count();
  }

  async openProductByName(name: string) {
    await Promise.all([
      this.page.waitForURL(/\/product\//, { timeout: 15000 }),
      this.page
        .locator('[data-test="product-name"]')
        .getByText(name, { exact: true })
        .click(),
    ]);
  }

  async clickRandomProduct() {
    const count = await this.productCards.count();

    if (count === 0) {
      throw new Error("No products to click");
    }

    const randomIndex = Math.floor(Math.random() * count);
    await this.productCards.nth(randomIndex).click();
  }
}
