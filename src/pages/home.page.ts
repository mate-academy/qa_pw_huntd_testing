import { expect, Page } from '@playwright/test';
import { FeaturedJobsComponent } from '@src/components/featured-jobs.component';
import { FooterComponent } from '@src/components/footer.component';
import { HeaderComponent } from '@src/components/header.component';
import { BasePage } from '@src/core/base/base.page';
import { routes } from '@src/core/config/routes';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly featuredJobs: FeaturedJobsComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.featuredJobs = new FeaturedJobsComponent(page);
  }

  async open() {
    await super.open(routes.home);
  }

  async expectLoaded() {
    await expect(this.getByRoleHeading(/Let remote Web3 startups make you an offer/i, 2)).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /How it works/i })).toBeVisible();
  }
}
