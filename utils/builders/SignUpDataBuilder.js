import { faker } from "@faker-js/faker";

export class SignUpDataBuilder {
  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password({ length: 10 });
  }

  withEmail(email) {
    this.email = email;
    return this;
  }

  withPassword(password) {
    this.password = password;
    return this;
  }

  build() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
