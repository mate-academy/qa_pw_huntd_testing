import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class JobsCategoriesComponent extends BaseComponent {
  readonly backendCategory: Locator;
  readonly frontendCategory: Locator;
  readonly reactCategory: Locator;
  readonly solidityCategory: Locator;

  constructor(page: Page) {
    super(page, page.locator('div[class*="VacanciesNav_container__"]'));

    this.backendCategory = this.root.getByText('Backend', { exact: true });
    this.frontendCategory = this.root.getByText('Frontend', { exact: true });
    this.reactCategory = this.root.getByText('React', { exact: true });
    this.solidityCategory = this.root.getByText('Solidity', { exact: true });
  }

  async expectMainCategoriesVisible() {
    await expect(this.backendCategory).toBeVisible();
    await expect(this.frontendCategory).toBeVisible();
    await expect(this.reactCategory).toBeVisible();
    await expect(this.solidityCategory).toBeVisible();
  }
}