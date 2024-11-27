"use client";
import { ListContextType, MenuObject } from "@/lib/types";
import React, { useContext, useState } from "react";
import MenuListItem from "./menuListItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import AddMenuForm from "./addMenuForm";
import { ListContext } from "@/context/listContext";

export default function MenuListRenderer() {
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [activeParentId, setActiveParentId] = useState<number | null>(null);
  const {
    list,
    handleEditItem,
    handleAddItem,
    handleDeleteItem,
    reorderAtSameLevel,
  } = useContext(ListContext) as ListContextType;

  const handleEditClick = (id: number) => {
    setActiveParentId(null);
    setEditedItemId(id);
  };

  const handleAddItemClick = (itemId: number) => {
    setEditedItemId(null);
    setActiveParentId(itemId);
  };

  const handleCancel = () => {
    setActiveParentId(null);
    setEditedItemId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    reorderAtSameLevel(list, active.id as number, over.id as number);
  };

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
                linkType={
                  item.url
                    ? item.url.includes("https://www.")
                      ? "URL"
                      : "collection"
                    : undefined
                }
                isParent={item.children.length > 0}
                isChildren={level > 0}
                isLastChildren={level > 0 && menus.length === index + 1}
                handleDelete={handleDeleteItem}
                handleAddChild={handleAddItemClick}
                handleEdit={handleEditClick}
                activeForm={activeParentId === item.id}
              />
            )}

            {(activeParentId === item.id || editedItemId === item.id) && (
              <>
                <div
                  className={`py-4 ${activeParentId && level > 0 && "pl-16"} ${((editedItemId && level < 1) || (activeParentId && level < 1)) && "pl-6"} pr-6`}
                >
                  <AddMenuForm
                    onSubmit={(data) => {
                      if (editedItemId === item.id) {
                        handleEditItem(item.id, data);
                        setEditedItemId(null);
                      } else if (activeParentId === item.id) {
                        handleAddItem(data, activeParentId);
                        setActiveParentId(null);
                      }
                    }}
                    handleCancel={handleCancel}
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
