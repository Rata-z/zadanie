"use client";
import React, { useContext, useState } from "react";
import MenuListRenderer from "./menuListRenderer";
import AddMenuForm from "./addMenuForm";
import EmptyMenu from "./emptyMenu";
import { ListContext } from "@/context/listContext";
import { ListContextType } from "@/lib/types";

export default function MenuListContainer() {
  const [formVisible, setFormVisible] = useState(false);
  const { list } = useContext(ListContext) as ListContextType;

  const toggleForm = () => {
    setFormVisible((visible) => !visible);
  };
  return (
    <>
      {!formVisible && list.length < 1 ? (
        <EmptyMenu onAddMenu={toggleForm} />
      ) : (
        <div className="flex flex-col overflow-hidden rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-[#F9FAFB]">
          {list.length > 0 && <MenuListRenderer />}

          {formVisible && (
            <div
              className={`${list.length > 0 && "border-t-[0.0625rem] px-6 py-4"} `}
            >
              <AddMenuForm
                onSubmit={() => {}}
                handleCancel={toggleForm}
                editedData={undefined}
                borderVisible={list.length > 0}
              />
            </div>
          )}
          {list.length > 0 && (
            <div className="border-t-[0.0625rem] bg-white px-6 py-5">
              <button
                onClick={() => toggleForm()}
                className="rounded-lg border-[0.0625rem] border-[#D0D5DD] px-[0.875rem] py-[0.625rem] text-sm font-semibold text-[#344054]"
              >
                Dodaj pozycję menu
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
