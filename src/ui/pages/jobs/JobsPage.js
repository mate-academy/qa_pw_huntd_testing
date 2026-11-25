import { BasePage } from '../BasePage';
import { expect } from '../../../common/helpers/pw';
import { JobsList } from '../../components/jobs/JobsList';

export class JobsPage extends BasePage {
  #topCompaniesLink;
  #topCompaniesText;
  #jobsTitle;
  #applyModalDialog;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/jobs';
    this.#topCompaniesLink = this.page.getByRole('link', { 
      name: 'Top companies',});
    this.#topCompaniesText = 
      this.page.getByRole('heading', { name: 'Top 100 web3 companies' });
    this.#jobsTitle = this.page.getByRole(
      'heading', { name: 'Jobs', exact: true });
    this.#applyModalDialog = this.page.getByRole('dialog');
    this.jobsList = new JobsList(this.page, userId);
  }

  async clickTopCompaniesLink() {
    await this.step(`Click the 'Top companies' link`, async () => {
      await this.#topCompaniesLink.click();
    });
  }

  async assertJobsTitleIsVisible() {
    await this.step(`Assert the jobs Title is visible`, async () => {
      await expect(this.#jobsTitle).toBeVisible();
    });
  }

  async assertTopCompaniesTitleIsVisible() {
    await this.step(`Assert the top companies Title is visible`, async () => {
      await expect(this.#topCompaniesText).toBeVisible();
    });
  }

  async assertModalDialogIsVisible() {
    await this.step(`Assert the modal dialog is visible`, async () => {
      await expect(this.#applyModalDialog).
        toContainText('Create a candidate profile');
    });
  }

}
