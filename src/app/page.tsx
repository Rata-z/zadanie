import ListContextProvider from "@/contexts/listContext";
import MenuListContainer from "@/components/menuListContainer";
export default function Home() {
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
