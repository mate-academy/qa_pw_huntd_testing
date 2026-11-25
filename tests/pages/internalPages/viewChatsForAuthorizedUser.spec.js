import { test } from '../../_fixtures/fixtures';

test('Chats available for authorized user', async ({
  signInPage,
  chatsPage,
  internalHomePage,
  registeredUser,
}) => {
  await signInPage.open();
  await signInPage.signInForm.fillEmailField(registeredUser.variables.email);
  await signInPage.signInForm.fillPasswordField(
    registeredUser.variables.password);
  await signInPage.signInForm.clickSignInButton();

  await internalHomePage.open();
  await chatsPage.open();
  await chatsPage.assertChatsTitleIsVisible();
});
