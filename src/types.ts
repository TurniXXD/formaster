import { InputHTMLAttributes } from "react";

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
  equalTo = "equal_to_number_value",
  greaterThan = "greater_than_number_value",
  equalOrGreaterThan = "equal_or_greater_than_number_value",
  lessThan = "less_than_number_value",
  equalOrLessThan = "equal_or_less_than_number_value",
}

export enum ERoutesPaths {
  root = "/",
  authLogin = "/auth/login/",
  formBuilder = "/form-builder/",
  formTester = "/form-tester/",
}

// Interfaces & Types

export interface IInputFieldCustomProps {
  error?: boolean;
}

export type TInputField = InputHTMLAttributes<HTMLInputElement> &
  IInputFieldCustomProps;

export type TSelectField = InputHTMLAttributes<HTMLSelectElement> &
  IInputFieldCustomProps & {
    options: TFieldSelectOptions;
  };

export type TTextAreaField = InputHTMLAttributes<HTMLTextAreaElement> &
  IInputFieldCustomProps;

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IFormFieldValidation {
  type: EFormFieldValidation;
  value?: string;
}

interface IFieldSelectOption {
  value: string | boolean | number;
  label: string;
}

export type TFieldSelectOptions = Array<IFieldSelectOption>;

export interface IFormFieldValidationOptions {
  common: TFieldSelectOptions;
  textValue: TFieldSelectOptions;
  numberValue: TFieldSelectOptions;
}

export interface IFormField {
  csTitle: string;
  enTitle: string;
  type: EFormFieldType;
  validation: EFormFieldValidation;
  validationValue: string;
}

type TFormFields = Array<IFormField>;

export interface IForm {
  id: string;
  csTitle: string;
  enTitle: string;
  fields: TFormFields;
  createdAt: Date;
  updatedAt: Date;
}

export type TForms = Array<IForm>;
