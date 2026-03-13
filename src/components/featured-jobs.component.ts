import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class FeaturedJobsComponent extends BaseComponent {
  readonly candidateCards: Locator;

  constructor(page: Page) {
    super(page, page.locator('div[class*="HowItWorks_candidatesBlock__"]'));
    this.candidateCards = this.root.locator('div[class*="HowItWorks_candidate__"]');
  }

  async expectAtLeastOneFeaturedJob() {
    await expect(this.root).toBeVisible();
    await expect(this.candidateCards.first()).toBeVisible();
  }
}