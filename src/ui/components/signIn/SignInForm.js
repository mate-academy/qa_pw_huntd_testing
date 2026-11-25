import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw'

export class SignInForm extends BaseComponent {
  #emailInputField;
  #passwordInputField;
  #signInButton;
  #signInGoogleButton;
  #signInLinkedinButton;
  #signInGitButton;

  #forgotPassButton;



  constructor(page, userId = 0) {
    super(page, userId);
    this.#emailInputField = this.page.getByLabel('Email');
    this.#passwordInputField = this.page.getByLabel('Password');
    this.#signInButton = this.page.getByRole(
      'button', { name: 'Sign In', exact: true });
    this.#signInGoogleButton = this.page.getByLabel('Sign in with').first();
    this.#signInLinkedinButton = this.page.getByLabel('Sign in with').nth(1);
    this.#signInGitButton = this.page.getByLabel('Sign in with').nth(2);

    this.#forgotPassButton = this.page.getByRole(
      'link', { name: 'Forgot password' });


  }

  async fillEmailField(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.#emailInputField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.#passwordInputField.fill(password);
    });
  }

  async clickSignInButton() {
    await this.step(`Click 'Sign in' button in the page header`, async () => {
      await this.#signInButton.click();
    });
  }

  async clickForgotPassButton() {
    await this.step(`Click 'Forgot password' in the signin form`, async () => {
      await this.#forgotPassButton.click();
    });
  }

  async assertGoogleSignInIsVisible() {
    await this.step(`Assert 'Google Sign In' button is visible`, async () => {
      await expect(this.#signInGoogleButton).toBeVisible();
    });
  }

  async assertLinkedinSignInIsVisible() {
    await this.step(`Assert 'Linkedin Sign In' button is visible`, async () => {
      await expect(this.#signInLinkedinButton).toBeVisible();
    });
  }

  async assertGitSignInIsVisible() {
    await this.step(`Assert 'Git Sign In' button is visible`, async () => {
      await expect(this.#signInGitButton).toBeVisible();
    });
  }

  async assertForgotPasswordIsVisible() {
    await this.step(`Assert 'Forgot password' link is visible`, async () => {
      await expect(this.#forgotPassButton).toBeVisible();
    });
  }
}
