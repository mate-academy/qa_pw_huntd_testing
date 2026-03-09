import { test, expect } from '@src/core/fixtures/test-data.fixture';
import { SignInPage } from '@src/pages/sign-in.page';
import { SignUpPage } from '@src/pages/sign-up.page';

test.describe('parentSuite: Authentication', () => {
  test.describe('suite: Guest Forms', () => {
    test.describe('subSuite: Regression', () => {
      test('should render sign in form and related actions', async ({ page }) => {
        const signInPage = new SignInPage(page);

        await signInPage.open();
        await signInPage.expectLoaded();

        await expect(signInPage.form.emailInput).toBeVisible();
        await expect(signInPage.form.passwordInput).toBeVisible();
        await expect(signInPage.forgotPasswordLink).toBeVisible();
      });

      test('should render sign up form with repeat password field', async ({ page, user }) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.open();
        await signUpPage.expectLoaded();
        await signUpPage.form.fill(user);

        await expect(signUpPage.form.emailInput).toHaveValue(user.email);
        await expect(signUpPage.form.passwordInput).toHaveValue(user.password);
        await expect(signUpPage.form.repeatPasswordInput).toHaveValue(user.repeatPassword!);
      });
    });
  });
});
