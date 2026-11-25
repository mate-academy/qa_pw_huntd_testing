import { expect } from '../../../common/helpers/pw';
import { BasePage } from '../BasePage';
import { SignUpForm } from '../../components/signUp/SignUpForm';

export class SignUpPage extends BasePage {
  #repeatPasswordField;
  #signUpButton;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/sign-up';
    this.signUpForm = new SignUpForm(this.page, userId);
    this.choseRoleText = this.page.getByText('I am...');
    
  }

  async fillRepeatPasswordField(password) {
    await this.step(`Fill the 'Repeat Password' field`, async () => {
      await this.#repeatPasswordField.fill(password);
    });
  }

  async clickSignUpButton() {
    await this.step(`Click the 'Sign up' button`, async () => {
      await this.#signUpButton.click();
    });
  }

  async submitSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      await this.fillUsernameField(user.username);
      await this.fillEmailField(user.email);
      await this.fillPasswordField(user.password);
      await this.clickSignUpButton();
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
