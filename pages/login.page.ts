import { type Page, type Locator } from '@playwright/test';

// Page Object Model for the Login page
export class LoginPage {
  readonly page: Page;
  readonly inUsername: Locator;
  readonly inPassword: Locator;
  readonly btnLogin: Locator;
  readonly lnkForgotPassword: Locator;
  readonly txtErrorMessage: Locator;
  readonly txtErrorRequiredField: Locator;

  // URL patterns
  readonly reForgotPasswordUrl = /reset|password/i;

  constructor(page: Page) {
    this.page = page;
    // Locators - update selectors based on actual page structure
    this.inUsername = page.locator('input[name="username"]');
    this.inPassword = page.locator('input[name="password"]');
    this.btnLogin = page.locator('button[type="submit"]');
    this.lnkForgotPassword = page.locator('//div[@class="orangehrm-login-forgot"]/p');
    //this.txtErrorMessage = page.locator('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]');
    this.txtErrorMessage = page.getByText('Invalid credentials');
    this.txtErrorRequiredField = page.getByText('Required').first();
  }

  // Navigate to login page
  async goto() {
    await this.page.goto(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
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
    await this.lnkForgotPassword.click();
  }

  // Get error message text
  async getErrorMessageText(): Promise<string> {
    return await this.txtErrorMessage.textContent() || '';
  }

  // Get Required Field message text
  async getErrorRequiredFieldText(): Promise<string> {
    return await this.txtErrorRequiredField.textContent() || '';
  }
}
