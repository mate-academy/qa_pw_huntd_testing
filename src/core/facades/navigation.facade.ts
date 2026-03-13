import { Page } from '@playwright/test';
import { CandidatesPage } from '@src/pages/candidates.page';
import { HomePage } from '@src/pages/home.page';
import { JobsPage } from '@src/pages/jobs.page';
import { SignInPage } from '@src/pages/sign-in.page';
import { SignUpPage } from '@src/pages/sign-up.page';

export class NavigationFacade {
  readonly homePage: HomePage;
  readonly candidatesPage: CandidatesPage;
  readonly jobsPage: JobsPage;
  readonly signInPage: SignInPage;
  readonly signUpPage: SignUpPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.candidatesPage = new CandidatesPage(page);
    this.jobsPage = new JobsPage(page);
    this.signInPage = new SignInPage(page);
    this.signUpPage = new SignUpPage(page);
  }
}
