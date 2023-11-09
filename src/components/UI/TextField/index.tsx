import styles from "./text-field.module.scss";
import { TInputField } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";
import { RefObject, forwardRef, useImperativeHandle, useRef } from "react";

interface ITextField extends TInputField {
  password?: boolean;
  email?: boolean;
}

const TextField = forwardRef((props: ITextField, ref) => {
  const { email, password, error, ...passedProps } = props;
  const internalRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current?.focus();
    },
  }));

  return (
    <input
      ref={internalRef}
      className={`${styles.textField} ${passedProps?.className || ""} ${
        error ? globalStyles.fieldError : ""
      }`}
      {...passedProps}
      type={(password && "password") || (email && "email") || "text"}
    />
  );
});

TextField.displayName = "TextField";

export default TextField;
