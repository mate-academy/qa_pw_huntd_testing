import { test } from '../../_fixtures/fixtures';

test('Social Sign In buttons is visible', async ({
  signInPage
}) => {

  await signInPage.open();
  await signInPage.signInForm.assertGoogleSignInIsVisible();
  await signInPage.signInForm.assertLinkedinSignInIsVisible();
  await signInPage.signInForm.assertGitSignInIsVisible();

});
