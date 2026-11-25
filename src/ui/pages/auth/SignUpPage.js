import { expect } from '../../../common/helpers/pw';
import { BasePage } from '../BasePage';
import { SignUpForm } from '../../components/signUp/SignUpForm';

export class SignUpPage extends BasePage {

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/sign-up';
    this.signUpForm = new SignUpForm(this.page, userId);
    this.choseRoleText = this.page.getByText('I am...');
    
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
