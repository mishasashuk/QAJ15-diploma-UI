import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

export class PageFactory {
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly productPage: ProductPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
  }
}
