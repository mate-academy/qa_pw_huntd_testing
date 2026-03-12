import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class ChatsPage extends BasePage {
  readonly chatsLink: Locator;
  readonly chatItems: Locator;
  readonly activeChatItem: Locator;
  readonly messageInput: Locator;
  readonly chatContainer: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    super(page);

    this.chatsLink = page.getByRole('link', { name: /^Chats$/i });
    this.chatItems = page.locator('a[href^="/chats/"]');
    this.activeChatItem = page.locator('a[href^="/chats/"].is-active');
    this.chatContainer = page.locator('[class*="ChatBox_chatBox__"]');
    this.messageInput = page.getByPlaceholder(/Type a message/i);
    this.loader = page.locator('[class*="Loader_loaderPlaceholder__"]');
  }

  async open() {
    await super.open(routes.chats);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/chats(\/.*)?$/);
    await expect(this.chatsLink).toBeVisible();
    await expect(this.chatItems.first()).toBeVisible({ timeout: 15000 });
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