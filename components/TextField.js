export class TextField {
  constructor(page, locator, errorLocator) {
    this.page = page;
    this.locator = locator;
    this.errorLocator = errorLocator;
  }

  async fill(value) {
    await this.locator.fill(value);
  }

  getError() {
    return this.errorLocator;
  }
}
