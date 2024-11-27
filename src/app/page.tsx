"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import EmptyMenu from "@/components/emptyMenu";

import { MenuObject } from "@/lib/types";
import MenuListRenderer from "@/components/menuListRenderer";
import { useState } from "react";
export default function Home() {
  const list = [
    { id: 1, label: "losz1", link: "https://www.xD", children: [] },
    {
      id: 2,
      label: "Diamenty forbes",
      link: "https://rc32141.redcart.pl/promocje",
      children: [
        { id: 3, label: "losz2", link: "h2ttps://www.xD", children: [] },
        { id: 4, label: "losz", children: [] },
        {
          id: 5,
          label: "Diamenty forbes",
          link: "https://rc32141.redcart.pl/promocje",
          children: [
            { id: 6, label: "losz2", link: "h2ttps://www.xD", children: [] },
            { id: 7, label: "losz", link: "https://www.xD", children: [] },
          ],
        },
      ],
    },
    { id: 8, label: "losz2", link: "https://www.xD", children: [] },
    { id: 9, label: "losz2", link: "https://www.xD", children: [] },
    { id: 10, label: "losz2", link: "https://www.xD", children: [] },
  ];

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-7xl flex-col gap-4 px-6 py-4">
        <h1 className="text-xl font-semibold">Pozycje menu</h1>

        <div className="flex flex-col overflow-hidden rounded-lg border-[0.0625rem] border-[#D0D5DD] bg-[#F9FAFB]">
          <MenuListRenderer list={list} />
          <div className="border-t-[0.0625rem] bg-white px-6 py-5">
            <input
              className="size-min rounded-lg border-[0.0625rem] border-[#D0D5DD] px-[0.875rem] py-[0.625rem] font-semibold text-[#344054]"
              form="add-menu"
              type="submit"
              value="Dodaj pozycję menu"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
