"use client";

import {
  EFormFieldType,
  EFormFieldValidation,
  TFieldSelectOptions,
  IForm,
  IFormField,
  IFormFieldValidationOptions,
} from "@/types";
import { v4 } from "uuid";
import { convertToNumberIfPossible } from ".";

export const createNewFormObject = (
  form: Omit<IForm, "id" | "createdAt" | "updatedAt"> & { id?: string }
): IForm => {
  const now = new Date();
  return {
    id: form.id || v4(),
    createdAt: now,
    updatedAt: now,
    ...form,
  };
};

export const newFormField: IFormField = {
  type: EFormFieldType.text,
  enTitle: "",
  csTitle: "",
  validation: EFormFieldValidation.none,
  validationValue: "",
};

export const createFieldTypeOptions = (t: any): TFieldSelectOptions => {
  const enumValuesObject = Object.values(EFormFieldType);
  const options: TFieldSelectOptions = [];

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
): IFormFieldValidationOptions => {
  const enumValuesObject = Object.values(EFormFieldValidation);

  const common: TFieldSelectOptions = [];
  const textValue: TFieldSelectOptions = [];
  const numberValue: TFieldSelectOptions = [];

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

export const createBooleanOptions = (t: any) => {
  return [
    {
      label: t("boolean.yes"),
      value: true,
    },
    {
      label: t("boolean.no"),
      value: false,
    },
  ];
};

export const validateValue = (
  value: string | number,
  validation: EFormFieldValidation,
  validationValue?: string
) => {
  if (validation === EFormFieldValidation.required) {
    return !!value;
  }

  if (validationValue) {
    const valueParsed = convertToNumberIfPossible(value);
    const isString = typeof valueParsed === "string";

    if (validation === EFormFieldValidation.startsWith) {
      return (
        isString && validationValue && valueParsed.startsWith(validationValue)
      );
    }

    if (validation === EFormFieldValidation.matches) {
      return (
        isString && validationValue && valueParsed.includes(validationValue)
      );
    }

    const numericValidationValue = parseInt(validationValue);

    if (validation === EFormFieldValidation.equalTo) {
      return (
        !isString && validationValue && valueParsed === numericValidationValue
      );
    }

    if (validation === EFormFieldValidation.greaterThan) {
      return (
        !isString && validationValue && valueParsed > numericValidationValue
      );
    }

    if (validation === EFormFieldValidation.equalOrGreaterThan) {
      return (
        !isString && validationValue && valueParsed >= numericValidationValue
      );
    }

    if (validation === EFormFieldValidation.lessThan) {
      return (
        !isString && validationValue && valueParsed < numericValidationValue
      );
    }

    if (validation === EFormFieldValidation.equalOrLessThan) {
      return (
        !isString && validationValue && valueParsed <= numericValidationValue
      );
    }
  }

  return true;
};
