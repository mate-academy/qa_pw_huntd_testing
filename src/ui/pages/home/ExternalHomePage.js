import { expect } from 'allure-playwright';
import { BaseHomePage } from './BaseHomePage';
import { ExternalHeader } from '../../components/header/ExternalHeader';

export class ExternalHomePage extends BaseHomePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = new ExternalHeader(this.page, userId);
    this.mainText = page.getByRole('heading', {name: 'Let remote '});
  }

  async assertMainTextIsvisible() {
    await this.step(`Assert main text is visible`, async () => {
      await expect(this.mainText).toBeVisible();
    });
  }
}
