import { test } from '../../_fixtures/fixtures';
import {
  EMPTY_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  INVALID_REPEAT_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/authErrorMessages';

test.describe('Sign up negative tests', () => {

  test('Sign up with empty email', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.signUpForm.fillPasswordField(user.variables.password);
    await signUpPage.signUpForm.fillRepeatPasswordField(
      user.variables.password);
    await signUpPage.signUpForm.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_EMAIL_MESSAGE);
  });

  test('Sign up with empty password', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.signUpForm.fillEmailField(user.variables.email);
    await signUpPage.signUpForm.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
  });

  test('Sign up with not matched passwords', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.signUpForm.fillEmailField(user.variables.email);
    await signUpPage.signUpForm.fillPasswordField(user.variables.password);
    await signUpPage.signUpForm.fillRepeatPasswordField('123');
    await signUpPage.signUpForm.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(
      INVALID_REPEAT_PASSWORD_MESSAGE);
  });
});
