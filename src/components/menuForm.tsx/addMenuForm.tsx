"use client";
import React from "react";
import { TbTrash } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { AddMenuFormProps, FormMenuObject } from "@/lib/types";
import { LuSearch } from "react-icons/lu";
import Button from "../button";
import MenuInput from "./menuInput";

/**
 * AddMenu component renders a form for adding or editing a menu item.
 * It allows the user to input a label and URL for the menu item.
 * The form can be submitted or canceled, with the form appearing differently based on whether it is in edit mode or create mode.
 *
 * @param {AddMenuFormProps} props - The properties for the AddMenu component.
 * @param {Function} handleCancel - Function to handle cancel action.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {FormMenuObject} [editedData] - The data to prefill the form for editing (optional).
 * @param {boolean} [borderVisible=true] - Boolean to determine whether the component's border should be visible (optional).
 * @returns {JSX.Element} A JSX element containing the form for adding or editing a menu item.
 */

export default function AddMenu({
  handleCancel,
  onSubmit,
  editedData,
  borderVisible = true,
}: AddMenuFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormMenuObject>({ defaultValues: editedData });

  return (
    <div
      className={`flex flex-col gap-5 rounded-lg ${borderVisible && "border-[0.0625rem]"} border-[#D0D5DD] bg-white px-6 py-5`}
    >
      <div className="flex flex-row gap-4">
        <form
          data-testid="add-menu"
          id="add-menu"
          className="flex flex-grow flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <MenuInput
            labelText="Nazwa"
            inputStyle="px-3"
            placeholder="np. Promocje"
            inputActions={{ ...register("label", { required: true }) }}
          >
            {errors.label && (
              <span data-testid="hint-text" className="text-sm text-[#475467]">
                To pole jest wymagane.
              </span>
            )}
          </MenuInput>
          <MenuInput
            labelText="Link"
            inputStyle="  pl-[2.625rem] pr-3"
            placeholder="Wklej lub wyszukaj"
            inputActions={{ ...register("url") }}
          >
            <LuSearch
              className="absolute left-[0.875rem] top-1/2 -translate-y-1/2 transform font-bold text-[#667085]"
              size={20}
            />
          </MenuInput>
        </form>
        <button className="flex size-min" type="reset" form="add-menu">
          <span className="p-[0.625rem] text-[#475467]">
            <TbTrash size="1.25rem" />
          </span>
        </button>
      </div>

      <div className="flex gap-2 text-sm">
        <Button
          buttonStyle=" border-[0.0625rem] border-[#D0D5DD] bg-white px-4 text-[#344054]"
          handleClick={handleCancel}
        >
          Anuluj
        </Button>
        <Button
          data-testid="submit-button"
          buttonStyle="border-[0.0625rem] border-[#D6BBFB] bg-white px-4  text-[#6941C6]"
          form="add-menu"
          type="submit"
        >
          {editedData ? "Zapisz" : "Dodaj"}
        </Button>
      </div>
    </div>
  );
}
