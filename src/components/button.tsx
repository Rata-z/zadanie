import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Button({
  buttonStyle,
  children,
  handleClick,
  ...props
}: {
  children: ReactNode;
  handleClick?: () => void;
  buttonStyle: string;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg py-[0.625rem] text-sm font-semibold",
        buttonStyle,
      )}
      onClick={() => handleClick && handleClick()}
    >
      {children}
    </button>
  );
}
