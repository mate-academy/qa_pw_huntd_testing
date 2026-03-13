import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async open(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectUrlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`${path.replace('/', '\\/')}`));
  }

  getByRoleHeading(name: string | RegExp, level?: number): Locator {
    return this.page.getByRole('heading', { name, level });
  }
}
