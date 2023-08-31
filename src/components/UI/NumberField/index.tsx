import styles from "./number-field.module.scss";
import { TInputField } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";

export const NumberField = ({
  placeholder,
  fieldProps,
  error,
  ...props
}: TInputField) => {
  return (
    <input
      className={`${styles.numberField} ${props?.className || ""} ${
        error ? globalStyles.fieldError : ""
      }`}
      {...props}
      {...fieldProps}
      min={0}
      type="number"
    />
  );
};
