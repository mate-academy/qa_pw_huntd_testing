import { test } from '../../_fixtures/fixtures';

test('Chats are not available for unauthorized user', async ({
  externalHomePage,
}) => {
  await externalHomePage.open();
  await externalHomePage.header.assertSignInButtonIsVisible();
  await externalHomePage.header.assertChatsLinkIsNotVisible();
});
