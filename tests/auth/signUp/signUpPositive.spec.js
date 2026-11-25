import { test } from '../../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({
   user, signUpPage, internalHomePage }) => {
  
  await signUpPage.open();
  await signUpPage.signUpForm.fillEmailField(user.variables.email);
  await signUpPage.signUpForm.fillPasswordField(user.variables.password);
  await signUpPage.signUpForm.fillRepeatPasswordField(user.variables.password);
  await signUpPage.signUpForm.clickSignUpButton();
  await signUpPage.assertChoseRoleTextIsVisible();

  await internalHomePage.open();
  await internalHomePage.header.assertProfileButtonIsVisible();

});
