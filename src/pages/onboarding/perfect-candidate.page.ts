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
  readonly roleInput: Locator;
  readonly roleControl: Locator;

  readonly technologiesInput: Locator;
  readonly technologiesControl: Locator;

  readonly jobExperienceInput: Locator;
  readonly jobExperienceControl: Locator;

  readonly englishLevelInput: Locator;
  readonly englishLevelControl: Locator;

  readonly countryCityButton: Locator;
  readonly locationInput: Locator;

  readonly nextButton: Locator;
  readonly messageTextarea: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    super(page);

    this.roleInput = page.locator('#specializations');
    this.roleControl = this.getSelectControlByInputId('specializations');

    this.technologiesInput = page.locator('#technologies');
    this.technologiesControl = this.getSelectControlByInputId('technologies');

    this.jobExperienceInput = page.locator('#job-experiences');
    this.jobExperienceControl = this.getSelectControlByInputId('job-experiences');

    this.englishLevelInput = page.locator('#english-levels');
    this.englishLevelControl = this.getSelectControlByInputId('english-levels');

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
      await this.selectMultiValues(this.roleControl, data.role, this.roleInput);
    }

    if (data.technologies?.length) {
      await this.selectMultiValues(this.technologiesControl, data.technologies);
    }

    if (data.jobExperience) {
      await this.selectSingleValue(
        this.jobExperienceControl,
        this.jobExperienceInput,
        data.jobExperience
      );
    }

    if (data.englishLevel) {
      await this.selectSingleValue(
        this.englishLevelControl,
        this.englishLevelInput,
        data.englishLevel
      );
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

  private getSelectControlByInputId(inputId: string): Locator {
    return this.page
      .locator(`#${inputId}`)
      .locator('xpath=ancestor::div[contains(@class,"select__control")][1]');
  }

  private async selectMultiValues(
    control: Locator,
    values: string[],
    input?: Locator
  ) {
    for (const value of values) {
      await this.openSelect(control);

      if (input) {
        await this.searchSelectValue(input, value);
      }

      const option = this.getOptionByText(value);
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      await this.expectSelectedMultiValue(control, value);
    }

    await this.closeSelect();
  }

  private async selectSingleValue(control: Locator, input: Locator, value: string) {
    await this.openSelect(control);
    await this.searchSelectValue(input, value);

    const option = this.getOptionByText(value);
    await expect(option).toBeVisible({ timeout: 8000 });
    await option.click();

    await expect(control).toContainText(value, {
      ignoreCase: true,
      timeout: 5000,
    });
  }

  private async fillLocation(location: string) {
    await this.countryCityButton.click();
    await this.locationInput.click();
    await this.locationInput.fill('');
    await this.locationInput.pressSequentially(location, { delay: 40 });

    const option = this.getLocationOption();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
  }

  private async openSelect(control: Locator) {
    await expect(control).toBeVisible();
    await control.click();
  }

  private async searchSelectValue(input: Locator, value: string) {
    await input.fill('');
    await input.pressSequentially(value, { delay: 50 });
  }

  private async closeSelect() {
    await this.page.keyboard.press('Escape');
  }

  private getOptionByText(value: string): Locator {
    return this.page
      .locator('[role="option"], .select__option')
      .filter({ hasText: new RegExp(`^${this.escapeRegExp(value)}$`, 'i') })
      .first();
  }

  private async expectSelectedMultiValue(control: Locator, value: string) {
    await expect(control).toContainText(new RegExp(this.escapeRegExp(value), 'i'), {
      timeout: 5000,
    });
  }

  private getLocationOption(): Locator {
    return this.page.locator('[role="option"], .pac-item').first();
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}