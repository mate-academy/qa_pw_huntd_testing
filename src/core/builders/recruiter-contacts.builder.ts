export type RecruiterContactsData = {
  firstName: string;
  lastName: string;
  linkedinUrl: string;
  ethWalletAddress: string;
};

export class RecruiterContactsBuilder {
  private firstName = 'Test';
  private lastName = 'Recruiter';
  private linkedinUrl = 'https://linkedin.com/in/test-recruiter';
  private ethWalletAddress = '';

  withFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  withLinkedinUrl(linkedinUrl: string) {
    this.linkedinUrl = linkedinUrl;
    return this;
  }

  withEthWalletAddress(ethWalletAddress: string) {
    this.ethWalletAddress = ethWalletAddress;
    return this;
  }

  build(): RecruiterContactsData {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      linkedinUrl: this.linkedinUrl,
      ethWalletAddress: this.ethWalletAddress,
    };
  }
}