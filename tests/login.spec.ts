import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Tests for Login page: valid login, invalid credentials, empty fields, forgot login info
test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Display Elements', () => {  
    test('displays necessary page elements', {tag: '@smoke'}, async () => {
    // Assertion 1: Username input is visible and editable
    await expect(loginPage.inUsername).toBeVisible();
    await expect(loginPage.inUsername).toBeEditable();

    // Assertion 2: Password input is visible and editable
    await expect(loginPage.inPassword).toBeVisible();
    await expect(loginPage.inPassword).toBeEditable();
    
    // Assertion 3: Submit button is visible and clickable
    await expect(loginPage.btnLogin).toBeVisible();
    await expect(loginPage.btnLogin).toBeEnabled();
    });
  });

  test.describe('Successful Login', () => {
    test('user can login with valid credentials', {tag: '@smoke'}, async ({ page }) => {
      // Retrieve credentials from environment variables
      const username = process.env.TEST_USER_USERNAME;
      const password = process.env.TEST_USER_PASSWORD;

      // Skip test if credentials are not provided
      test.skip(!username || !password, 'Login credentials not configured');

      // Perform login
      await loginPage.login(username!, password!);
      await expect(page).toHaveURL(/dashboard/i);
    });
  });

  test.describe('Error Handling', () => {
    test('displays error for invalid credentials', async () => {
      // Attempt login with invalid credentials
      await loginPage.login('invalid_user', 'invalid_password');

      // Verify error message
      const errorText = await loginPage.getErrorMessageText();
      expect(errorText.toLowerCase()).toMatch("invalid credentials");
    });

    test('displays error for empty fields', async () => {
      // Attempt login with empty fields
      await loginPage.btnLogin.click();

      // Verify error message
      const requiredText = await loginPage.getErrorRequiredFieldText();
      expect(requiredText.toLowerCase()).toMatch(/required/);
    });
  });

  test.describe('Forgot Password', () => {
    test('displays Forgot Password page when clicking the link', async ({ page }) => {
      // Click on Forgot Password link
      await expect(loginPage.lnkForgotPassword).toBeVisible();
      await loginPage.clickForgotPassword();

      // Verify navigation to Forgot Password page
      await expect(page).toHaveURL(loginPage.reForgotPasswordUrl);
    });
  });
});
