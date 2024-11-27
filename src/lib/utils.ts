import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormMenuObject, LinkTypes, MenuObject } from "./types";
import { arrayMove } from "@dnd-kit/sortable";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const assertLinkType = (link?: string): LinkTypes | undefined => {
  const regex = /^https:\/\/www\./;
  return link ? (regex.test(link) ? "URL" : "collection") : undefined;
};

export const swapItems = (
  items: MenuObject[],
  activeId: number,
  overId: number,
) => {
  const currentIndex = items.findIndex((item) => item.id === activeId);
  const targetIndex = items.findIndex((item) => item.id === overId);

  if (currentIndex === -1 || targetIndex === -1) return items;
  return arrayMove(items, currentIndex, targetIndex);
};

export const reorderList = (
  items: MenuObject[],
  activeId: number,
  overId: number,
): MenuObject[] => {
  const idsAtCurrentLevel = items.map((item) => item.id);

  if (
    idsAtCurrentLevel.includes(activeId) &&
    idsAtCurrentLevel.includes(overId)
  )
    return swapItems(items, activeId, overId);

  return items.map((item) => ({
    ...item,
    children:
      item.children.length > 0
        ? reorderList(item.children, activeId, overId)
        : [],
  }));
};

export const removeItem = (
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

export const addItem = (
  items: MenuObject[],
  parentId: number,
  newItem: MenuObject,
): MenuObject[] => {
  return items.map((item) => {
    if (item.id === parentId)
      return {
        ...item,
        children: [...(item.children || []), newItem],
      };
    else if (item.children)
      return { ...item, children: addItem(item.children, parentId, newItem) };

    return item;
  });
};

export const updateItem = (
  items: MenuObject[],
  id: number,
  updatedData: FormMenuObject,
): MenuObject[] => {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedData };
    } else if (item.children.length > 0) {
      return { ...item, children: updateItem(item.children, id, updatedData) };
    }
    return item;
  });
};
