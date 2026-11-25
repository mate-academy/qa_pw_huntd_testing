import { BaseHeader } from './BaseHeader';
import { expect } from '../../../common/helpers/pw';

export class ExternalHeader extends BaseHeader {
  #signUpLink;
  #signInLink;
  #chatsLink;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#signUpLink = this.page.getByRole('link', { name: 'Sign up' });
    this.#signInLink = this.page.getByRole('link', { name: 'Sign in' });
    this.#chatsLink = this.page.getByRole('link', { name: 'Chats' });
  }

  async clickSignUpLink() {
    await this.step(`Click 'Sign Up' link`, async () => {
      await this.#signUpLink.click();
    });
  }

  async clickSignInLink() {
    await this.step(`Click 'Sign In' link`, async () => {
      await this.#signInLink.click();
    });
  }

  async assertSignInButtonIsVisible() {
    await this.step(`Assert sign in button is visible`, async () => {
      await expect(this.#signInLink).toBeVisible();
    });
  }

  async assertChatsLinkIsNotVisible() {
    await this.step(`Assert chats link is not visible`, async () => {
      await expect(this.#chatsLink).toHaveCount(0);
    });
  }
}
