import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw'

export class SignUpForm extends BaseComponent {
  #emailInputField;
  #passwordInputField;
  #repeatPasswordInputField;
  #signUpButton;
  #signUpGoogleButton;
  #signUpLinkedinButton;
  #signUpGitButton;



  constructor(page, userId = 0) {
    super(page, userId);
    this.#emailInputField = this.page.getByLabel('Email');
    this.#passwordInputField = this.page.getByLabel(
      'Password', { exact: true });
    this.#repeatPasswordInputField = this.page.getByLabel('Repeat password');
    this.#signUpButton = this.page.getByRole(
      'button', { name: 'Create account' });
    this.#signUpGoogleButton = this.page.getByLabel('Sign in with').first();
    this.#signUpLinkedinButton = this.page.getByLabel('Sign in with').nth(1);
    this.#signUpGitButton = this.page.getByLabel('Sign in with').nth(2);


  }

  async fillEmailField(password) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.#emailInputField.fill(password);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.#passwordInputField.fill(password);
    });
  }

  async fillRepeatPasswordField(password) {
    await this.step(`Fill the 'Repeat Password' field`, async () => {
      await this.#repeatPasswordInputField.fill(password);
    });
  }

  async clickSignUpButton() {
    await this.step(`Click 'Sign up' button in the page header`, async () => {
      await this.#signUpButton.click();
    });
  }

  async assertGoogleSignUpIsVisible() {
    await this.step(`Assert 'Google Sign Up' button is visible`, async () => {
      await expect(this.#signUpGoogleButton).toBeVisible();
    });
  }

  async assertLinkedinSignUpIsVisible() {
    await this.step(`Assert 'Linkedin Sign Up' button is visible`, async () => {
      await expect(this.#signUpLinkedinButton).toBeVisible();
    });
  }

  async assertGitSignUpIsVisible() {
    await this.step(`Assert 'Git Sign Up' button is visible`, async () => {
      await expect(this.#signUpGitButton).toBeVisible();
    });
  }
}
