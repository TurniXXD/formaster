import styles from "./select-field.module.scss";
import globalStyles from "./../../../styles/vars.module.scss";
import { TSelectField } from "@/types";

export const SelectField = ({
  fieldProps,
  options,
  error,
  ...props
}: TSelectField) => (
  <div className={`${styles.selectField} ${error ? globalStyles.fieldError : ""}`}>
    <select {...fieldProps} {...props}>
      {options.map((option, i) => (
        <option key={i} value={`${option.value}`}>
          {option.label}
        </option>
      ))}
    </select>
    <div className={styles.selectFieldArrow}></div>
  </div>
);
