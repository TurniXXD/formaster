import { ReactNode } from "react";
import styles from "./card.module.scss";

interface ICardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: ICardProps) => {
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
};
