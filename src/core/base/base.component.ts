import { expect, Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected constructor(protected readonly page: Page, protected readonly root: Locator) {}

  async shouldBeVisible() {
    await expect(this.root).toBeVisible();
  }
}
