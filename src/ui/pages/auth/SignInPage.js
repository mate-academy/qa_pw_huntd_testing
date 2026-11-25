import { expect } from '../../../common/helpers/pw';
import { BasePage } from '../BasePage';
import { SignInForm } from '../../components/signIn/SignInForm';

export class SignInPage extends BasePage {

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/sign-in';
    this.signInForm = new SignInForm(this.page, userId);
    //this.#errorMessage = page.getByRole('list').nth(1);
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
