import { AuthCredentials } from '@src/components/auth-form.component';

export class AccountBuilder {
  private email = `autotest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;
  private password = 'Password123!';
  private repeatPassword = 'Password123!';

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withPassword(password: string) {
    this.password = password;
    this.repeatPassword = password;
    return this;
  }

  withRepeatPassword(repeatPassword: string) {
    this.repeatPassword = repeatPassword;
    return this;
  }

  build(): AuthCredentials {
    return {
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
    };
  }
}
