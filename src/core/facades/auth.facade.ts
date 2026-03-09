import { Page } from '@playwright/test';
import { AuthCredentials } from '@src/components/auth-form.component';
import { SignInPage } from '@src/pages/sign-in.page';
import { SignUpPage } from '@src/pages/sign-up.page';

export class AuthFacade {
  readonly signInPage: SignInPage;
  readonly signUpPage: SignUpPage;

  constructor(page: Page) {
    this.signInPage = new SignInPage(page);
    this.signUpPage = new SignUpPage(page);
  }

  async login(credentials: AuthCredentials) {
    await this.signInPage.open();
    await this.signInPage.expectLoaded();
    await this.signInPage.login(credentials);
  }

  async register(credentials: AuthCredentials) {
    await this.signUpPage.open();
    await this.signUpPage.expectLoaded();
    await this.signUpPage.register(credentials);
  }
}
