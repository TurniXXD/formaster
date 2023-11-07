"use client";

import { useLocale, useTranslations } from "next-intl";
import styles from "./form-builder.module.scss";
import { useSearchParams } from "next/navigation";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import {
  EFormFieldType,
  ELangs,
  IFormField,
  IFormFieldValidationOptions,
  TForms,
  EFormFieldValidation,
} from "@/types";
import { TextField } from "../UI/TextField";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  createFieldTypeOptions,
  createNewFormObject,
  createValidationsOptions,
  newFormField,
} from "@/lib/forms";
import { CzechFlag, EnglishFlag } from "../UI/Icons";
import { Button } from "../UI/Button";
import Title, { ETitleSize } from "../UI/Title";
import { deeplTranslate } from "@/lib/deepl";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { SelectField } from "../UI/SelectField";
import { NumberField } from "../UI/NumberField";
import {
  EFieldPositionMovement,
  EFormFieldParts,
  THandleFieldValueTranslation,
  THandleFormFieldPartChange,
  THandleFormTitleChange,
} from "./types";
import Loader from "../UI/Loader";
import Popup, { EPopupType } from "../UI/Popup";

export default function FormBuilder() {
  const t = useTranslations("common");
  const locale = useLocale() as ELangs;
  const isCsLocale = locale === ELangs.cs;
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { value: forms, setValue } = useLocalStorage<TForms>(
    ELocalStorageItems.forms
  );
  const editFormId = searchParams.get("editFormId");
  const editableForm = forms?.find((form) => form.id === editFormId);
  const [fields, setFields] = useState<Array<IFormField>>(
    editableForm ? editableForm.fields : [newFormField]
  );
  const [csFormTitle, setCsFormTitle] = useState(
    editableForm ? editableForm.csTitle : ""
  );
  const [enFormTitle, setEnFormTitle] = useState(
    editableForm ? editableForm.enTitle : ""
  );
  const [showFormSavedPopup, setShowFormSavedPopup] =
    useState<EPopupType | null>(null);
  const deeplTranslationTargetLang = isCsLocale ? ELangs.en : ELangs.cs;
  const fieldTypeOptions = createFieldTypeOptions(t);
  const formFieldValidationsOptions = createValidationsOptions(t);

  useEffect(() => {
    setIsLoading(false);
  }, [fields]);

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (forms) {
      if (editableForm) {
        const formsWithoutEditedForm = forms.filter(
          (form) => form.id !== editFormId
        );

        const withEditedForm = [
          ...formsWithoutEditedForm,
          createNewFormObject({
            id: editableForm.id,
            fields,
            csTitle: csFormTitle,
            enTitle: enFormTitle,
            createdAt: editableForm.createdAt,
          }),
        ];

        setValue(withEditedForm);
        setFields([newFormField]);
        setCsFormTitle("");
        setEnFormTitle("");
        setShowFormSavedPopup(EPopupType.Success);
        return;
      }

      const withNewForm = [
        ...forms,
        createNewFormObject({
          fields,
          csTitle: csFormTitle,
          enTitle: enFormTitle,
        }),
      ];

      setValue(withNewForm);
      setFields([newFormField]);
      setCsFormTitle("");
      setEnFormTitle("");
      setShowFormSavedPopup(EPopupType.Success);
    }
  };

  const handleAddNewField = () => {
    setFields((value) => {
      const withNewField = [...value, newFormField];
      return withNewField;
    });
  };

  const handleFormFieldPartChange = ({
    formFieldIndex,
    fieldPart,
    value,
  }: {
    formFieldIndex: number;
    fieldPart: EFormFieldParts;
    value: string;
  }) => {
    setFields(() =>
      fields.map((field, i) =>
        i === formFieldIndex ? { ...field, [fieldPart]: value } : field
      )
    );
  };

  const handleFormTitleChange = ({
    locale,
    value,
  }: {
    locale: ELangs;
    value: string;
  }) => {
    if (locale === ELangs.cs) {
      setCsFormTitle(value);
    }
    if (locale === ELangs.en) {
      setEnFormTitle(value);
    }
  };

  const handleRemoveField = (fieldPosition: number) => {
    setFields((value) => {
      const withoutRemovedField = [...value];
      withoutRemovedField.splice(fieldPosition, 1);
      return withoutRemovedField;
    });
  };

  const handleFieldValueTranslation = async ({
    formFieldIndex,
    isFormTitle,
  }: {
    formFieldIndex?: number;
    isFormTitle?: boolean;
  }) => {
    if (formFieldIndex !== undefined) {
      const sourceValue = isCsLocale
        ? fields[formFieldIndex].csTitle
        : fields[formFieldIndex].enTitle;

      const translatedValue = await deeplTranslate(
        locale,
        deeplTranslationTargetLang,
        sourceValue
      );

      setFields(() =>
        fields.map((field, i) =>
          i === formFieldIndex
            ? {
                ...field,
                ...(isCsLocale
                  ? { enTitle: translatedValue }
                  : { csTitle: translatedValue }),
              }
            : field
        )
      );
      return;
    }

    if (isFormTitle) {
      const sourceValue = isCsLocale ? csFormTitle : enFormTitle;
      const translatedValue = await deeplTranslate(
        locale,
        deeplTranslationTargetLang,
        sourceValue
      );

      isCsLocale
        ? setEnFormTitle(translatedValue)
        : setCsFormTitle(translatedValue);
      return;
    }
  };

  const handleSetFieldType = (fieldPosition: number, newValue: string) => {
    setFields((value) => {
      const withNewFieldTypeValue = [...value];
      withNewFieldTypeValue[fieldPosition].type = newValue as EFormFieldType;
      return withNewFieldTypeValue;
    });
  };

  const handleCancel = () => {
    setFields([newFormField]);
  };

  const handleFieldPositionAdjustment = (
    currentFieldPosition: number,
    movement: EFieldPositionMovement
  ) => {
    const targetFieldPosition =
      movement === EFieldPositionMovement.forwards
        ? currentFieldPosition + 1
        : currentFieldPosition - 1;
    const currentFieldObject = fields[currentFieldPosition];
    const targetFieldObject = fields[targetFieldPosition];

    setFields(() =>
      fields.map((field, i) => {
        if (i === targetFieldPosition) {
          return currentFieldObject;
        }
        if (i === currentFieldPosition) {
          return targetFieldObject;
        }
        return field;
      })
    );
  };

  return (
    <div className={styles.formBuilder}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formField}>
          <Title className={styles.formNameTitle} size={ETitleSize.lg}>
            {t("form.title")}
          </Title>
          <FormFieldTranslations
            t={t}
            isCsLocale={isCsLocale}
            csTitleValue={csFormTitle}
            enTitleValue={enFormTitle}
            handleFormTitleChange={handleFormTitleChange}
            handleFieldValueTranslation={handleFieldValueTranslation}
            handleFormFieldPartChange={handleFormFieldPartChange}
          />
        </div>
        {fields?.map((field, i) => {
          return (
            <div className={styles.formField} key={i}>
              {i !== 0 && (
                <div
                  className={styles.formFieldPositionAdjustmentButtonWrapper}
                >
                  <div
                    className={styles.formFieldPositionAdjustmentButton}
                    onClick={() =>
                      handleFieldPositionAdjustment(
                        i,
                        EFieldPositionMovement.backwards
                      )
                    }
                  >
                    <ArrowUpCircle />
                  </div>
                </div>
              )}
              <div>
                <label>{t("form.name")}</label>
                <FormFieldTranslations
                  t={t}
                  isCsLocale={isCsLocale}
                  csTitleValue={field.csTitle}
                  enTitleValue={field.enTitle}
                  formFieldIndex={i}
                  handleFieldValueTranslation={handleFieldValueTranslation}
                  handleFormFieldPartChange={handleFormFieldPartChange}
                />
              </div>
              <div className={styles.formFieldType}>
                <label>{t("form.type")}</label>
                <SelectField
                  name={`${i}-type`}
                  options={fieldTypeOptions}
                  onChange={(e) => handleSetFieldType(i, e.target.value)}
                />
              </div>
              <FormFieldValidations
                t={t}
                options={formFieldValidationsOptions}
                formField={field}
                formFieldIndex={i}
                handleFormFieldPartChange={handleFormFieldPartChange}
              />
              {i !== fields.length - 1 && (
                <div
                  className={styles.formFieldPositionAdjustmentButtonWrapper}
                >
                  <div className={styles.formFieldPositionAdjustmentButton}>
                    <ArrowDownCircle
                      onClick={() =>
                        handleFieldPositionAdjustment(
                          i,
                          EFieldPositionMovement.forwards
                        )
                      }
                    />
                  </div>
                </div>
              )}
              {i !== 0 && (
                <div
                  className={styles.formFieldRemoveButton}
                  onClick={() => handleRemoveField(i)}
                >
                  <XCircle />
                </div>
              )}
            </div>
          );
        })}
        <Button
          label={t("form.addNewField")}
          icon={<PlusCircle />}
          onClick={handleAddNewField}
          fullWidth
        />
        <div className={styles.formActionButtonsWrapper}>
          <Button
            label={t("cancel")}
            onClick={handleCancel}
            secondary
            fullWidth
          />
          <Button label={t("save")} submit fullWidth />
        </div>
      </form>
      {showFormSavedPopup && (
        <Popup
          type={EPopupType.Success}
          text={t("form.successfullySaved")}
          setTrigger={setShowFormSavedPopup}
        />
      )}
    </div>
  );
}

