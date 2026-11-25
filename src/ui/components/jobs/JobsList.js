import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw'

export class JobsList extends BaseComponent {

  #firstJobListItem;
  #firstJobApplyButton;

  constructor(page, userId = 0) {
    super(page, userId);

    this.#firstJobListItem = this.page.locator("[id='91']");
    this.#firstJobApplyButton = 
      this.#firstJobListItem.getByRole('button', {name: '1-click apply'})

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
