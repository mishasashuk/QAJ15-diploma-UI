import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';

export class PageFactory {
  static homePage(page: Page) {
    return new HomePage(page);
  }

  static productPage(page: Page) {
    return new ProductPage(page);
  }

  static loginPage(page: Page) {
    return new LoginPage(page);
  }
}