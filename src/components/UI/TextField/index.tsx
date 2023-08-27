import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import styles from './text-field.module.scss';

export interface ITextField {
  /**
   * React hook form field props
   */
  fieldProps: ControllerRenderProps<FieldValues, any>;
  placeholder?: string;
  password?: boolean;
  email?: boolean;
  className?: string;
}

export const TextField = (props: ITextField) => {
  return (
    <input
      className={`${styles.textField} ${props?.className || ''}`}
      {...props.fieldProps}
      {...(props.placeholder && { placeholder: props.placeholder })}
      type={(props.password && 'password') || (props.email && 'email') || 'text'}
    />
  );
};
