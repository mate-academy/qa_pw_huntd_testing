import { test } from '../../_fixtures/fixtures';

test('Social Sign Up buttons is visible', async ({
  signUpPage
}) => {

  await signUpPage.open();
  await signUpPage.signUpForm.assertGoogleSignUpIsVisible();
  await signUpPage.signUpForm.assertLinkedinSignUpIsVisible();
  await signUpPage.signUpForm.assertGitSignUpIsVisible();

});
