import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../../pages/SignUpPage";
import { SignUpDataBuilder } from "../../../utils/builders/SignUpDataBuilder";
import { parentSuite, suite, subSuite } from "allure-js-commons";

test.describe("Sign Up", () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    await parentSuite("Candidate Onboarding");
    await suite("Authentication");
    await subSuite("Sign Up");
    signUpPage = new SignUpPage(page);
    await signUpPage.open();
  });

  test("Shows an error when email is empty", async () => {
    await signUpPage.submit();
    await expect(signUpPage.emailError()).toBeVisible();
  });

  test("Shows an error for invalid email format", async () => {
    await signUpPage.fillEmail("not-an-email");
    await signUpPage.submit();
    await expect(signUpPage.emailError()).toBeVisible();
  });

  test("Shows an error when password is empty", async () => {
    await signUpPage.fillEmail("test@gmail.com");
    await signUpPage.submit();
    await expect(signUpPage.passwordError()).toBeVisible();
  });

  test("Shows an error when repeat password is empty", async () => {
    await signUpPage.fillEmail("test@gmail.com");
    await signUpPage.fillPassword("123456");
    await signUpPage.submit();
    await expect(signUpPage.repeatPasswordError()).toBeVisible();
  });

  test("shows an error when passwords do not match", async () => {
    await signUpPage.fillEmail("test@gmail.com");
    await signUpPage.fillPassword("123456");
    await signUpPage.fillRepeatPassword("34333");
    await signUpPage.submit();
    await expect(signUpPage.repeatPasswordError()).toBeVisible();
  });

  test("Creates an account with valid data", async ({ page }) => {
    const userData = new SignUpDataBuilder().build();

    await signUpPage.fillAll(userData);
    await signUpPage.submit();

    await expect(page).toHaveURL(/\/choose-profile/);
  });
});
