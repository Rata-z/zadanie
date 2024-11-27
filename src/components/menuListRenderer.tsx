"use client";
import { ListContextType, MenuObject } from "@/lib/types";
import React, { useContext } from "react";
import MenuListItem from "./listItem/menuListItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";
import AddMenuForm from "./menuForm.tsx/addMenuForm";
import { ListContext } from "@/contexts/listContext";
import { assertLinkType } from "@/lib/utils";

/**
 * MenuListRenderer component renders a sortable list of menu items, allowing for nested menu structures.
 * It supports drag-and-drop functionality for reordering the list items and renders forms for editing menu items.
 * The component conditionally renders each menu item, its children, and associated forms based on the current state.
 *
 * @returns {JSX.Element} A JSX element rendering the sortable menu list with drag-and-drop support.
 */

export default function MenuListRenderer() {
  const {
    list,
    handleFormSubmit,
    handleFormToggle,
    editedItemId,
    activeParentId,
    handleDeleteItem,
    handleDragEnd,
  } = useContext(ListContext) as ListContextType;

  const renderMenuList = (menus: MenuObject[], level = 0) => (
    <ul
      className={`divide-y-[0.0625rem] border-[#EAECF0] ${level > 0 && "pl-16"} `}
    >
      <SortableContext
        items={menus.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {menus.map((item, index) => (
          <li key={item.id}>
            {editedItemId !== item.id && (
              <MenuListItem
                id={item.id}
                label={item.label}
                url={item.url}
                linkType={assertLinkType(item.url)}
                isParent={item.children.length > 0}
                isChildren={level > 0}
                isLastChildren={level > 0 && menus.length === index + 1}
                activeForm={activeParentId === item.id}
              />
            )}

            {(activeParentId === item.id || editedItemId === item.id) && (
              <>
                <div
                  className={`py-4 ${activeParentId && "pl-16"} ${editedItemId && level < 1 && "pl-6"} pr-6`}
                >
                  <AddMenuForm
                    onSubmit={(data) => handleFormSubmit(data, item.id)}
                    handleCancel={handleFormToggle}
                    editedData={
                      editedItemId === item.id
                        ? { label: item.label, url: item.url }
                        : undefined
                    }
                  />
                </div>
                {item.children.length > 0 && (
                  <div className="ml-16 h-[0.0625rem] bg-[#EAECF0]" />
                )}
              </>
            )}

            {item.children.length > 0 &&
              renderMenuList(item.children, level + 1)}
          </li>
        ))}
      </SortableContext>
    </ul>
  );

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {renderMenuList(list)}
    </DndContext>
  );
}
