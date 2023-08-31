import { ControllerRenderProps, FieldValues } from "react-hook-form";
import styles from "./number-field.module.scss";
import { InputHTMLAttributes } from "react";

export interface INumberField extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * React hook form field props
   */
  fieldProps?: ControllerRenderProps<FieldValues, any>;
}

export const NumberField = ({
  placeholder,
  fieldProps,
  ...props
}: INumberField) => {
  return (
    <input
      className={`${styles.numberField} ${props?.className || ""}`}
      {...props}
      {...fieldProps}
      min={0}
      type="number"
    />
  );
};
