import { ReactNode } from "react";

export enum ETitleSize {
  sm = "sm",
  base = "base",
  lg = "lg",
  xl = "xl",
}

export default function Title({
  size,
  children,
  className,
}: {
  size?: ETitleSize;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`size-${size || ETitleSize.base} ${className || ""}`}>
      {children}
    </span>
  );
}
