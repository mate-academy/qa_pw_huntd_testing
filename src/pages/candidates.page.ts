import { expect, Locator, Page } from '@playwright/test';
import { CandidatesFiltersComponent } from '@src/components/candidates-filters.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class CandidatesPage extends BasePage {
  readonly filters: CandidatesFiltersComponent;
  readonly signUpWall: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.filters = new CandidatesFiltersComponent(page);
    this.signUpWall = page.getByRole('heading', { name: /Oops! Seems you haven’t signed up/i });
    this.signInLink = page.getByRole('link', { name: /^Sign In$/i }).last();
    this.signUpLink = page.getByRole('link', { name: /Free sign up/i }).first();
  }

  async open() {
    await super.open(routes.candidates);
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/^Candidates$/i, 1)).toBeVisible();
  }

  async expectGuestRestrictionVisible() {
    await expect(this.signUpWall).toBeVisible();
  }

  async expectFiltersVisible() {
    await this.filters.expectAllVisible();
  }
}
