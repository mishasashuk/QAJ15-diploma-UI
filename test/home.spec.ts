import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/factory/PageFactory';
import { searchData, sortingOptions } from './fixtures/testData';

test.describe('Home Page Test Suite', () => {
  let pages: PageFactory;

  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);
    await pages.homePage.open();
  });

  test.describe('Home Page Layout Test Suite', () => {
    test('display of all main home page elements', async () => {
      await expect(pages.homePage.pageBanner).toBeVisible();
      await expect(pages.homePage.searchField).toBeVisible();
      await expect(pages.homePage.searchButton).toBeVisible();
      await expect(pages.homePage.sortingDropdown).toBeVisible();
      await expect(pages.homePage.priceSliderControllerMin).toBeVisible();
      await expect(pages.homePage.priceSliderControllerMax).toBeVisible();
      await expect(pages.homePage.productNames.first()).toHaveText(/\S/);
      await expect(pages.homePage.productPrices.first()).toHaveText(/\$\d+/);
    });

    test.describe('Search Products Test Suite', () => {
      test('search by valid query', async () => {
        await pages.homePage.search(searchData.existingProduct);

        await expect(pages.homePage.searchResultTitle).toContainText(searchData.existingProduct);

        await expect(pages.homePage.searchResultCards.first()).toBeVisible();

        const productNames = (await pages.homePage.searchResultNames.allTextContents()).map(
          name => name.trim().toLowerCase(),
        );

        expect(productNames.length).toBeGreaterThan(0);

        productNames.forEach((name) => {
          expect(name).toContain(searchData.existingProduct.toLowerCase());
        });
      });

      test('search by invalid query', async () => {
        await pages.homePage.search(searchData.nonExistingProduct);

        await expect(pages.homePage.searchResultTitle).toContainText(searchData.nonExistingProduct);

        await expect(pages.homePage.searchResultCards).toHaveCount(0);
      });

      test('clear search results', async () => {
        await pages.homePage.search(searchData.existingProduct);

        await expect(pages.homePage.searchResultTitle).toContainText(searchData.existingProduct);

        await expect(pages.homePage.searchResultCards.first()).toBeVisible();

        await pages.homePage.clearSearch();

        await expect(pages.homePage.searchField).toHaveValue('');
        await expect(pages.homePage.productCards.first()).toBeVisible();
      });
    });

    test('sort products by name ascending', async () => {
      await pages.homePage.sortProducts(sortingOptions.sortByNameAsc);

      await expect(pages.homePage.sortingDropdown).toHaveValue('name,asc');
      await expect(pages.homePage.productNames.first()).toHaveText(/\S/, {
        timeout: 10000,
      });

      await expect(pages.homePage.productCards.first()).toBeVisible();
    });

    test('sort products by name descending', async () => {
      await pages.homePage.sortProducts(sortingOptions.sortByNameDesc);

      await expect(pages.homePage.sortingDropdown).toHaveValue('name,desc');
      await expect(pages.homePage.productNames.first()).toHaveText(/\S/, {
        timeout: 10000,
      });

      await expect(pages.homePage.productCards.first()).toBeVisible();
    });

    test('sort products by price ascending', async () => {
      await pages.homePage.sortProducts(sortingOptions.sortByPriceAsc);

      await expect(pages.homePage.sortingDropdown).toHaveValue('price,asc');
      await expect(pages.homePage.productPrices.first()).toHaveText(/\$\d+/, {
        timeout: 10000,
      });

      await expect(pages.homePage.productCards.first()).toBeVisible();
    });

    test('sort products by price descending', async () => {
      await pages.homePage.sortProducts(sortingOptions.sortByPriceDesc);

      await expect(pages.homePage.sortingDropdown).toHaveValue('price,desc');
      await expect(pages.homePage.productPrices.first()).toHaveText(/\$\d+/, {
        timeout: 10000,
      });

      await expect(pages.homePage.productCards.first()).toBeVisible();
    });
  });

  test.describe('Pagination Test Suite', () => {
    test('navigate to next page', async () => {
      await expect(pages.homePage.activePaginationPage).toHaveText('1');

      await pages.homePage.goToNextPage();

      await expect(pages.homePage.activePaginationPage).toHaveText('2');
      await expect(pages.homePage.productCards.first()).toBeVisible();
    });

    test('navigate to specific page', async () => {
      await expect(pages.homePage.activePaginationPage).toHaveText('1');

      await pages.homePage.goToPage(3);

      await expect(pages.homePage.activePaginationPage).toHaveText('3');
      await expect(pages.homePage.productCards.first()).toBeVisible();
    });
  });

  test.describe('Products List Test Suite', () => {
    test('display product cards with names and prices', async () => {
      await expect(pages.homePage.productCards.first()).toBeVisible();
      await expect(pages.homePage.productNames.first()).toBeVisible();
      await expect(pages.homePage.productPrices.first()).toBeVisible();
    });

    test('open random product details page', async ({ page }) => {
      await expect(pages.homePage.productCards.first()).toBeVisible();

      await pages.homePage.clickRandomProduct();

      await expect(page).toHaveURL(/\/product\//);
    });
  });
});
