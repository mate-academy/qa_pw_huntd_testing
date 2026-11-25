import { test as base } from '@playwright/test';
import { JobsPage } from '../../../src/ui/pages/jobs/JobsPage';
import { CandidatesPage } from '../../../src/ui/pages/candidates/CandidatesPage';
import { ChatsPage } from '../../../src/ui/pages/chats/ChatsPage';

export const test = base.extend<{
  jobsPage: any;
  candidatesPage: any;
  chatsPage: any;
}>({
  jobsPage: async ({ page }, use) => {
    const jobsPage = new JobsPage(page);

    await use(jobsPage);
  },
  candidatesPage: async ({ page }, use) => {
    const candidatesPage = new CandidatesPage(page);

    await use(candidatesPage);
  },
  chatsPage: async ({ page }, use) => {
    const chatsPage = new ChatsPage(page);

    await use(chatsPage);
  },
});
