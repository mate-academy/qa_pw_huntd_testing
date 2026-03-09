import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class CandidatesFiltersComponent extends BaseComponent {
  readonly roleField: Locator;
  readonly technologiesField: Locator;
  readonly salaryField: Locator;
  readonly englishField: Locator;
  readonly locationField: Locator;

  constructor(page: Page) {
    super(page, page.locator('body'));

    this.roleField = page.locator('label:visible').filter({ hasText: /^Role$/ }).first();
    this.technologiesField = page.locator('label:visible').filter({ hasText: /^Technologies$/ }).first();
    this.salaryField = page.locator('label:visible').filter({ hasText: /Desired base salary/i }).first();
    this.englishField = page.locator('label:visible').filter({ hasText: /English level/i }).first();
    this.locationField = page.locator('label:visible').filter({ hasText: /Candidate's location/i }).first();
  }

  async expectAllVisible() {
    await expect(this.roleField).toBeVisible();
    await expect(this.technologiesField).toBeVisible();
    await expect(this.salaryField).toBeVisible();
    await expect(this.englishField).toBeVisible();
    await expect(this.locationField).toBeVisible();
  }
}
