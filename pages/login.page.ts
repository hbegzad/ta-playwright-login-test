import { type Page, type Locator } from '@playwright/test';

// Page Object Model for the Login page
export class LoginPage {
  readonly page: Page;
  readonly inUsername: Locator;
  readonly inPassword: Locator;
  readonly btnLogin: Locator;
  readonly lnkForgotLoginInfo: Locator;
  readonly txtErrorMessage: Locator;

  // URL patterns
  readonly reForgotPasswordUrl = /reset|password/i;

  constructor(page: Page) {
    this.page = page;
    // Locators - update selectors based on actual page structure
    this.inUsername = page.locator('input[name="username"]');
    this.inPassword = page.locator('input[name="password"]');
    this.btnLogin = page.locator('.button').or(page.locator('button[type="submit"]'));
    this.lnkForgotLoginInfo = page.locator('a[href*="lookup.htm"]');
    this.txtErrorMessage = page.locator('.error');
  }

  // Navigate to login page
  async goto() {
    await this.page.goto(process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/login.htm');
  }

  // Fill username field
  async fillUsername(username: string) {
    await this.inUsername.fill(username);
  }

  // Fill password field
  async fillPassword(password: string) {
    await this.inPassword.fill(password);
  }

  // Fill credentials and submit
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.btnLogin.click();
  }

  // Click forgot password link
  async clickForgotPassword() {
    await this.lnkForgotLoginInfo.click();
  }

  // Get error message text
  async getErrorMessageText(): Promise<string> {
    return await this.txtErrorMessage.textContent() || '';
  }
}
