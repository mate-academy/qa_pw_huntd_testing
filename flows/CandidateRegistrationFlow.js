import { SignUpPage } from "../pages/SignUpPage";
import { ChooseProfilePage } from "../pages/ChooseProfilePage";
import { SignUpDataBuilder } from "../utils/builders/SignUpDataBuilder";

export class CandidateRegistrationFlow {
  constructor(page) {
    this.page = page;
  }

  async registerNewCandidate() {
    const signUpPage = new SignUpPage(this.page);
    await signUpPage.open();

    const userData = new SignUpDataBuilder().build();
    await signUpPage.fillEmail(userData.email);
    await signUpPage.fillPassword(userData.password);
    await signUpPage.fillRepeatPassword(userData.password);
    await signUpPage.submit();

    const chooseProfilePage = new ChooseProfilePage(this.page);
    await chooseProfilePage.selectCandidate();

    return userData;
  }
}
