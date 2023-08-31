import styles from "./text-field.module.scss";
import { TInputField } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";

interface ITextField extends TInputField {
  password?: boolean;
  email?: boolean;
}

export const TextField = ({
  email,
  password,
  error,
  ...props
}: ITextField) => {
  return (
    <input
      className={`${styles.textField} ${props?.className || ""} ${
        error ? globalStyles.fieldError : ""
      }`}
      {...props}
      type={(password && "password") || (email && "email") || "text"}
    />
  );
};
