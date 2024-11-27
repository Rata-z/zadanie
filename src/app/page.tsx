import ListContextProvider from "@/context/listContext";
import MenuListContainer from "@/components/menuListContainer";
export default function Home() {
  // const list: MenuObject[] = [
  //   { id: 1, label: "losz1", url: "https://www.xD", children: [] },
  //   {
  //     id: 2,
  //     label: "Diamenty forbes",
  //     url: "https://rc32141.redcart.pl/promocje",
  //     children: [
  //       { id: 3, label: "losz2", url: "h2ttps://www.xD", children: [] },
  //       { id: 4, label: "losz", children: [] },
  //       {
  //         id: 5,
  //         label: "Diamenty forbes",
  //         url: "https://rc32141.redcart.pl/promocje",
  //         children: [
  //           { id: 6, label: "losz2", url: "h2ttps://www.xD", children: [] },
  //           { id: 7, label: "losz", url: "https://www.xD", children: [] },
  //         ],
  //       },
  //     ],
  //   },
  //   { id: 8, label: "losz2", url: "https://www.xD", children: [] },
  //   { id: 9, label: "losz2", url: "https://www.xD", children: [] },
  //   { id: 10, label: "losz2", url: "https://www.xD", children: [] },
  // ];

  return (
    <ListContextProvider>
      <main className="flex justify-center">
        <section className="flex w-full max-w-7xl flex-col gap-4 px-6 py-4">
          <h1 className="text-xl font-semibold">Pozycje menu</h1>
          <MenuListContainer />
        </section>
      </main>
    </ListContextProvider>
  );
}
