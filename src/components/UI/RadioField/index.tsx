import styles from "./radio-field.module.scss";
import { TInputField, TFieldSelectOptions } from "@/types";
import globalStyles from "./../../../styles/vars.module.scss";

interface IRadioInputProps extends TInputField {
  options: TFieldSelectOptions;
}

export const RadioField = ({
  fieldProps,
  options,
  error,
  required,
  ...props
}: IRadioInputProps) => (
  <div
    className={`${styles.radioField} ${error ? globalStyles.fieldError : ""}`}
  >
    {options.map((option, i) => (
      <div key={i}>
        <input
          type="radio"
          value={`${option.value}`}
          defaultChecked={required && i === 0}
          {...props}
        />
        <span>{option.label}</span>
      </div>
    ))}
  </div>
);
