import { ReactNode } from 'react';
import styles from './card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${styles.card} ${className && className}`}>{children}</div>;
};
