export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  // Назва класу цього блоку трохи змінюється щоразу, коли сайт оновлюють
  // (в кінці додається якийсь випадковий шматок тексту). Тому шукаємо
  // не всю назву класу, а тільки її початок, який завжди однаковий.
  getFieldError(forAttribute) {
    return this.page
      .locator("div", {
        has: this.page.locator(`label[for="${forAttribute}"]`),
      })
      .last()
      .locator('[class*="FormField_metaBlock"]');
  }
}
