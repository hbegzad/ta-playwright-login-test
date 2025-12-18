import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Tests for Login page: valid login, invalid credentials, empty fields, forgot login info
test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Successful Login', () => {
    test('user can login with valid credentials', async ({ page }) => {
      const username = process.env.TEST_USER_USERNAME;
      const password = process.env.TEST_USER_PASSWORD;

      test.skip(!username || !password, 'Login credentials not configured');

      await loginPage.login(username!, password!);
      await expect(page).toHaveURL(/dashboard/i);
    });
  });

  test.describe('Error Handling', () => {
    test('displays error for invalid credentials', async () => {
      await loginPage.login('invalid_user', 'invalid_password');

      const errorText = await loginPage.getErrorMessageText();
      expect(errorText.toLowerCase()).toMatch("invalid credentials");
    });

    test('displays error for empty fields', async () => {
      await loginPage.btnLogin.click();

      const requiredText = await loginPage.getErrorRequiredFieldText();
      expect(requiredText.toLowerCase()).toMatch(/required/);
    });
  });

  test.describe('Forgot Password', () => {
    test('displays Forgot Password page when clicking the link', async ({ page }) => {
      await expect(loginPage.lnkForgotPassword).toBeVisible();
      await loginPage.clickForgotPassword();

      await expect(page).toHaveURL(loginPage.reForgotPasswordUrl);
    });
  });
});
