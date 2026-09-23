import { BasePage } from "./BasePage";

export class ChooseProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.candidateLink = page.locator('a[href="/profile/candidate"]');
  }

  async selectCandidate() {
    await this.candidateLink.click();
    await this.page.waitForURL(/\/profile\/candidate/);
  }
}
