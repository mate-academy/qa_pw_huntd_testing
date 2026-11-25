import { BaseHeader } from './BaseHeader';
import {expect} from '../../../common/helpers/pw';

export class InternalHeader extends BaseHeader {
  #profileButton;
  #settingsLink;
  #chatsLink;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#chatsLink = this.page.getByRole('link', { name: 'Chats' });
    this.#profileButton = this.page.getByRole('button', { name: 'Profile' });
    this.#settingsLink = this.page.getByRole('link', { name: 'Sign in' });
  }

  #profileLink(profileId) {
    return this.page.getByRole('link', { name: profileId });
  }

  async clickProfileButton() {
    await this.step(`Click 'New Article' link`, async () => {
      await this.#profileButton.click();
    });
  }
  async clickChatsLink() {
    await this.step(`Click 'Chats' link`, async () => {
      await this.#chatsLink.click();
    });
  }

  async clickSettingsLink() {
    await this.step(`Click 'Settings' link`, async () => {
      await this.#settingsLink.click();
    });
  }

  async clickUserProfileLink(profileId) {
    await this.step(`Click user profile link`, async () => {
      await this.#profileLink(profileId).click();
    });
  }

  async assertProfileButtonIsVisible() {
    await this.step(`Assert the profile button is visible`, async () => {
      await expect(this.#profileButton).toBeVisible();
    });
  }
}
