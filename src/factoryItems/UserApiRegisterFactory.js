import { faker } from '@faker-js/faker';

export class UserApiRegisterFactory {
  
  generateUser(options = {}) {
    const user = { "operationName": "signUp",
  "variables": {
    "email": "annabelle_jarod_klein45@hotmail.com",
    "password": "RMkhNEHHKjvLBfP",
    "repeatPassword": "RMkhNEHHKjvLBfP",
    "fvType": "typein",
    "fvSource": "(direct)",
    "fvMedium": "(none)",
    "fvCampaign": "(none)",
    "fvContent": "(none)",
    "fvTerm": "(none)",
    "lvType": "typein",
    "lvSource": "(direct)",
    "lvMedium": "(none)",
    "lvCampaign": "(none)",
    "lvContent": "(none)",
    "lvTerm": "(none)",
    "gclid": "",
    "gClientid": null,
    "gIp": "(none)",
    "gAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "+
    "(KHTML, like Gecko) Chrome/131.0.6778.33 Safari/537.36"
  },
  "query": "mutation signUp($email: String!, $phone: String, $password: "+
  "String!, $repeatPassword: String!, $firstName: String, $lastName: String,"+
  " $fvType: String, $fvSource: String, $fvMedium: String, $fvCampaign: "+
  "String, $fvContent: String, $fvTerm: String, $lvType: String, $lvSource: "+
  "String, $lvMedium: String, $lvCampaign: String, $lvContent: String, "+
  "$lvTerm: String, $gClientid: String, $gIp: String, $gAgent: String, $gclid:"+
  " String) {\n  signUp(\n    email: $email\n    phone: $phone\n    "+
  "password: $password\n    repeatPassword: $repeatPassword\n    firstName: "+
  "$firstName\n    lastName: $lastName\n    fvType: $fvType\n    fvSource: "+
  "$fvSource\n    fvMedium: $fvMedium\n    fvCampaign: $fvCampaign\n    "+
  "fvContent: $fvContent\n    fvTerm: $fvTerm\n    lvType: $lvType\n    "+
  "lvSource: $lvSource\n    lvMedium: $lvMedium\n    lvCampaign: $lvCampaign\n"+
  "    lvContent: $lvContent\n    lvTerm: $lvTerm\n    gClientid: $gClientid\n"+
  "    gIp: $gIp\n    gAgent: $gAgent\n    gclid: $gclid\n  ) {\n    "+
  "...UserBase\n    ...UserPrimaryProfile\n    ...UserEngagementFields\n    "+
  "__typename\n  }\n}\n\nfragment UserBase on User {\n  id\n  firstName\n  "+
  "lastName\n  computedName\n  username\n  email\n  phone\n  inactive\n  "+
  "confirmed\n  lastActionTime\n  created\n  isAdminUser\n  linkedinUrl\n  "+
  "behanceUrl\n  githubUrl\n  ethWalletAddress\n  __typename\n}\n\nfragment"+
  " UserPrimaryProfile on User {\n  primaryProfile\n  __typename\n}"+
  "\n\nfragment UserEngagementFields on User {\n  fvType\n  fvSource\n  "+
  "fvMedium\n  fvCampaign\n  fvContent\n  fvTerm\n  lvType\n  lvSource\n  "+
  "lvMedium\n  lvCampaign\n  lvContent\n  lvTerm\n  gClientid\n  gIp\n  "+
  "gAgent\n  gclid\n  __typename\n}\n"
};
    const firstName = this.generateFirstName();
    const email = this.generateEmail(firstName);
    const password = this.generatePassword();

    user.variables.email = options.email ?? email;
    user.variables.password = options.password ?? password;
    user.variables.repeatPassword = options.password ?? password;

    return user;
  }

  generateFirstName() {
    return faker.person.firstName();
  }

  generatePassword() {
    return faker.internet.password();
  }

  generateEmail(firstName) {
    return `${firstName}_${faker.internet.email()}`.toLowerCase();
  }
}
