import { BasePage } from "./BasePage";
import { TextField } from "../components/TextField";
import { FormComposite } from "../components/FormComposite";

export class SignUpPage extends BasePage {
  constructor(page) {
    super(page);
    this.createAccountButton = page.getByRole("button", {
      name: /create account/i,
    });

    this.form = new FormComposite({
      email: new TextField(
        page,
        page.locator("#email"),
        this.getFieldError("email"),
      ),
      password: new TextField(
        page,
        page.locator("#password"),
        this.getFieldError("password"),
      ),
      repeatPassword: new TextField(
        page,
        page.locator("#repeatPassword"),
        this.getFieldError("repeatPassword"),
      ),
    });
  }

  async open() {
    await this.goto("/sign-up");
  }

  async fillEmail(email) {
    await this.form.fields.email.fill(email);
  }

  async fillPassword(password) {
    await this.form.fields.password.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.form.fields.repeatPassword.fill(password);
  }

  async fillAll({ email, password, repeatPassword = password }) {
    await this.form.fillAll({ email, password, repeatPassword });
  }

  async submit() {
    await this.createAccountButton.click();
  }

  emailError() {
    return this.form.fields.email.getError();
  }

  passwordError() {
    return this.form.fields.password.getError();
  }

  repeatPasswordError() {
    return this.form.fields.repeatPassword.getError();
  }
}
