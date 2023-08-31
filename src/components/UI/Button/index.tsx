import { ReactNode } from "react";
import styles from "./button.module.scss";

export interface IButtonProps {
  secondary?: boolean;
  label?: string;
  icon?: JSX.Element;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Button = (props: IButtonProps) => {
  return (
    <button
      className={`${styles.button} ${
        props.secondary ? styles.secondary : styles.primary
      } ${props.fullWidth ? styles.fullWidth : ""} ${props.className || ""}`}
      type={props.submit ? "submit" : "button"}
      onClick={props.onClick !== null ? props.onClick : undefined}
    >
      {props.label ? (
        <>
          <span className={styles.label}>{props.label}</span>
          {props.icon}
        </>
      ) : (
        props.children
      )}
    </button>
  );
};
