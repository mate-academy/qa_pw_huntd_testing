import { test } from '../../_fixtures/fixtures';

test('Candidates page for unauthorized user', async ({
  externalHomePage,
  candidatesPage,
  signUpPage,
}) => {
  await externalHomePage.open();
  await externalHomePage.header.clickCandidatesLink();
  await candidatesPage.assertCandidatesTitleIsVisible();
  await candidatesPage.assertFiltersIsDisableForNotAuth();
  await candidatesPage.clickViawCandidatesLink();
  await signUpPage.assertOpened();
});
