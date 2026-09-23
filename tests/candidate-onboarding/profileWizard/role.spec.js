import { test, expect } from "@playwright/test";
import { RolePage } from "../../../pages/RolePage";
import { CandidateRegistrationFlow } from "../../../flows/CandidateRegistrationFlow";
import { parentSuite, suite, subSuite } from "allure-js-commons";

test.describe("Profile Wizard - Role", () => {
  let rolePage;

  test.beforeEach(async ({ page }) => {
    await parentSuite("Candidate Onboarding");
    await suite("Profile Wizard");
    await subSuite("Role");
    const registrationFlow = new CandidateRegistrationFlow(page);
    await registrationFlow.registerNewCandidate();
    rolePage = new RolePage(page);
  });

  test("Shows an error when position is empty", async () => {
    await rolePage.submit();
    await expect(rolePage.positionError()).toBeVisible();
  });

  test("Shows an error when no desired role is selected", async () => {
    await rolePage.submit();
    await expect(rolePage.desiredRolesError()).toBeVisible();
  });

  test("Shows an error when fewer than 5 core skills are selected", async () => {
    await rolePage.submit();
    await expect(rolePage.coreSkillsError()).toBeVisible();
  });

  test("Successfully completes the Role step with valid data", async ({
    page,
  }) => {
    await rolePage.fillAll({
      position: "QA Engineer",
      desiredRoles: "QA",
      coreSkills: [
        "JavaScript",
        "API testing",
        "manual testing",
        "React.js",
        "SASS",
      ],
    });

    await rolePage.submit();

    await expect(page).toHaveURL(/\/profile\/candidate\/job-expectations/);
  });
});
