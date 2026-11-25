import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw'

export class CandidatesFilters extends BaseComponent {

  #firstJobListItem;
  #firstJobApplyButton;

  #roleSelector;
  #roleSelectorField;
  #rolePM;

  constructor(page, userId = 0) {
    super(page, userId);

    this.#firstJobListItem = this.page.locator("[id='91']");
    this.#firstJobApplyButton = 
      this.#firstJobListItem.getByRole('button', {name: '1-click apply'})

    this.#roleSelector = this.page.getByText('RoleSelect roles').nth(1);
    this.#roleSelectorField = this.#roleSelector.
      locator('.select__value-container');
    this.#rolePM = this.page.getByText('PM', { exact: true });
  }

  async clickRoleSelector() {
    await this.step(`Click on first job in list`, async () => {
      await this.#roleSelectorField.click();
    });
  }

  async clickPMRole() {
    await this.step(`Click on first job in list`, async () => {
      await this.#rolePM.click();
    });
  }

  async clickFirstJob() {
    await this.step(`Click on first job in list`, async () => {
      await this.#firstJobListItem.click();
    });
  }

  async clickApplyButton() {
    await this.step(`Click on first job apply button`, async () => {
      await this.#firstJobApplyButton.click();
    });
  }

  async assertFirstJobHasDescription() {
    await this.step(`Assert first job description is visible`, async () => {
      await expect(this.#firstJobListItem).toContainText('Job description');
    });
  }

  async assertApplyButtonIsVisible() {
    await this.step(`Assert first job apply button is visible`, async () => {
      await expect(this.#firstJobApplyButton).toBeVisible();
    });
  }
}
