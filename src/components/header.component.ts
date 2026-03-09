import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class HeaderComponent extends BaseComponent {
  readonly candidatesLink: Locator;
  readonly jobsLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page, page.locator('header, body'));
    this.candidatesLink = page.getByRole('link', { name: /^Candidates$/ });
    this.jobsLink = page.getByRole('link', { name: /^Jobs$/ });
    this.signInLink = page.getByRole('link', { name: /^Sign In$/ });
    this.signUpLink = page.getByRole('link', { name: /Sign up|Free sign up/i });
  }

  async expectGuestNavigation() {
    await expect(this.candidatesLink).toBeVisible();
    await expect(this.jobsLink).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }
}
