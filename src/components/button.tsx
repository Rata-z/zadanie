import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * Button component renders a customizable button with optional click handling and custom styles.
 * It allows for flexible styling, click event handling, and passing additional props.
 *
 * @param {ReactNode} children - The content to be displayed inside the button (e.g., text, icons).
 * @param {Function} [handleClick] - Optional function to handle the button click event.
 * @param {string} buttonStyle - Custom styling for the button, applied in addition to default styles.
 * @param {object} [props] - Additional optional props to be passed to the button element.
 * @returns {JSX.Element} A styled button element with the provided content and functionality.
 */

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
