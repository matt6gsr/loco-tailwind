import Actions from "./components/Actions";
import AsideMenu from "./components/AsideMenu";
import DeviceTable from "./components/DeviceTable";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-8rem)]">
      <AsideMenu />
      <section className="w-4/5 p-4">
        <Actions />
        <DeviceTable />
      </section>
    </main>
  );
}
