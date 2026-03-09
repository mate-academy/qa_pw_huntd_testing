import { test, expect } from '@src/core/fixtures';
import { RegistrationFacade } from '@src/core/facades/registration.facade';
import { RecruiterContactsPage } from '@src/pages/onboarding/recruiter-contacts.page';
import { RecruiterOutreachPage } from '@src/pages/onboarding/recruiter-outreach.page';
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

      test('should open recruiter specific onboarding after recruiter profile is selected', async ({
        page,
        account,
        recruiterProfile,
      }) => {
        const registration = new RegistrationFacade(page);

        await registration.registerAsRecruiter(account, recruiterProfile);

        await expect(registration.recruiterCompanyDetailsPage.roleInput).toHaveValue(
          recruiterProfile.role
        );
        await expect(registration.recruiterCompanyDetailsPage.companyInput).toHaveValue(
          recruiterProfile.company
        );
      });

      test('should continue recruiter onboarding to contacts and outreach step', async ({
        page,
        account,
        recruiterProfile,
      }) => {
        const registration = new RegistrationFacade(page);
        const contactsPage = new RecruiterContactsPage(page);
        const perfectCandidatePage = new PerfectCandidatePage(page);
        const recruiterOutreachPage = new RecruiterOutreachPage(page);

        await registration.createAccount(account);
        await registration.chooseProfilePage.chooseRecruiter();
        await registration.recruiterCompanyDetailsPage.submit(recruiterProfile);

        await contactsPage.expectLoaded();
        await expect(contactsPage.firstNameInput).toBeVisible();

        await contactsPage.submit({
          firstName: 'Zoryana',
          lastName: 'Fedorovska',
          linkedinUrl: 'https://www.linkedin.com/in/zoryana-fedorovska',
          ethWalletAddress: '',
        });

        await perfectCandidatePage.expectLoaded();
      });

      test('should open recruiter chats UI after onboarding', async ({
        page,
        account,
        recruiterProfile,
      }) => {
        const registration = new RegistrationFacade(page);
        const contactsPage = new RecruiterContactsPage(page);
        const perfectCandidatePage = new PerfectCandidatePage(page);
        const chatsPage = new ChatsPage(page);

        await registration.createAccount(account);
        await registration.chooseProfilePage.chooseRecruiter();
        await registration.recruiterCompanyDetailsPage.submit(recruiterProfile);

        await contactsPage.expectLoaded();

        await contactsPage.submit({
          firstName: 'Test',
          lastName: 'Recruiter',
          linkedinUrl: 'https://linkedin.com/in/test',
          ethWalletAddress: '',
        });

        await perfectCandidatePage.expectLoaded();

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