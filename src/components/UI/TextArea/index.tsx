import styles from "./text-area.module.scss";
import { TTextAreaField } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";

export const TextArea = ({ fieldProps, error, ...props }: TTextAreaField) => {
  return (
    <textarea
      className={`${styles.textArea} ${props?.className || ""} ${
        error ? globalStyles.fieldError : ""
      }`}
      {...props}
      {...fieldProps}
    />
  );
};
