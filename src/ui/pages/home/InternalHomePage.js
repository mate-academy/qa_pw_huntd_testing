import { BaseHomePage } from './BaseHomePage';
import { InternalHeader } from '../../components/header/InternalHeader';
import { ChooseProfileTab } from '../../components/ChooseProfileTab';

export class InternalHomePage extends BaseHomePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.header = new InternalHeader(this.page, userId);
    this.chooseProfile = new ChooseProfileTab(this.page, userId);
  }
}
