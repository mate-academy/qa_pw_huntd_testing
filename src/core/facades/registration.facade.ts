import { Page } from '@playwright/test';
import { AuthCredentials } from '@src/components/auth-form.component';
import { RecruiterProfile } from '@src/core/builders/recruiter-profile.builder';
import { ChooseProfilePage } from '@src/pages/choose-profile.page';
import { SignUpPage } from '@src/pages/sign-up.page';
import { RecruiterCompanyDetailsPage } from '@src/pages/onboarding/recruiter-company-details.page';

export class RegistrationFacade {
  readonly signUpPage: SignUpPage;
  readonly chooseProfilePage: ChooseProfilePage;
  readonly recruiterCompanyDetailsPage: RecruiterCompanyDetailsPage;

  constructor(private readonly page: Page) {
    this.signUpPage = new SignUpPage(page);
    this.chooseProfilePage = new ChooseProfilePage(page);
    this.recruiterCompanyDetailsPage = new RecruiterCompanyDetailsPage(page);
  }

  async createAccount(credentials: AuthCredentials) {
    await this.signUpPage.open();
    await this.signUpPage.expectLoaded();
    await this.signUpPage.register(credentials);
    await this.chooseProfilePage.expectLoaded();
  }

  async registerAsCandidate(credentials: AuthCredentials) {
    await this.createAccount(credentials);
    await this.chooseProfilePage.chooseCandidate();
  }

  async registerAsRecruiter(credentials: AuthCredentials, recruiterProfile: RecruiterProfile) {
    await this.createAccount(credentials);
    await this.chooseProfilePage.chooseRecruiter();
    await this.recruiterCompanyDetailsPage.expectLoaded();
    await this.recruiterCompanyDetailsPage.fill(recruiterProfile);
  }
}
