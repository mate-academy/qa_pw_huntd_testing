import { expect, Locator, Page } from '@playwright/test';
import { AuthCredentials, AuthFormComponent } from '@src/components/auth-form.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class SignUpPage extends BasePage {
  readonly form: AuthFormComponent;
  readonly signInLink: Locator;

  constructor(page: Page) {
    super(page);
    this.form = new AuthFormComponent(page, /Create account/i);
    this.signInLink = page.getByRole('link', { name: /^Sign In$/i });
  }

  async open() {
    await super.open(routes.signUp);
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/Welcome aboard!/i, 1)).toBeVisible();
    await expect(this.page.getByText(/Create an account/i)).toBeVisible();
  }

  async register(credentials: AuthCredentials) {
    await this.form.submit(credentials);
  }
}
