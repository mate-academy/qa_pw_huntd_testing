import { test } from '@src/core/fixtures';
import { HomePage } from '@src/pages/home.page';

test.describe('parentSuite: Public Area', () => {
  test.describe('suite: Home', () => {
    test.describe('subSuite: Regression', () => {
      test('should display hero section and featured jobs', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.expectLoaded();
        await homePage.featuredJobs.expectAtLeastOneFeaturedJob();
      });
    });
  });
});
