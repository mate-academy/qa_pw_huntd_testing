import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@src/core/base/base.page';

type PerfectCandidateData = {
  role?: string[];
  technologies?: string[];
  jobExperience?: string;
  englishLevel?: string;
  location?: string;
  message?: string;
};

export class PerfectCandidatePage extends BasePage {
  readonly roleControl: Locator;
  readonly roleInput: Locator;

  readonly technologiesControl: Locator;
  readonly technologiesInput: Locator;

  readonly jobExperienceControl: Locator;
  readonly jobExperienceInput: Locator;

  readonly englishLevelControl: Locator;
  readonly englishLevelInput: Locator;

  readonly countryCityButton: Locator;
  readonly locationInput: Locator;

  readonly nextButton: Locator;

  readonly messageTextarea: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    super(page);

    this.roleControl = page.locator('label[for="specializations"] + div .select__control');
    this.roleInput = page.locator('#specializations');

    this.technologiesControl = page.locator('label[for="technologies"] + div .select__control');
    this.technologiesInput = page.locator('#technologies');

    this.jobExperienceControl = page.locator('label[for="job-experiences"] + div .select__control');
    this.jobExperienceInput = page.locator('#job-experiences');

    this.englishLevelControl = page.locator('label[for="english-levels"] + div .select__control');
    this.englishLevelInput = page.locator('#english-levels');

    this.countryCityButton = page.getByRole('button', { name: /country\/city/i });
    this.locationInput = page.locator('#locations');

    this.nextButton = page.getByRole('button', { name: /^Next$/i });

    this.messageTextarea = page.locator('#messageBody');
    this.sendButton = page.getByRole('button', { name: /send/i });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/profile\/perfect-candidate/i);

    await expect(
      this.page.getByRole('heading', {
        name: /let's find your first engineers!/i,
      })
    ).toBeVisible();

    await expect(this.roleControl).toBeVisible();
    await expect(this.technologiesControl).toBeVisible();
    await expect(this.nextButton).toBeVisible();
  }

  async fillForm(data: PerfectCandidateData) {
    if (data.role?.length) {
      await this.selectRoleValues(data.role);
    }

    if (data.technologies?.length) {
      await this.selectTechnologyValues(data.technologies);
    }

    if (data.jobExperience) {
      await this.selectSingleValue(
        this.jobExperienceControl,
        this.jobExperienceInput,
        data.jobExperience
      );
    }

    if (data.englishLevel) {
      await this.selectEnglishLevel(data.englishLevel);
    }

    if (data.location) {
      await this.fillLocation(data.location);
    }
  }

  async continue() {
    await this.nextButton.click();
  }

  async sendTemplateMessage(message: string) {
    await expect(this.messageTextarea).toBeVisible({ timeout: 10000 });
    await this.messageTextarea.fill(message);
    await this.sendButton.click();
  }

  async submit(data: PerfectCandidateData) {
    await this.fillForm(data);
    await this.continue();

    if (data.message) {
      await this.sendTemplateMessage(data.message);
    }
  }

  private async selectRoleValues(values: string[]) {
    for (const value of values) {
      await this.roleControl.click();
      await this.roleInput.fill('');
      await this.roleInput.pressSequentially(value, { delay: 50 });

      await this.page.waitForTimeout(300);
      await this.roleInput.press('Enter');

      await expect(
        this.roleControl
          .locator('.select__multi-value__label')
          .filter({ hasText: new RegExp(this.escapeRegExp(value), 'i') })
          .first()
      ).toBeVisible({ timeout: 5000 });
    }

    await this.page.mouse.click(20, 20);
  }

  private async selectTechnologyValues(values: string[]) {
    for (const value of values) {
      await this.technologiesControl.click();

      const option = this.page
        .locator('.select__option')
        .filter({ hasText: new RegExp(`^${this.escapeRegExp(value)}$`, 'i') })
        .first();

      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      await expect(
        this.technologiesControl
          .locator('.select__multi-value__label')
          .filter({ hasText: new RegExp(this.escapeRegExp(value), 'i') })
          .first()
      ).toBeVisible({ timeout: 5000 });
    }

    await this.page.mouse.click(20, 20);
  }

  private async selectSingleValue(control: Locator, input: Locator, value: string) {
    await control.click();
    await input.fill('');
    await input.pressSequentially(value, { delay: 50 });

    const option = this.page
      .locator('.select__option, [role="option"]')
      .filter({ hasText: new RegExp(this.escapeRegExp(value), 'i') })
      .first();

    await expect(option).toBeVisible({ timeout: 8000 });
    await option.click();

    await expect(control).toContainText(value, {
      ignoreCase: true,
      timeout: 5000,
    });
  }

  private async selectEnglishLevel(value: string) {
    await this.englishLevelControl.click();
    await this.englishLevelInput.fill('');
    await this.englishLevelInput.pressSequentially(value, { delay: 50 });

    await this.page.waitForTimeout(300);
    await this.englishLevelInput.press('Enter');

    await expect(this.englishLevelControl).toContainText(value, {
      ignoreCase: true,
      timeout: 5000,
    });
  }

  private async fillLocation(location: string) {
    await this.countryCityButton.click();
    await this.locationInput.click();
    await this.locationInput.fill('');
    await this.locationInput.pressSequentially(location, { delay: 40 });

    const option = this.page.locator('.pac-item, [role="option"]').first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}