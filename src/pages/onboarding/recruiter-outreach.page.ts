import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';

export class RecruiterOutreachPage extends BasePage {
  readonly messageInput: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    super(page);
    this.messageInput = page.locator('textarea').first();
    this.sendButton = page.getByRole('button', { name: /^Send$/i });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/profile\/perfect-candidate/i);
    await expect(this.page.getByText(/Reach out to matching engineers/i)).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }
}