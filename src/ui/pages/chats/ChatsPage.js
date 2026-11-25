import { BasePage } from '../BasePage';
import { expect } from '../../../common/helpers/pw';

export class ChatsPage extends BasePage {
  #chatsTitle;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/chats';
    this.#chatsTitle = this.page.getByText('No messages yet');
  }

  async assertChatsTitleIsVisible() {
    await this.step(`Assert the chats Title is visible`, async () => {
      await expect(this.#chatsTitle).toBeVisible();
    });
  }
}
