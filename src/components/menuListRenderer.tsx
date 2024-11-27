"use client";
import { FormMenuObject, MenuObject } from "@/lib/types";
import React, { useState } from "react";
import MenuListItem from "./menuListItem";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import AddMenuForm from "./addMenuForm";

type ListProps = {
  list: MenuObject[];
};

export default function MenuListRenderer({ list }: ListProps) {
  const [theLIST, setList] = useState<MenuObject[]>(list);
  const [editedItemId, setEditedItemId] = useState<number | null>(null);

  const handleEditItem = (id: number, updatedData: FormMenuObject) => {
    setList((prevList) => {
      const updateItem = (items: MenuObject[]): MenuObject[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, ...updatedData };
          } else if (item.children.length > 0) {
            return { ...item, children: updateItem(item.children) };
          }
          return item;
        });
      };
      return updateItem(prevList);
    });
    setEditedItemId(null);
  };

  const handleEditClick = (id: number) => {
    setActiveParentId(null);
    setEditedItemId(id);
  };

  const reorderItems = (
    items: MenuObject[],
    activeId: number,
    overId: number,
  ): MenuObject[] => {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    const targetIndex = items.findIndex((item) => item.id === overId);

    if (currentIndex === -1 || targetIndex === -1) return items;
    return arrayMove(items, currentIndex, targetIndex);
  };

  const deleteItem = (id: number) => {
    setList((prevList) => {
      const removeItem = (
        items: MenuObject[],
        idToDelete: number,
      ): MenuObject[] => {
        return items
          .filter((item) => item.id !== idToDelete)
          .map((item) =>
            item.children.length > 0
              ? { ...item, children: removeItem(item.children, idToDelete) }
              : item,
          );
      };
      return removeItem(prevList, id);
    });
  };
  const [activeParentId, setActiveParentId] = useState<number | null>(null);

  const handleAddItem = (object: FormMenuObject) => {
    if (activeParentId !== null) {
      const newItem = {
        id: Date.now(),
        label: object.label,
        link: object.link,
        children: [],
      };

      setList((prevList) => {
        const addItem = (
          items: MenuObject[],
          parentId: number,
        ): MenuObject[] => {
          return items.map((item) => {
            if (item.id === parentId) {
              return { ...item, children: [...(item.children || []), newItem] };
            } else if (item.children) {
              return { ...item, children: addItem(item.children, parentId) };
            }
            return item;
          });
        };
        return addItem(prevList, activeParentId);
      });
    }

    setActiveParentId(null);
  };
  const handleAddItemClick = (itemId: number) => {
    setEditedItemId(null);
    setActiveParentId(itemId);
  };

  const handleCancel = () => {
    setActiveParentId(null);
    setEditedItemId(null);
  };

  const reorderAtSameLevel = (
    menus: MenuObject[],
    activeId: number,
    overId: number,
  ): MenuObject[] => {
    const isSameLevel = menus.some(
      (item) => item.id === activeId || item.id === overId,
    );

    if (isSameLevel) {
      return reorderItems(menus, activeId, overId);
    }

    return menus.map((item) =>
      item.children.length > 0
        ? {
            ...item,
            children: reorderAtSameLevel(item.children, activeId, overId),
          }
        : item,
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setList((currentList) =>
      reorderAtSameLevel(currentList, active.id as number, over.id as number),
    );
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
                link={item.link}
                linkType={
                  item.link
                    ? item.link.includes("https://www.")
                      ? "URL"
                      : "collection"
                    : undefined
                }
                isParent={item.children.length > 0}
                isChildren={level > 0}
                isLastChildren={level > 0 && menus.length === index + 1}
                handleDelete={deleteItem}
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
                    onSubmit={(data) =>
                      editedItemId === item.id
                        ? handleEditItem(item.id, data)
                        : handleAddItem(data)
                    }
                    handleCancel={handleCancel}
                    editedData={
                      editedItemId === item.id
                        ? { label: item.label, link: item.link }
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
      {renderMenuList(theLIST)}
    </DndContext>
  );
}
