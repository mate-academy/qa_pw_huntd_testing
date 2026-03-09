import { Page } from '@playwright/test';
import { FooterComponent } from '@src/components/footer.component';
import { HeaderComponent } from '@src/components/header.component';

export class PublicLayoutComposite {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }
}
