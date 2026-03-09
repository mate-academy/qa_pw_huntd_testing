import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';

export class ChooseProfilePage extends BasePage {
  readonly candidateOption: Locator;
  readonly recruiterOption: Locator;

  constructor(page: Page) {
    super(page);
    this.candidateOption = page.locator('a[href="/profile/candidate"]');
    this.recruiterOption = page.locator('a[href="/profile/recruiter"]');
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/I AM/i, 1)).toBeVisible();
    await expect(this.candidateOption).toBeVisible();
    await expect(this.recruiterOption).toBeVisible();
  }

  async chooseCandidate() {
    await this.candidateOption.click();
  }

  async chooseRecruiter() {
    await this.recruiterOption.click();
  }
}
