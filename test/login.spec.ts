import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/factory/PageFactory';
import { userCredentials } from './fixtures/testData';

test.describe('Login Page Test Suite', () => {
  let pages: PageFactory;

  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);

    await pages.loginPage.open();
  });

  test.describe('Login Page Layout Test Suite', () => {
    
      await expect(pages.loginPage.pageTitle).toBeVisible();
      await expect(pages.loginPage.emailField).toBeVisible();
      await expect(pages.loginPage.passwordField).toBeVisible();
      await expect(pages.loginPage.loginButton).toBeVisible();
      await expect(pages.loginPage.registerLink).toBeVisible();
      await expect(pages.loginPage.forgotPassword).toBeVisible();
    });

    test('email field should be editable and empty by default', async () => {
      await expect(pages.loginPage.emailField).toBeEditable();
      await expect(pages.loginPage.emailField).toBeEmpty();
    });

    test('password field should be editable and hidden by default', async () => {
      await expect(pages.loginPage.passwordField).toBeEditable();

      await expect(pages.loginPage.passwordField).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Login Page Navigation Test Suite', () => {
    test('navigation to customer registration page', async ({ page }) => {
      await pages.loginPage.registerLink.click();

      await expect(page).toHaveURL(/auth\/register/);
    });

    test('navigation to forgot password page', async ({ page }) => {
      await pages.loginPage.forgotPassword.click();

      await expect(page).toHaveURL(/auth\/forgot-password/);
    });
  });

  test.describe('Login Form Validation Test Suite', () => {
    test('cannot login without email and password', async () => {
      await pages.loginPage.clickLogin();

      await expect(pages.loginPage.emailErrorAlert).toBeVisible();

      await expect(pages.loginPage.emailErrorAlert).toHaveText('Email is required');

      await expect(pages.loginPage.passwordErrorAlert).toBeVisible();

      await expect(pages.loginPage.passwordErrorAlert).toHaveText('Password is required');

      await expect(pages.loginPage.emailField).toHaveAttribute('aria-invalid', 'true');

      await expect(pages.loginPage.passwordField).toHaveAttribute('aria-invalid', 'true');
    });

    test('cannot login with invalid email format and short password', async () => {
      await pages.loginPage.fillEmail(userCredentials.invalidFormatUser.email);

      await pages.loginPage.fillPassword(userCredentials.invalidFormatUser.password);

      await pages.loginPage.clickLogin();

      await expect(pages.loginPage.emailErrorAlert).toBeVisible();

      await expect(pages.loginPage.emailErrorAlert).toHaveText('Email format is invalid');

      await expect(pages.loginPage.passwordErrorAlert).toBeVisible();

      await expect(pages.loginPage.passwordErrorAlert).toHaveText('Password length is invalid');
    });

    test('cannot login with only email filled', async () => {
      await pages.loginPage.fillEmail(userCredentials.validUser.email);

      await pages.loginPage.clickLogin();

      await expect(pages.loginPage.passwordErrorAlert).toBeVisible();

      await expect(pages.loginPage.passwordErrorAlert).toHaveText('Password is required');
    });

    test('cannot login with only password filled', async () => {
      await pages.loginPage.fillPassword(userCredentials.validUser.password);

      await pages.loginPage.clickLogin();

      await expect(pages.loginPage.emailErrorAlert).toBeVisible();

      await expect(pages.loginPage.emailErrorAlert).toHaveText('Email is required');
    });

    test('stay on login page after login with invalid credentials', async ({ page }) => {
      await pages.loginPage.login(
        userCredentials.invalidUser.email,
        userCredentials.invalidUser.password,
      );

      await expect(page).toHaveURL(/auth\/login/);
    });

    test('toggle password visibility after clicking eye button', async () => {
      await pages.loginPage.fillPassword(userCredentials.validUser.password);

      await expect(pages.loginPage.passwordField).toHaveAttribute('type', 'password');

      await pages.loginPage.eyeButton.click();

      await expect(pages.loginPage.passwordField).toHaveAttribute('type', 'text');

      await expect(pages.loginPage.passwordField).toHaveValue(userCredentials.validUser.password);

      await pages.loginPage.eyeButton.click();

      await expect(pages.loginPage.passwordField).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Login Success Flow Test Suite', () => {
    test('login with valid email and valid password', async ({ page }) => {
      await pages.loginPage.login(
        userCredentials.validUser.email,
        userCredentials.validUser.password,
      );

      await expect(page).toHaveURL(/account/, {
        timeout: 15000,
      });
    });
  });
});
