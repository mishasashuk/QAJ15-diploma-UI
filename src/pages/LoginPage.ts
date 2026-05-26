import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly forgotPassword: Locator;
  readonly pageTitle: Locator;
  readonly emailErrorAlert: Locator;
  readonly passwordErrorAlert: Locator;
  readonly eyeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.getByRole("heading", { name: "Login" });
    this.emailField = page.locator("#email");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.registerLink = page.locator('[data-test="register-link"]');
    this.forgotPassword = page.locator(".ForgetPwd");
    this.emailErrorAlert = page.locator("#email-error");
    this.passwordErrorAlert = page.locator("#password-error");
    this.eyeButton = page.locator(".btn.btn-outline-secondary");
  }

  async open() {
    await this.navigate("/auth/login");
    await this.emailField.waitFor({ state: "visible", timeout: 10000 });
    await this.passwordField.waitFor({ state: "visible", timeout: 10000 });
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
