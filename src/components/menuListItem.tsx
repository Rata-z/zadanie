import { ItemProps } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { FiMove } from "react-icons/fi";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/cn";

export default function MenuListItem(item: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
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
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex items-center gap-1 overflow-hidden border-[#EAECF0] bg-white pr-6 ${(item.isParent || item.activeForm) && "border-b-[0.0625rem]"} ${item.isChildren && "border-l-[0.0625rem]"} ${
        (item.isLastChildren || item.isParent) &&
        item.isChildren &&
        "rounded-bl-md"
      } `}
    >
      <div
        className="flex flex-grow items-center gap-1 py-5 pl-6"
        {...listeners}
      >
        <span className="p-[0.625rem] text-[#475467]">
          <FiMove size="1.25rem" />
        </span>

        <div className="flex flex-grow flex-col gap-[0.375rem]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[#101828]">
              {item.label}
            </h2>
            {item.linkType && (
              <span
                className={cn(
                  linkTypeStyles[item.linkType].className,
                  "rounded-md border-[0.0625rem] px-[0.375rem] py-[0.125rem] text-xs",
                )}
              >
                {linkTypeStyles[item.linkType].linkLabel}
              </span>
            )}
          </div>

          <p className="text-sm text-[#475467]">{item.url}</p>
        </div>
      </div>
      <div className="flex divide-x-[0.0625rem] rounded-lg border-[0.0625rem] border-[#D0D5DD] text-sm font-semibold text-[#344054]">
        <button
          className="px-4 py-2"
          onClick={() => item.handleDelete(item.id)}
          style={{ pointerEvents: "auto" }}
        >
          Usuń
        </button>
        <button className="px-4 py-2" onClick={() => item.handleEdit(item.id)}>
          Edytuj
        </button>
        <button
          className="px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            item.handleAddChild(item.id);
          }}
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
