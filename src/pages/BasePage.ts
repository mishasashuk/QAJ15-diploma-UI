import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navSignIn: Locator;
  readonly languageSelection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.navHome = page.locator('[data-test="nav-home"]');
    this.navCategories = page.locator('[data-test="nav-categories"]');
    this.navContact = page.locator('[data-test="nav-contact"]');
    this.navSignIn = page.locator('[data-test="nav-sign-in"]');
    this.languageSelection = page.locator("#language");
  }

  async navigate(path = "/") {
    await this.page.goto(path);
  }

  async clickNavSignIn() {
    await this.navSignIn.click();
  }

  async clickNavHome() {
    await this.navHome.click();
  }
}
