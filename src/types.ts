// Enums

export enum ELangs {
  cs = "cs",
  en = "en",
}

export enum ETranslatableErrors {
  invalidEmail = "invalid_email",
  invalidPassword = "invalid_password",
}

export enum EAuthProviders {
  credentials = "credentials-login",
  github = "github",
}

// Interfaces

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}
