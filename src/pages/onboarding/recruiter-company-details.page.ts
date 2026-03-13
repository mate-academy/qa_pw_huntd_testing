import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';
import { RecruiterProfile } from '@src/core/builders/recruiter-profile.builder';

export class RecruiterCompanyDetailsPage extends BasePage {
  readonly roleInput: Locator;
  readonly companyInput: Locator;
  readonly saveAndContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.roleInput = page.getByLabel(/^My role$/i);
    this.companyInput = page.getByLabel(/^Company$/i);
    this.saveAndContinueButton = page.getByRole('button', { name: /Save and continue/i });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/profile\/recruiter/i);
    await expect(this.getByRoleHeading(/Company details/i, 1)).toBeVisible();
    await expect(this.roleInput).toBeVisible();
    await expect(this.companyInput).toBeVisible();
  }

  async fill(profile: RecruiterProfile) {
    await this.roleInput.fill(profile.role);
    await this.companyInput.fill(profile.company);
  }

  async submit(profile: RecruiterProfile) {
    await this.fill(profile);
    await this.saveAndContinueButton.click();
  }
}
