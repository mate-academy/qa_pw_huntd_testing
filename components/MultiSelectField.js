export class MultiSelectField {
  constructor(page, fieldName, openTrigger, errorLocator) {
    this.page = page;
    this.control = page.getByRole("textbox", { name: fieldName });
    this.openTrigger = openTrigger ?? this.control;
    this.errorLocator = errorLocator;
  }

  async open() {
    await this.openTrigger.click({ force: true });
  }

  async close() {
    await this.page.keyboard.press("Escape");
  }

  async selectOption(optionText) {
    await this.open();
    await this.page.getByText(optionText, { exact: true }).click();
    await this.close();
  }

  async selectByTyping(optionText) {
    await this.open();
    await this.page.keyboard.type("a");
    await this.page.getByText(optionText, { exact: true }).click();
    await this.close();
  }

  async fill(value) {
    if (Array.isArray(value)) {
      for (const item of value) {
        await this.selectByTyping(item);
      }
    } else {
      await this.selectOption(value);
    }
  }

  getError() {
    return this.errorLocator;
  }
}
