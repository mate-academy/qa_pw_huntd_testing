import { test, expect } from '@src/core/fixtures';
import { CandidatesPage } from '@src/pages/candidates.page';
import { ChatsPage } from '@src/pages/chats.page';
import { JobsPage } from '@src/pages/jobs.page';

test.describe('parentSuite: Authenticated Area', () => {
  test.describe('suite: Signed In User', () => {
    test.describe('subSuite: Regression', () => {
      test('should open chats page for authenticated recruiter', async ({ loggedInPage }) => {
        const chatsPage = new ChatsPage(loggedInPage);

        await chatsPage.open();
        await chatsPage.expectLoaded();
        await chatsPage.openFirstChat();
        await chatsPage.expectChatOpened();
      });

      test('should open jobs page for authenticated recruiter', async ({ loggedInPage }) => {
        const jobsPage = new JobsPage(loggedInPage);

        await jobsPage.open();
        await jobsPage.expectLoaded();
        await expect(loggedInPage).toHaveURL(/\/jobs/i);
      });

      test('should open candidates page for authenticated recruiter', async ({ loggedInPage }) => {
        const candidatesPage = new CandidatesPage(loggedInPage);

        await candidatesPage.open();
        await candidatesPage.expectLoaded();
        await expect(loggedInPage).toHaveURL(/\/candidates/i);
      });
    });
  });
});