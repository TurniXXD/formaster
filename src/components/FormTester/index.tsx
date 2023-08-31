"use client";

import { useLocale, useTranslations } from "next-intl";
import styles from "./form-tester.module.scss";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import {
  EFormFieldType,
  EFormFieldValidation,
  ELangs,
  TFieldSelectOptions,
  TForms,
} from "@/types";
import { ChangeEventHandler, useEffect, useState } from "react";
import Title, { ETitleSize } from "../UI/Title";
import { RadioField } from "../UI/RadioField";
import { createBooleanOptions, validateValue } from "@/lib/forms";
import { NumberField } from "../UI/NumberField";
import { Button } from "../UI/Button";
import { CheckCircle } from "react-feather";
import Popup, { EPopupType } from "../UI/Popup";
import { TextArea } from "../UI/TextArea";
import { NotFound } from "../NotFound";
import Loader from "../UI/Loader";

export default function FormTester({ id }: { id: string }) {
  const t = useTranslations("common");
  const tFormTester = useTranslations("formTester");
  const locale = useLocale();
  const booleanOptions = createBooleanOptions(t);
  const { value: forms } = useLocalStorage<TForms>(ELocalStorageItems.forms);
  const [fieldsWithValidationError, setFieldsWithValidationError] = useState<
    Array<number>
  >([]);
  const form = forms?.find((form) => form.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<Array<number | string>>(
    Array.from({ length: form?.fields.length || 0 }, (_, index) => index)
  );
  const [showPopup, setShowPopup] = useState<EPopupType | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, [form]);

  if (!isLoading && !form) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleFormFieldValueChange = (
    formFieldIndex: number,
    value: string
  ) => {
    setFields(() =>
      fields.map((field, i) => (i === formFieldIndex ? value : field))
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setFieldsWithValidationError([]);
    let hasErrors = false;

    form?.fields.map((field, i) => {
      if (!validateValue(fields[i], field.validation, field.validationValue)) {
        hasErrors = true;
        setFieldsWithValidationError((currentValue) => {
          const withAddedInvalidValueFieldIndex = [...currentValue];
          withAddedInvalidValueFieldIndex.push(i);
          return withAddedInvalidValueFieldIndex;
        });
      }
    });

    hasErrors
      ? setShowPopup(EPopupType.Error)
      : setShowPopup(EPopupType.Success);
  };

  return (
    <div className={styles.formTester}>
      <Title size={ETitleSize.xl}>
        {locale === ELangs.cs ? form?.csTitle : form?.enTitle}
      </Title>
      <form className={styles.form} onSubmit={onSubmit}>
        {form?.fields.map((field, i) => {
          const isFieldError = fieldsWithValidationError.includes(i);
          const isRequiredField =
            field.validation === EFormFieldValidation.required;
          return (
            <div className={styles.formField} key={i}>
              <label>
                {locale === ELangs.cs ? field.csTitle : field.enTitle}
              </label>
              <SelectFieldType
                type={field.type}
                formFieldIndex={i}
                booleanOptions={booleanOptions}
                onChange={(e) => handleFormFieldValueChange(i, e.target.value)}
                textAreaOnChange={(e) =>
                  handleFormFieldValueChange(i, e.target.value)
                }
                isFieldError={isFieldError}
                isRequired={isRequiredField}
              />
              {isFieldError && (
                <Title size={ETitleSize.sm} error>{`${t(
                  `validations.${field.validation}`
                )}: ${!isRequiredField ? field.validationValue : ""}`}</Title>
              )}
            </div>
          );
        })}
        {showPopup && (
          <Popup
            type={showPopup}
            text={
              showPopup === EPopupType.Error
                ? tFormTester("invalid")
                : tFormTester("valid")
            }
            setTrigger={setShowPopup}
          />
        )}
        <Button
          label={tFormTester("validate")}
          icon={<CheckCircle />}
          submit
          fullWidth
        />
      </form>
    </div>
  );
}

const SelectFieldType = ({
  type,
  onChange,
  textAreaOnChange,
  booleanOptions,
  formFieldIndex,
  isFieldError,
  isRequired,
}: {
  type: EFormFieldType;
  onChange: ChangeEventHandler<HTMLInputElement>;
  textAreaOnChange: ChangeEventHandler<HTMLTextAreaElement>;
  booleanOptions: TFieldSelectOptions;
  formFieldIndex: number;
  isFieldError: boolean;
  isRequired: boolean;
}) => {
  return (
    <>
      {type === EFormFieldType.boolean && (
        <RadioField
          options={booleanOptions}
          name={formFieldIndex.toString()}
          onChange={onChange}
          error={isFieldError}
          required={isRequired}
        />
      )}
      {type === EFormFieldType.number && (
        <NumberField
          name={formFieldIndex.toString()}
          onChange={onChange}
          error={isFieldError}
          required={isRequired}
        />
      )}
      {type === EFormFieldType.text && (
        <TextArea
          name={formFieldIndex.toString()}
          onChange={textAreaOnChange}
          error={isFieldError}
          required={isRequired}
        />
      )}
    </>
  );
};
