import { BasePage } from '../BasePage';
import { expect } from '../../../common/helpers/pw';
import { CandidatesFilters } from '../../components/candidates/CandidatesFilters';

export class CandidatesPage extends BasePage {
  #viewCandidatesLink;
  #candidatesTitle;
  #notAuthorizedFilters;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/candidates';
    this.#viewCandidatesLink = this.page.getByRole('link', { 
      name: 'View 6470 more candidates',});
    this.#candidatesTitle = this.page.getByRole(
      'heading', { name: 'Candidates', exact: true });
    this.#notAuthorizedFilters = 
      this.page.locator('.NotAuthorizedFilters_disabledFilters__KwCnN');
    this.filters = new CandidatesFilters(this.page, userId);
  }

  async clickViawCandidatesLink() {
    await this.step(`Click the view candidates link`, async () => {
      await this.#viewCandidatesLink.click();
    });
  }

  async assertCandidatesTitleIsVisible() {
    await this.step(`Assert the candidates Title is visible`, async () => {
      await expect(this.#candidatesTitle).toBeVisible();
    });
  }

  async assertFiltersIsDisableForNotAuth() {
    await this.step(`Assert filters is disabled for not auth`, async () => {
      await expect(this.#notAuthorizedFilters).toBeVisible();
    });
  }
}
