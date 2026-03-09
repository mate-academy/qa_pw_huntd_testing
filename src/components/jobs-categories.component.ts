import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class JobsCategoriesComponent extends BaseComponent {
  readonly backendLink: Locator;
  readonly frontendLink: Locator;
  readonly reactLink: Locator;
  readonly solidityLink: Locator;

  constructor(page: Page) {
    super(page, page.locator('body'));
    this.backendLink = page.getByRole('link', { name: /^Backend$/ });
    this.frontendLink = page.getByRole('link', { name: /^Frontend$/ });
    this.reactLink = page.getByRole('link', { name: /^React$/ });
    this.solidityLink = page.getByRole('link', { name: /^Solidity$/ });
  }

  async expectMainCategoriesVisible() {
    await expect(this.backendLink).toBeVisible();
    await expect(this.frontendLink).toBeVisible();
    await expect(this.reactLink).toBeVisible();
    await expect(this.solidityLink).toBeVisible();
  }
}
