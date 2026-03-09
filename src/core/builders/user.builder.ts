import { AuthCredentials } from '@src/components/auth-form.component';

export class UserBuilder {
  private email = `autotest_${Date.now()}@example.com`;
  private password = 'Password123!';
  private repeatPassword = 'Password123!';

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withPassword(password: string) {
    this.password = password;
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
