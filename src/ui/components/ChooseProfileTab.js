import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class ChooseProfileTab extends BaseComponent {
  #chooseProfileText;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#chooseProfileText = 
      this.page.getByRole('heading', { name: 'I am...' });
  }

  async assertTabTextVisible() {
    await this.step(`Assert choose role text is visible`, async () => {
      await expect(this.#chooseProfileText).toBeVisible();
    });
  }
}
