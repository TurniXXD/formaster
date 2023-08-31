// Enums

export enum ELangs {
  cs = "cs",
  en = "en",
}

export enum EAuthProviders {
  credentials = "credentials-login",
  github = "github",
}

export enum EFormFieldType {
  text = "text",
  number = "number",
  boolean = "boolean",
}

export enum EFormFieldValidation {
  none = "none",
  required = "required",
  startsWith = "starts_with_string_value",
  matches = "matches_string_value",
  greaterThan = "greater_than_number_value",
  equalOrGreaterThan = "equal_or_greater_than_number_value",
  lessThan = "less_than_number_value",
  equalOrLessThan = "equal_or_less_than_number_value",
}

// Interfaces & Types

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface FormFieldValidation {
  type: EFormFieldValidation;
  value?: string;
}

interface FieldSelectOption {
  value: string;
  label: string;
}

export type FieldSelectOptions = Array<FieldSelectOption>;

export interface FormFieldValidationOptions {
  common: FieldSelectOptions;
  textValue: FieldSelectOptions;
  numberValue: FieldSelectOptions;
}

export interface FormField {
  csTitle: string;
  enTitle: string;
  type: EFormFieldType;
  validation: EFormFieldValidation;
  validationValue: string;
}

type FormFields = Array<FormField>;

export interface Form {
  id: string;
  csTitle: string;
  enTitle: string;
  fields: FormFields;
  createdAt: Date;
  updatedAt: Date;
}

export type Forms = Array<Form>;
