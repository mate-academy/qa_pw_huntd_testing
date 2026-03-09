import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';

export type RecruiterContactsData = {
  firstName: string;
  lastName: string;
  linkedinUrl?: string;
  ethWalletAddress?: string;
};

export class RecruiterContactsPage extends BasePage {
  readonly walletInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly linkedinInput: Locator;
  readonly saveAndContinueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.walletInput = page.locator('#ethWalletAddress');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.linkedinInput = page.locator('#linkedinUrl');
    this.saveAndContinueButton = page.getByRole('button', { name: /Save and continue/i });
  }

  async expectLoaded() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.linkedinInput).toBeVisible();
    await expect(this.saveAndContinueButton).toBeVisible();
  }

  async fill(data: RecruiterContactsData) {
    if (data.ethWalletAddress !== undefined) {
      await this.walletInput.fill(data.ethWalletAddress);
    }

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);

    if (data.linkedinUrl !== undefined) {
      await this.linkedinInput.fill(data.linkedinUrl);
    }
  }

  async submit(data: RecruiterContactsData) {
    await this.fill(data);
    await this.saveAndContinueButton.click();
  }
}