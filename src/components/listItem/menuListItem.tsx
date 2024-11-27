"use client";
import { ItemProps, ListContextType } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import React, { useContext } from "react";
import { FiMove } from "react-icons/fi";
import { CSS } from "@dnd-kit/utilities";
import LinkLabel from "./linkLabel";
import { cn } from "@/lib/utils";
import { ListContext } from "@/contexts/listContext";

/**
 * This component represents an individual menu item in a sortable list.
 * It includes drag-and-drop functionality and actions like edit, delete, and add child items.
 *
 * @param {ItemProps} item - The properties for the individual menu item.
 * @returns {JSX.Element} A styled `div` with the menu item details and actions.
 */

export default function MenuListItem(item: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { handleFormToggle, handleDeleteItem } = useContext(
    ListContext,
  ) as ListContextType;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex touch-none items-center gap-1 overflow-hidden border-[#EAECF0] bg-white pr-6",
        (item.isParent || item.activeForm) && "border-b-[0.0625rem]",
        item.isChildren && "border-l-[0.0625rem]",
        (item.isLastChildren || item.isParent) && "rounded-bl-md",
      )}
      {...attributes}
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
            {item.linkType && <LinkLabel linkType={item.linkType} />}
          </div>
          <p className="text-sm text-[#475467]">{item.url}</p>
        </div>
      </div>

      <div className="flex divide-x-[0.0625rem] rounded-lg border-[0.0625rem] border-[#D0D5DD] text-sm font-semibold text-[#344054]">
        <button className="px-4 py-2" onClick={() => handleDeleteItem(item.id)}>
          Usuń
        </button>
        <button
          className="px-4 py-2"
          onClick={() => handleFormToggle(item.id, "Edit")}
        >
          Edytuj
        </button>
        <button
          className="px-4 py-2"
          onClick={() => handleFormToggle(item.id, "Add")}
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
