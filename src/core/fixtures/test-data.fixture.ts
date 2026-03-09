import { test as base } from '@playwright/test';
import { AccountBuilder } from '@src/core/builders/account.builder';
import {
  RecruiterProfile,
  RecruiterProfileBuilder,
} from '@src/core/builders/recruiter-profile.builder';
import { AuthCredentials } from '@src/components/auth-form.component';

type TestDataFixtures = {
  user: AuthCredentials;
  account: AuthCredentials;
  recruiterProfile: RecruiterProfile;
};

export const test = base.extend<TestDataFixtures>({
  account: async ({}, use) => {
    await use(new AccountBuilder().build());
  },

  user: async ({ account }, use) => {
    await use(account);
  },

  recruiterProfile: async ({}, use) => {
    await use(new RecruiterProfileBuilder().build());
  },
});

export { expect } from '@playwright/test';