import { test } from '../../_fixtures/fixtures';

test('Candidates page for authorized user', async ({
  signInPage,
  candidatesPage,
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
  await internalHomePage.header.clickCandidatesLink();
  await candidatesPage.assertCandidatesTitleIsVisible();
  await candidatesPage.filters.clickRoleSelector();
  await candidatesPage.filters.clickPMRole();
});
