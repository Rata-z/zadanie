import { InputProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

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
