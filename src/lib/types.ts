import { DragEndEvent } from "@dnd-kit/core";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type MenuObject = {
  id: number;
  label: string;
  url?: string;
  children: MenuObject[];
};

export type ListContextType = {
  list: MenuObject[];
  handleDeleteItem: (id: number) => void;
  editedItemId: number | null;
  activeParentId: number | null;
  handleFormToggle: (id?: number, action?: "Add" | "Edit") => void;
  handleFormSubmit: (data: FormMenuObject, id?: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
};

export type FormMenuObject = {
  label: string;
  url?: string;
};
export type LinkTypes = "URL" | "collection";
export type ItemProps = {
  id: number;
  label: string;
  url?: string;
  linkType?: LinkTypes;
  isLastChildren?: boolean;
  isChildren?: boolean;
  isParent?: boolean;
  handleDelete: (id: number) => void;
  handleOpenForm: (id: number, action: "Add" | "Edit") => void;
  activeForm?: boolean;
};
export type AddMenuFormProps = {
  handleCancel: () => void;
  onSubmit: (object: FormMenuObject) => void;
  editedData?: FormMenuObject;
  borderVisible?: boolean;
};

export type InputProps = {
  labelText: string;
  inputStyle: string;
  placeholder: string;
  children: ReactNode;
  inputActions: UseFormRegisterReturn;
};
