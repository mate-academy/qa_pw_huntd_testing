import { test, expect } from '@playwright/test';
import { PublicLayoutComposite } from '@src/core/composites/public-layout.composite';
import { NavigationFacade } from '@src/core/facades/navigation.facade';

test.describe('parentSuite: Public Area', () => {
  test.describe('suite: Guest Navigation', () => {
    test.describe('subSuite: Smoke', () => {
      test('should open home page and display guest navigation', async ({ page }) => {
        const navigation = new NavigationFacade(page);
        const layout = new PublicLayoutComposite(page);

        await navigation.homePage.open();
        await navigation.homePage.expectLoaded();
        await layout.header.expectGuestNavigation();
        await layout.footer.expectLegalLinks();
      });

      test('should open sign in and sign up pages from header links', async ({ page }) => {
        const navigation = new NavigationFacade(page);

        await navigation.homePage.open();
        await navigation.homePage.header.signInLink.click();
        await navigation.signInPage.expectLoaded();

        await navigation.signInPage.signUpLink.click();
        await navigation.signUpPage.expectLoaded();
        await expect(navigation.signUpPage.form.emailInput).toBeVisible();
      });
    });
  });
});
