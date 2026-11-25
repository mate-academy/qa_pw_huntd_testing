import { BaseComponent } from '../BaseComponent';

export class BaseHeader extends BaseComponent {
  #homeLink;
  #huntdLogo;
  #candidatesLink;
  #jobsLink;


  constructor(page, userId = 0) {
    super(page, userId);
    this.#huntdLogo = this.page.getByRole('link', { name: 'Huntd' });
    this.#candidatesLink = this.page.getByRole('link', { name: 'Candidates' });
    this.#jobsLink = this.page.getByRole('link', { name: 'Jobs', exact: true });

    this.#homeLink = this.page.getByRole('link', { name: 'Home' });
  }

  async clickHundtLogo() {
    await this.step(`Click 'Hundt' logo in the page header`, async () => {
      await this.#huntdLogo.click();
    });
  }

  async clickCandidatesLink() {
    await this.step(`Click 'Candidates' link in the page header`, async () => {
      await this.#candidatesLink.click();
    });
  }

  async clickJobsLink() {
    await this.step(`Click 'Jobs' link in the page header`, async () => {
      await this.#jobsLink.click();
    });
  }

  async clickHomeLink() {
    await this.step(`Click 'Home' link in the page header`, async () => {
      await this.#homeLink.click();
    });
  }
}
