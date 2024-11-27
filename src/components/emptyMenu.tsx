import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import Button from "./button";

/**
 * EmptyMenu component displays a message when the menu is empty, with an option to add a new menu item.
 * It includes a button that triggers a function to add a new menu item when clicked.
 *
 * @param {Function} onAddMenu - A function that is called when the user clicks the "Add Menu Item" button.
 * @returns {JSX.Element} A styled empty state view with a button to add a menu item.
 */

export default function EmptyMenu({ onAddMenu }: { onAddMenu: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border-[0.0625rem] border-[#EAECF0] bg-[#f9fafb] px-4 py-5">
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-base font-semibold text-[#101828]">
          Menu jest puste
        </h2>
        <p className="text-sm text-[#475467]">
          W tym menu nie ma jeszcze żadnych linków
        </p>
      </div>
      <Button
        handleClick={() => onAddMenu()}
        buttonStyle="flex flex-row items-center gap-1 bg-[#7F56D9] px-[0.875rem] text-[#FFFFFF]"
      >
        <FiPlusCircle size="1.25rem" /> <h1>Dodaj pozycję menu</h1>
      </Button>
    </div>
  );
}
