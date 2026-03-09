import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/core/base/base.component';

export class FooterComponent extends BaseComponent {
  readonly termsLink: Locator;
  readonly cookiesLink: Locator;
  readonly privacyLink: Locator;
  readonly aboutLink: Locator;
  readonly faqLink: Locator;
  readonly pricingLink: Locator;

  constructor(page: Page) {
    super(page, page.locator('footer, body'));
    this.termsLink = page.getByRole('link', { name: /Terms of use/i });
    this.cookiesLink = page.getByRole('link', { name: /Cookies policy/i });
    this.privacyLink = page.getByRole('link', { name: /Privacy policy/i });
    this.aboutLink = page.getByRole('link', { name: /About us/i });
    this.faqLink = page.getByRole('link', { name: /FAQs/i });
    this.pricingLink = page.getByRole('link', { name: /Pricing/i });
  }

  async expectLegalLinks() {
    await expect(this.termsLink).toBeVisible();
    await expect(this.cookiesLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.faqLink).toBeVisible();
    await expect(this.pricingLink).toBeVisible();
  }
}
