import { InputProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * MenuInput component renders an input field with an optional styling and additional input actions.
 * It provides flexibility for custom styling, input actions, and optional children elements like icons or validation messages.
 *
 * @param {InputProps} props - The properties for the MenuInput component.
 * @param {string} labelText - The text for the input label.
 * @param {string} inputStyle - Additional custom styling for the input field.
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {React.ReactNode} children - Optional children elements (e.g., icons or error messages).
 * @param {object} inputActions - Additional actions for the input field from `react-hook-form`(e.g., register function).
 * @returns {JSX.Element} A styled input field with optional label and additional elements.
 */

export default function MenuInput({
  labelText,
  inputStyle,
  placeholder,
  children,
  inputActions,
}: InputProps) {
  return (
    <label className="flex flex-col gap-[0.375rem] text-base font-medium text-[#344054]">
      {labelText}
      <div className={`relative flex flex-col gap-[0.375rem]`}>
        <input
          className={cn(
            "w-full rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-white py-2 placeholder-[#667085]",
            inputStyle,
          )}
          placeholder={placeholder}
          {...inputActions}
        />
        {children}
      </div>
    </label>
  );
}
