import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class FeaturedJobsComponent extends BaseComponent {
  readonly jobLinks: Locator;

  constructor(page: Page) {
    super(page, page.locator('body'));
    this.jobLinks = page.locator('a[href*="/jobs/"]');
  }

  async expectAtLeastOneFeaturedJob() {
    await expect(this.jobLinks.first()).toBeVisible();
    expect(await this.jobLinks.count()).toBeGreaterThan(0);
  }
}