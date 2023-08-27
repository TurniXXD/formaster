// Enums

export enum ELangs {
  cs = "cs",
  en = "en",
}

export enum ETranslatableErrors {
  invalidEmail = "invalid_email",
  invalidPassword = "invalid_password",
  mustMatch = "must_match",
  mustStartWith = "must_start_with",
  requiredField = "required_field",
  mustBeGreaterThan = "must_be_greater_than",
  mustBeEqualOrGreaterThan = "must_be_equal_or_greater_than",
  mustBeLessThan = "must_be_less_than",
  mustBeEqualOrLessThan = "must_be_equal_or_less_than",
}

export enum EAuthProviders {
  credentials = "credentials-login",
  github = "github",
}

export enum EFormFieldType {
  text = "text",
  number = "text",
  boolean = "boolean",
}

export enum EFormFieldValidation {
  required = "required",
  startsWith = "startsWith",
  matches = "matches",
  greaterThan = "greater",
  equalOrGreaterThan = "equalOrGreaterThan",
  lessThan = "less",
  equalOrLessThan = "equalOrLessThan",
}

// Interfaces

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface FormFieldValidation {
  type: EFormFieldValidation;
  error: ETranslatableErrors;
  value?: string;
}

interface FormTitleInternationalized {
  value: string;
  locale: ELangs;
}

export type FormTitleTranslationObject = Array<FormTitleInternationalized>;

interface FormField {
  title: FormTitleTranslationObject;
  type: EFormFieldType;
  validations?: Array<FormFieldValidation>;
}

export interface Form {
  id: string;
  title: FormTitleTranslationObject;
  fields: Array<FormField>;
  createdAt: Date;
  updatedAt: Date;
}

export type Forms = Array<Form>;
