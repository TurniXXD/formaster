import { ELangs, FormField } from "@/types";
import { Dispatch, SetStateAction } from "react";

export type THandleFieldValueTranslation = ({ formFieldIndex, isFormTitle, }: {
  formFieldIndex?: number | undefined;
  isFormTitle?: boolean | undefined;
}) => Promise<void>

export type THandleFormTitleChange = ({
  locale,
  value,
}: {
  locale: ELangs;
  value: string;
}) => void

export type THandleFormFieldPartChange = ({ formFieldIndex, fieldPart, value, }: {
  formFieldIndex: number;
  fieldPart: EFormFieldParts;
  value: string;
}) => void 

export enum EFieldPositionMovement {
  forwards = "forwards",
  backwards = "backwards",
}

export enum EFormFieldParts {
  enTitle = "enTitle",
  csTitle = "csTitle",
  type = "type",
  validation = "validation",
  validationValue = "validationValue",
}
