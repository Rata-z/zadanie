export type MenuObject = {
  id: number;
  label: string;
  url?: string;
  children: MenuObject[];
};

export type ListContextType = {
  list: MenuObject[];
  handleEditItem: (id: number, updatedData: FormMenuObject) => void;
  handleAddItem: (object: FormMenuObject, parentId: number) => void;
  handleDeleteItem: (id: number) => void;
  reorderAtSameLevel: (
    menus: MenuObject[],
    activeId: number,
    overId: number,
  ) => void;
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
  handleAddChild: (id: number) => void;
  handleEdit: (id: number) => void;
  activeForm?: boolean;
};
