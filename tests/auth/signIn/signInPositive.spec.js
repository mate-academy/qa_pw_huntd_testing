import { test } from '../../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({
  signInPage,
  internalHomePage,
  registeredUser,
}) => {
  await signInPage.open();
  await signInPage.signInForm.fillEmailField(registeredUser.variables.email);
  await signInPage.signInForm.fillPasswordField(
    registeredUser.variables.password);
  await signInPage.signInForm.clickSignInButton();

  //await internalHomePage.open();
  await internalHomePage.chooseProfile.assertTabTextVisible();
});
