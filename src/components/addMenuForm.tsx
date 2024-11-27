import React from "react";
import { TbTrash } from "react-icons/tb";
import { useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormMenuObject, MenuObject } from "@/lib/types";
import { LuSearch } from "react-icons/lu";

type AddMenuFormProps = {
  handleCancel: () => void;
  onSubmit: (object: FormMenuObject) => void;
  editedData?: FormMenuObject;
  borderVisible?: boolean;
};

export default function AddMenu({
  handleCancel,
  onSubmit,
  editedData,
  borderVisible = true,
}: AddMenuFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormMenuObject>({ defaultValues: editedData });
  return (
    <div
      className={`flex flex-col gap-5 rounded-lg ${borderVisible && "border-[0.0625rem]"} border-[#D0D5DD] bg-white px-6 py-5`}
    >
      <div className="flex flex-row gap-4">
        <form
          id="add-menu"
          className="flex flex-grow flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col gap-[0.375rem] text-base font-medium text-[#344054]">
            Nazwa
            <input
              className="rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-white px-3 py-2 placeholder-[#667085]"
              placeholder="np. Promocje"
              {...register("label", { required: true })}
            />
            {errors.label && (
              <span className="text-sm text-[#475467]">
                To pole jest wymagane.
              </span>
            )}
          </label>

          <label className="flex flex-col gap-[0.375rem] font-medium text-[#344054]">
            Link
            <div className="relative bg-red-300">
              <input
                className="w-full rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-white py-2 pl-[2.625rem] pr-3 placeholder-[#667085]"
                placeholder="Wklej lub wyszukaj"
                {...register("url")}
              />
              <LuSearch
                className="absolute left-[0.875rem] top-1/2 -translate-y-1/2 transform font-bold text-[#667085]"
                size={20}
              />
            </div>
          </label>
        </form>
        <button className="flex size-min" type="reset" form="add-menu">
          <span className="p-[0.625rem] text-[#475467]">
            <TbTrash size="1.25rem" />
          </span>
        </button>
      </div>
      <div className="flex gap-2 text-sm">
        <button
          className="rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-white px-4 py-[0.625rem] font-semibold text-[#344054]"
          onClick={handleCancel}
        >
          Anuluj
        </button>
        <input
          className="rounded-lg border-[0.0625rem] border-[#D6BBFB] bg-white px-4 py-[0.625rem] font-semibold text-[#6941C6]"
          form="add-menu"
          type="submit"
          value={editedData ? "Zapisz" : "Dodaj"}
        />
      </div>
    </div>
  );
}