const FormFieldValidations = ({
  t,
  formField,
  formFieldIndex,
  options,
  handleFormFieldPartChange,
}: {
  t: any;
  formField: IFormField;
  formFieldIndex: number;
  options: IFormFieldValidationOptions;
  handleFormFieldPartChange: THandleFormFieldPartChange;
}) => {
  const fieldTypeSpecificOptions =
    formField.type === EFormFieldType.text
      ? options.textValue
      : formField.type === EFormFieldType.number
      ? options.numberValue
      : [];
  const optionsParsed = [...options.common, ...fieldTypeSpecificOptions];

  const showValidationValueField =
    formField?.validation &&
    formField.validation !== EFormFieldValidation.required &&
    formField.validation !== EFormFieldValidation.none;

  return (
    <div className={styles.formFieldValidationsWrapper} key={formFieldIndex}>
      <label>{t("validationsLabel")}</label>
      <div className={styles.formFieldValidations}>
        <SelectField
          name={`${formFieldIndex}-validation`}
          options={optionsParsed}
          value={formField.validation}
          onChange={(e) =>
            handleFormFieldPartChange({
              formFieldIndex,
              fieldPart: EFormFieldParts.validation,
              value: e.target.value,
            })
          }
        />
        {showValidationValueField && formField.type === EFormFieldType.text && (
          <TextField
            defaultValue={formField.validationValue}
            name={`${formFieldIndex}-validation-value`}
            required
            onBlur={(e) =>
              handleFormFieldPartChange({
                formFieldIndex,
                fieldPart: EFormFieldParts.validationValue,
                value: e.target.value,
              })
            }
          />
        )}
        {showValidationValueField &&
          formField.type === EFormFieldType.number && (
            <NumberField
              defaultValue={formField.validationValue}
              name={`${formFieldIndex}-validation-value`}
              required
              onBlur={(e) =>
                handleFormFieldPartChange({
                  formFieldIndex,
                  fieldPart: EFormFieldParts.validationValue,
                  value: e.target.value,
                })
              }
            />
          )}
      </div>
    </div>
  );
};

