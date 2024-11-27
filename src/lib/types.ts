export type MenuObject = {
  id: number;
  label: string;
  link?: string;
  children: MenuObject[];
};

export type FormMenuObject = {
  label: string;
  link?: string;
};
export type LinkTypes = "URL" | "collection";
export type ItemProps = {
  id: number;
  label: string;
  link?: string;
  linkType?: LinkTypes;
  isLastChildren?: boolean;
  isChildren?: boolean;
  isParent?: boolean;
  handleDelete: (id: number) => void;
  handleAddChild: (id: number) => void;
  handleEdit: (id: number) => void;
  activeForm?: boolean;
};
