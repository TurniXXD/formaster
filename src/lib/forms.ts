"use client";

import {
  EFormFieldType,
  EFormFieldValidation,
  FieldSelectOptions,
  Form,
  FormField,
  FormFieldValidationOptions,
} from "@/types";
import { v4 } from "uuid";

export const createNewFormObject = (
  form: Omit<Form, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Form => {
  const now = new Date();
  return {
    id: form.id || v4(),
    createdAt: now,
    updatedAt: now,
    ...form,
  };
};

export const newFormField: FormField = {
  type: EFormFieldType.text,
  enTitle: "",
  csTitle: "",
  validation: EFormFieldValidation.none,
  validationValue: "",
};

export const createFieldTypeOptions = (t: any): FieldSelectOptions => {
  const enumValuesObject = Object.values(EFormFieldType);
  const options: FieldSelectOptions = [];

  enumValuesObject.map((key) => {
    options.push({
      label: t(`form.fieldTypes.${key}`),
      value: key,
    });
  });

  return options;
};

export const createValidationsOptions = (
  t: any
): FormFieldValidationOptions => {
  const enumValuesObject = Object.values(EFormFieldValidation);

  const common: FieldSelectOptions = [];
  const textValue: FieldSelectOptions = [];
  const numberValue: FieldSelectOptions = [];

  // Default without validation
  enumValuesObject.map((key) => {
    if (key === EFormFieldValidation.none) {
      common.push({
        label: " ",
        value: " ",
      });
      return;
    }

    const validationObject = {
      label: t(`validations.${key}`),
      value: key,
    };
    if (key.includes("string_value")) {
      textValue.push(validationObject);
      return;
    }
    if (key.includes("number_value")) {
      numberValue.push(validationObject);
      return;
    }

    common.push(validationObject);
  });

  return {
    common,
    textValue,
    numberValue,
  };
};