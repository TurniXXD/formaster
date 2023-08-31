import { ControllerRenderProps, FieldValues } from "react-hook-form";
import styles from "./select-field.module.scss";
import { SelectHTMLAttributes } from "react";
import { FieldSelectOptions } from "@/types";

export interface ISelectField extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * React hook form field props
   */
  fieldProps?: ControllerRenderProps<FieldValues, any>;
  options: FieldSelectOptions;
}

export const SelectField = ({
  fieldProps,
  options,
  ...props
}: ISelectField) => (
  <div className={styles.selectField}>
    <select {...fieldProps} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className={styles.selectFieldArrow}></div>
  </div>
);
