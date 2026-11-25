import { expect } from '../../../common/helpers/pw';
import { BasePage } from '../BasePage';
import { SignUpForm } from '../../components/signUp/SignUpForm';

export class SignUpPage extends BasePage {
  #repeatPasswordInputField;
  #signUpButton;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/sign-up';
    this.signUpForm = new SignUpForm(this.page, userId);
    this.choseRoleText = this.page.getByText('I am...');
    this.#repeatPasswordInputField = this.page.getByLabel('Repeat password');
    this.#signUpButton = this.page.getByRole(
      'button', { name: 'Create account' });
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

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toContainText(messageText);
    });
  }

  async assertChoseRoleTextIsVisible() {
    await this.step(`Assert the message error is shown`, async () => {
      await expect(this.choseRoleText).toBeVisible();
    });
  }
}
