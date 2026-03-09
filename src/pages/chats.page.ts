import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';

export class ChatsPage extends BasePage {
  readonly chatsLink: Locator;
  readonly chatList: Locator;
  readonly chatItems: Locator;
  readonly activeChatItem: Locator;
  readonly messageInput: Locator;
  readonly chatContainer: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    super(page);

    this.chatsLink = page.getByRole('link', { name: /Chats/i });
    this.chatList = page.locator('[class*="ChatSelector_chatSelector__"]');
    this.chatItems = page.locator('a[class*="ChatSelectorItem_chatSelectorItem__"]');
    this.activeChatItem = page.locator(
      'a[class*="ChatSelectorItem_chatSelectorItem__"][class*="is-active"]'
    );
    this.chatContainer = page.locator('[class*="ChatBox_chatBox__"]');
    this.messageInput = page.getByPlaceholder(/Type a message/i);
    this.loader = page.locator('.Loader_loaderPlaceholder__SRH3Y');
  }

  async open() {
    await super.open('/chats');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/chats/);
    await this.loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    await expect(this.chatsLink).toBeVisible();
    await expect(this.chatList.first()).toBeVisible();
    await expect(this.chatItems.first()).toBeVisible();
  }

  async openFirstChat() {
    await this.chatItems.first().click();
    await expect(this.page).toHaveURL(/\/chats\/.+/);
  }

  async expectChatOpened() {
    await expect(this.activeChatItem).toBeVisible();
    await expect(this.chatContainer).toBeVisible();
    await expect(this.messageInput).toBeVisible();
  }
}