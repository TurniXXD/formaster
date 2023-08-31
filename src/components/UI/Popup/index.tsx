"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./popup.module.scss";

export enum EPopupType {
  Success = "success",
  Error = "error",
}

interface IPopupProps {
  children?: ReactNode;
  className?: string;
  text?: string;
  type: EPopupType;
  setTrigger?: Dispatch<SetStateAction<EPopupType | null>>;
}

/**
 * Popup with absolute position that disappears after `3` seconds
 */
export default function Popup({
  children,
  className,
  text,
  type,
  setTrigger,
}: IPopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTrigger && setTrigger(null);
    }, 3000);

    // Clear the timeout and hide the popup if it's unmounted before the timeout is reached
    return () => {
      clearTimeout(timeout);
      setVisible(false);
      setTrigger && setTrigger(null);
    };
  }, [setTrigger]);

  return (
    <>
      {visible && (
        <div
          className={`${styles.popup} ${styles[type]} ${
            className && className
          }`}
        >
          {text || children}
        </div>
      )}
    </>
  );
}
