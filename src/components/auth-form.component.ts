import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export type AuthCredentials = {
  email: string;
  password: string;
  repeatPassword?: string;
};

export class AuthFormComponent extends BaseComponent {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, submitLabel: RegExp) {
    const form = page.locator('form').first();
    super(page, form);

    this.emailInput = form.getByLabel(/^Email$/);
    this.passwordInput = form.getByLabel(/^Password$/);
    this.repeatPasswordInput = form.getByLabel(/Repeat password/i);
    this.submitButton = form.getByRole('button', { name: submitLabel });
  }

  async fill(data: AuthCredentials) {
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);

    if (data.repeatPassword !== undefined && await this.repeatPasswordInput.count()) {
      await this.repeatPasswordInput.fill(data.repeatPassword);
    }
  }

  async submit(data?: AuthCredentials) {
    if (data) {
      await this.fill(data);
    }

    await this.submitButton.click();
  }
}