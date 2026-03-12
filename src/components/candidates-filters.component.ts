import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class CandidatesFiltersComponent extends BaseComponent {
  readonly roleField: Locator;
  readonly technologiesField: Locator;
  readonly salaryField: Locator;
  readonly englishField: Locator;
  readonly locationField: Locator;

  constructor(page: Page) {
    super(page, page.locator('[data-testid="candidates-filters"]'));

    this.roleField = this.root.getByLabel('Role', { exact: true });
    this.technologiesField = this.root.getByLabel('Technologies', { exact: true });
    this.salaryField = this.root.getByLabel(/Desired base salary/i);
    this.englishField = this.root.getByLabel(/English level/i);
    this.locationField = this.root.getByLabel(/Candidate's location/i);
  }

  async expectAllVisible() {
    await expect(this.roleField).toBeVisible();
    await expect(this.technologiesField).toBeVisible();
    await expect(this.salaryField).toBeVisible();
    await expect(this.englishField).toBeVisible();
    await expect(this.locationField).toBeVisible();
  }
}