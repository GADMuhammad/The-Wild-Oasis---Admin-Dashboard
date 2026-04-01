import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <header className="bg-grey-0 py-5 px-[4.8rem] border-b border-solid border-grey-100">HEADER</header>
      <Sidebar />
      <main className="bg-gray-50 px-[4.8rem] pt-16 pb-[6.4rem] overflow-auto">
        <div className="flex max-w-480 my-0 mx-auto flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
