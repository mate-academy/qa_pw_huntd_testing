import { test } from '@playwright/test';
import { CandidatesPage } from '@src/pages/candidates.page';
import { JobsPage } from '@src/pages/jobs.page';

test.describe('parentSuite: Public Area', () => {
  test.describe('suite: Discovery', () => {
    test.describe('subSuite: Regression', () => {
      test('should show guest restriction wall on candidates page', async ({ page }) => {
        const candidatesPage = new CandidatesPage(page);

        await candidatesPage.open();
        await candidatesPage.expectLoaded();
        await candidatesPage.expectGuestRestrictionVisible();
      });

      test('should show job categories on jobs page', async ({ page }) => {
        const jobsPage = new JobsPage(page);

        await jobsPage.open();
        await jobsPage.expectLoaded();
        await jobsPage.categories.expectMainCategoriesVisible();
      });
    });
  });
});
