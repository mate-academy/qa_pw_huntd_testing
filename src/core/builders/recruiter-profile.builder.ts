export type RecruiterProfile = {
  role: string;
  company: string;
};

export class RecruiterProfileBuilder {
  private role = 'Recruiter';
  private company = `QA Company ${Date.now()}`;

  withRole(role: string) {
    this.role = role;
    return this;
  }

  withCompany(company: string) {
    this.company = company;
    return this;
  }

  build(): RecruiterProfile {
    return {
      role: this.role,
      company: this.company,
    };
  }
}
