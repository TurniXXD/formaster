import styles from "./radio-field.module.scss";
import { TInputField, TFieldSelectOptions } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";

interface IRadioInputProps extends TInputField {
  options: TFieldSelectOptions;
}

export const RadioField = ({
  options,
  error,
  required,
  ...props
}: IRadioInputProps) => (
  <div
    className={`${styles.radioFieldWrapper} ${error ? globalStyles.fieldError : ""}`}
  >
    {options.map((option, i) => (
      <label key={i} className={styles.radioField}>
        <input
          type="radio"
          value={`${option.value}`}
          defaultChecked={required && i === 0}
          {...props}
        />
        <span className={styles.radioFieldOptionButton}></span>
        {option.label}
      </label>
    ))}
  </div>
);
