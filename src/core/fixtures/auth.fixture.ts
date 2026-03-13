import { Page, expect, test as base } from '@playwright/test';
import { AuthFacade } from '@src/core/facades/auth.facade';
import { env } from '@src/core/config/env';
import { routes } from '@src/core/config/routes';

type AuthFixtures = {
  loggedInPage: Page;
  loginAs: (email?: string, password?: string) => Promise<void>;
};

async function loginAndWait(page: Page, email: string, password: string) {
  const auth = new AuthFacade(page);

  await auth.login({
    email,
    password,
  });

  await page.waitForURL((url) => !url.pathname.includes(routes.signIn), {
    timeout: 15000,
  });

  await expect(page).not.toHaveURL(/sign-in/i);
}

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    base.skip(!env.authEmail || !env.authPassword, 'AUTH_EMAIL and AUTH_PASSWORD are not configured.');

    await loginAndWait(page, env.authEmail!, env.authPassword!);

    await use(page);
  },

  loginAs: async ({ page }, use) => {
    await use(async (email = env.authEmail, password = env.authPassword) => {
      if (!email || !password) {
        throw new Error('AUTH_EMAIL and AUTH_PASSWORD must be configured.');
      }

      await loginAndWait(page, email, password);
    });
  },
});

export { expect };