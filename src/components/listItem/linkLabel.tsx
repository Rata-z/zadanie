import { LinkTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

export default function LinkLabel({ linkType }: { linkType: LinkTypes }) {
  const linkTypeStyles = {
    collection: {
      linkLabel: "kolekcja",
      className: "bg-[#F9F5FF] border-[#E9D7FE] text-[#6941C6]",
    },
    URL: {
      linkLabel: "URL",
      className: "bg-[#F9FAFB] border-[#EAECF0] text-[#344054]",
    },
  };
  return (
    <span
      className={cn(
        linkTypeStyles[linkType].className,
        "rounded-md border-[0.0625rem] px-[0.375rem] py-[0.125rem] text-xs",
      )}
    >
      {linkTypeStyles[linkType].linkLabel}
    </span>
  );
}