const FormFieldTranslations = ({
  t,
  isCsLocale,
  formFieldIndex,
  csTitleValue,
  enTitleValue,
  handleFormTitleChange,
  handleFieldValueTranslation,
  handleFormFieldPartChange,
}: {
  t: any;
  isCsLocale: boolean;
  formFieldIndex?: number;
  csTitleValue: string;
  enTitleValue: string;
  handleFieldValueTranslation: THandleFieldValueTranslation;
  handleFormTitleChange?: THandleFormTitleChange;
  handleFormFieldPartChange: THandleFormFieldPartChange;
}) => {
  const isFormTitle = !!handleFormTitleChange;
  return (
    <div className={styles.formFieldNames}>
      <div className={styles.formFieldNamesLanguagesCol}>
        {isCsLocale ? (
          <>
            <CzechFlag />
            <EnglishFlag />
          </>
        ) : (
          <>
            <EnglishFlag />
            <CzechFlag />
          </>
        )}
      </div>
      <div className={styles.formFieldNamesFieldsCol}>
        <div className={styles.formFieldName}>
          <TextField
            value={isCsLocale ? csTitleValue : enTitleValue}
            name={`${formFieldIndex}-source-title`}
            required
            onChange={(e) =>
              isFormTitle
                ? handleFormTitleChange({
                    locale: isCsLocale ? ELangs.cs : ELangs.en,
                    value: e.target.value,
                  })
                : formFieldIndex !== undefined &&
                  handleFormFieldPartChange({
                    formFieldIndex,
                    fieldPart: isCsLocale
                      ? EFormFieldParts.csTitle
                      : EFormFieldParts.enTitle,
                    value: e.target.value,
                  })
            }
          />
        </div>
        <div className={styles.formFieldName}>
          <TextField
            value={isCsLocale ? enTitleValue : csTitleValue}
            name={`${formFieldIndex}-translated-title`}
            required
            onChange={(e) =>
              isFormTitle
                ? handleFormTitleChange({
                    locale: isCsLocale ? ELangs.en : ELangs.cs,
                    value: e.target.value,
                  })
                : formFieldIndex !== undefined &&
                  handleFormFieldPartChange({
                    formFieldIndex,
                    fieldPart: isCsLocale
                      ? EFormFieldParts.enTitle
                      : EFormFieldParts.csTitle,
                    value: e.target.value,
                  })
            }
          />
          <Button
            label={t("translate")}
            secondary
            onClick={async () =>
              await handleFieldValueTranslation({
                formFieldIndex,
                isFormTitle: !formFieldIndex,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
