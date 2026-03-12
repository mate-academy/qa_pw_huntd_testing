import { expect, Locator, Page } from '@playwright/test';
import { CandidatesFiltersComponent } from '@src/components/candidates-filters.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class CandidatesPage extends BasePage {
  readonly filters: CandidatesFiltersComponent;
  readonly signUpWall: Locator;
  readonly signUpWallContainer: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);

    this.filters = new CandidatesFiltersComponent(page);

    this.signUpWall = page.getByRole('heading', {
      name: /Oops! Seems you haven’t signed up/i,
    });

    this.signUpWallContainer = page.locator('section, div').filter({
      has: this.signUpWall,
    });

    this.signInLink = this.signUpWallContainer.getByRole('link', { name: /^Sign In$/i });
    this.signUpLink = this.signUpWallContainer.getByRole('link', { name: /Free sign up/i });
  }

  async open() {
    await super.open(routes.candidates);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/candidates/i);
    await expect(this.getByRoleHeading(/^Candidates$/i, 1)).toBeVisible();
  }

  async expectGuestRestrictionVisible() {
    await expect(this.signUpWall).toBeVisible();
  }

  async expectFiltersVisible() {
    await this.filters.expectAllVisible();
  }
}