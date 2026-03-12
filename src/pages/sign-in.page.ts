import { expect, Locator, Page } from '@playwright/test';
import { AuthCredentials, AuthFormComponent } from '@src/components/auth-form.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class SignInPage extends BasePage {
  readonly form: AuthFormComponent;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);

    this.form = new AuthFormComponent(page, /^Sign In$/);
    this.forgotPasswordLink = page.getByRole('link', { name: /Forgot password/i });
    this.signUpLink = page.getByRole('banner').getByRole('link', { name: /^Sign up$/i });
  }

  async open() {
    await super.open(routes.signIn);
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/Welcome Back!/i, 1)).toBeVisible();
    await expect(this.page.getByText(/Sign in to your account/i)).toBeVisible();
  }

  async login(credentials: AuthCredentials) {
    await this.form.submit(credentials);
  }
}