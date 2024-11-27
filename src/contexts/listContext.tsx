"use client";
import { FormMenuObject, ListContextType, MenuObject } from "@/lib/types";
import { addItem, removeItem, reorderList, updateItem } from "@/lib/utils";
import { DragEndEvent } from "@dnd-kit/core";
import React, { createContext, useState, ReactNode } from "react";

/**
 * ListContextProvider component provides the context for managing a menu list,
 * including actions for adding, editing, deleting, and reordering items.
 * It also handles toggling forms for adding or editing items and manages the state for the current item being edited.
 *
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} A JSX element that provides context for managing the menu list.
 */

export const ListContext = createContext<ListContextType | null>(null);

export default function ListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [list, setList] = useState<MenuObject[]>([]);

  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [activeParentId, setActiveParentId] = useState<number | null>(null);

  const handleEditItem = (updatedData: FormMenuObject, id: number) => {
    setList((prevList) => {
      return updateItem(prevList, id, updatedData);
    });
  };

  const handleAddItem = (object: FormMenuObject, parentId?: number) => {
    const newItem = {
      id: Date.now(),
      label: object.label,
      url: object.url,
      children: [],
    };
    if (parentId) {
      setList((prevList) => {
        return addItem(prevList, parentId, newItem);
      });
    } else {
      setList((prevList) => [...prevList, newItem]);
    }
  };

  const handleDeleteItem = (id: number) => {
    setList((prevList) => {
      return removeItem(prevList, id);
    });
  };

  const reorderAtSameLevel = (activeId: number, overId: number) => {
    setList((prevList) => reorderList(prevList, activeId, overId));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    reorderAtSameLevel(active.id as number, over.id as number);
  };

  const handleFormToggle = (id?: number, action?: "Add" | "Edit") => {
    if (id && action) {
      if (action === "Edit") {
        setActiveParentId(null);
        setEditedItemId(id);
        return;
      }
      setEditedItemId(null);
      setActiveParentId(id);
      return;
    }
    setActiveParentId(null);
    setEditedItemId(null);
  };

  const handleFormSubmit = (data: FormMenuObject, id?: number) => {
    if (!id) handleAddItem(data);
    else if (editedItemId === id) {
      handleEditItem(data, id);
      setEditedItemId(null);
    } else if (activeParentId === id) {
      handleAddItem(data, activeParentId);
      setActiveParentId(null);
    }
  };

  return (
    <ListContext.Provider
      value={{
        list,
        editedItemId,
        activeParentId,
        handleDeleteItem,
        handleDragEnd,
        handleFormToggle,
        handleFormSubmit,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
