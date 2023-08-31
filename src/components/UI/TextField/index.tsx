import { ControllerRenderProps, FieldValues } from "react-hook-form";
import styles from "./text-field.module.scss";
import { InputHTMLAttributes } from "react";

export interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * React hook form field props
   */
  fieldProps?: ControllerRenderProps<FieldValues, any>;
  password?: boolean;
  email?: boolean;
}

export const TextField = ({
  email,
  password,
  fieldProps,
  ...props
}: ITextField) => {
  return (
    <input
      className={`${styles.textField} ${props?.className || ""}`}
      {...props}
      {...fieldProps}
      type={(password && "password") || (email && "email") || "text"}
    />
  );
};
