import { test } from '../../_fixtures/fixtures';

test('Jobs page for unauthorized user', async ({
  externalHomePage,
  jobsPage,
}) => {
  await externalHomePage.open();
  await externalHomePage.header.clickJobsLink();
  await jobsPage.assertJobsTitleIsVisible();
  await jobsPage.jobsList.clickFirstJob();
  await jobsPage.jobsList.assertFirstJobHasDescription();
  await jobsPage.jobsList.assertApplyButtonIsVisible();
  await jobsPage.clickTopCompaniesLink();
  await jobsPage.assertTopCompaniesTitleIsVisible();
});
