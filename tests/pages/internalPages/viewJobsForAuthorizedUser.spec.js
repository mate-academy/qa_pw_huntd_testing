import { test } from '../../_fixtures/fixtures';

test('Jobs page for authorized user', async ({
  signInPage,
  jobsPage,
  internalHomePage,
  registeredUser,
}) => {
  await signInPage.open();
  await signInPage.signInForm.fillEmailField(registeredUser.variables.email);
  await signInPage.signInForm.fillPasswordField(
    registeredUser.variables.password);
  await signInPage.signInForm.clickSignInButton();

  await internalHomePage.chooseProfile.assertTabTextVisible();
  await internalHomePage.open();
  await internalHomePage.header.clickJobsLink();
  await jobsPage.assertJobsTitleIsVisible();
  await jobsPage.jobsList.clickFirstJob();
  await jobsPage.jobsList.assertFirstJobHasDescription();
  await jobsPage.jobsList.clickApplyButton();
  await jobsPage.assertModalDialogIsVisible();
});
