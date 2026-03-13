import { test, expect } from '@src/core/fixtures';
import { RegistrationFacade } from '@src/core/facades/registration.facade';
import { RecruiterContactsPage } from '@src/pages/onboarding/recruiter-contacts.page';
import { PerfectCandidatePage } from '@src/pages/onboarding/perfect-candidate.page';
import { ChatsPage } from '@src/pages/chats.page';

test.describe('parentSuite: Registration', () => {
  test.describe('suite: Role Based Sign Up', () => {
    test.describe('subSuite: E2E', () => {
      test('should let a new user choose between candidate and recruiter profiles after sign up', async ({
        page,
        account,
      }) => {
        const registration = new RegistrationFacade(page);

        await registration.createAccount(account);

        await expect(registration.chooseProfilePage.candidateOption).toBeVisible();
        await expect(registration.chooseProfilePage.recruiterOption).toBeVisible();
      });

      test('should route a new user to candidate onboarding when candidate profile is selected', async ({
        page,
        account,
      }) => {
        const registration = new RegistrationFacade(page);

        await registration.registerAsCandidate(account);

        await expect(page).toHaveURL(/\/profile\/candidate/i);
      });

      test.describe('recruiter flow', () => {
        let registration: RegistrationFacade;

        test.beforeEach(async ({ page, account }) => {
          registration = new RegistrationFacade(page);

          await registration.createAccount(account);
          await registration.chooseProfilePage.chooseRecruiter();
        });

        test('should open recruiter specific onboarding after recruiter profile is selected', async () => {
          await registration.recruiterCompanyDetailsPage.expectLoaded();
          await expect(registration.recruiterCompanyDetailsPage.roleInput).toBeVisible();
          await expect(registration.recruiterCompanyDetailsPage.companyInput).toBeVisible();
          await expect(
            registration.recruiterCompanyDetailsPage.saveAndContinueButton
          ).toBeVisible();
        });

        test.describe('company details submitted', () => {
          let contactsPage: RecruiterContactsPage;
          let perfectCandidatePage: PerfectCandidatePage;
          let chatsPage: ChatsPage;

          test.beforeEach(async ({ page, recruiterProfile }) => {
            contactsPage = new RecruiterContactsPage(page);
            perfectCandidatePage = new PerfectCandidatePage(page);
            chatsPage = new ChatsPage(page);

            await registration.recruiterCompanyDetailsPage.submit(recruiterProfile);
          });

          test('should continue recruiter onboarding to contacts and outreach step', async ({
            recruiterContactsData,
          }) => {
            await contactsPage.expectLoaded();
            await expect(contactsPage.firstNameInput).toBeVisible();

            await contactsPage.submit(recruiterContactsData);

            await perfectCandidatePage.expectLoaded();
          });

          test.describe('contacts submitted', () => {
            test.beforeEach(async ({ recruiterContactsData }) => {
              await contactsPage.expectLoaded();
              await contactsPage.submit(recruiterContactsData);
              await perfectCandidatePage.expectLoaded();
            });

            test('should open recruiter chats UI after onboarding', async () => {
              await perfectCandidatePage.submit({
                role: ['Full Stack'],
                technologies: ['JavaScript'],
                jobExperience: '3+ years',
                message:
                  'Hey! We are an early-stage startup building a new product and looking for a Full Stack engineer with JavaScript experience.',
              });

              await chatsPage.expectLoaded();
              await chatsPage.openFirstChat();
              await chatsPage.expectChatOpened();
            });
          });
        });
      });
    });
  });
});