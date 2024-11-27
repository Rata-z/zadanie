"use client";
import { FormMenuObject, ListContextType, MenuObject } from "@/lib/types";
import { arrayMove } from "@dnd-kit/sortable";
import React, { createContext, useState, ReactNode } from "react";

export const ListContext = createContext<ListContextType | null>(null);

export default function ListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [list, setList] = useState<MenuObject[]>([]);

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
  };

  const handleAddItem = (object: FormMenuObject, parentId: number) => {
    if (parentId !== null) {
      const newItem = {
        id: Date.now(),
        label: object.label,
        url: object.url,
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
        return addItem(prevList, parentId);
      });
    }
  };
  const handleDeleteItem = (id: number) => {
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
  const reorderItems = (
    items: MenuObject[],
    activeId: number,
    overId: number,
  ) => {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    const targetIndex = items.findIndex((item) => item.id === overId);

    if (currentIndex === -1 || targetIndex === -1) return items;
    return arrayMove(items, currentIndex, targetIndex);
  };
  const reorderAtSameLevel = (
    menus: MenuObject[],
    activeId: number,
    overId: number,
  ) => {
    const isSameLevel = menus.some(
      (item) => item.id === activeId || item.id === overId,
    );

    if (isSameLevel) {
      setList((oldList) => {
        return reorderItems(oldList, activeId, overId);
      });
    }

    menus.forEach((item) =>
      item.children.length > 0
        ? {
            ...item,
            children: reorderAtSameLevel(item.children, activeId, overId),
          }
        : item,
    );
  };

  return (
    <ListContext.Provider
      value={{
        list,
        handleAddItem,
        handleEditItem,
        handleDeleteItem,
        reorderAtSameLevel,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
