import { expect, Page } from '@playwright/test';
import { JobsCategoriesComponent } from '@src/components/jobs-categories.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class JobsPage extends BasePage {
  readonly categories: JobsCategoriesComponent;

  constructor(page: Page) {
    super(page);
    this.categories = new JobsCategoriesComponent(page);
  }

  async open() {
    await super.open(routes.jobs);
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/^Jobs$/i, 1)).toBeVisible();
    await this.categories.expectMainCategoriesVisible();
  }
}
