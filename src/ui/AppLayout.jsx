import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr] select-none">
      <header className="bg-grey-0 border-grey-100 border-b border-solid px-[4.8rem] py-5">
        Gad HEADER
      </header>

      <Sidebar />

      <main className="overflow-y-scroll bg-gray-50 px-[4.8rem] pt-8">
        <div className="mx-auto my-0 flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
