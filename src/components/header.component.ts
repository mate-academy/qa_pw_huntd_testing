import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class HeaderComponent extends BaseComponent {
  readonly candidatesLink: Locator;
  readonly jobsLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    const header = page.locator('header');
    super(page, header);

    this.candidatesLink = this.root.getByRole('link', { name: /^Candidates$/ });
    this.jobsLink = this.root.getByRole('link', { name: /^Jobs$/ });
    this.signInLink = this.root.getByRole('link', { name: /^Sign In$/ });
    this.signUpLink = this.root.getByRole('link', { name: /Sign up|Free sign up/i });
  }

  async expectGuestNavigation() {
    await expect(this.candidatesLink).toBeVisible();
    await expect(this.jobsLink).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }
}