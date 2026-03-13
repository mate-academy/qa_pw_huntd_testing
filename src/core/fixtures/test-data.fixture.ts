import { test as base } from '@playwright/test';
import { AccountBuilder } from '@src/core/builders/account.builder';
import {
  RecruiterProfile,
  RecruiterProfileBuilder,
} from '@src/core/builders/recruiter-profile.builder';
import {
  RecruiterContactsBuilder,
  RecruiterContactsData,
} from '@src/core/builders/recruiter-contacts.builder';
import { AuthCredentials } from '@src/components/auth-form.component';

type TestDataFixtures = {
  account: AuthCredentials;
  recruiterProfile: RecruiterProfile;
  recruiterContactsData: RecruiterContactsData;
};

export const test = base.extend<TestDataFixtures>({
  account: async ({}, use) => {
    await use(new AccountBuilder().build());
  },

  recruiterProfile: async ({}, use) => {
    await use(new RecruiterProfileBuilder().build());
  },

  recruiterContactsData: async ({}, use) => {
    await use(new RecruiterContactsBuilder().build());
  },
});

export { expect } from '@playwright/test';