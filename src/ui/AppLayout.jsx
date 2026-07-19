import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={`grid h-screen grid-rows-[auto_1fr] transition-[grid-template-columns] duration-300 ${
        isSidebarCollapsed ? "grid-cols-[8rem_1fr]" : "grid-cols-[26rem_1fr]"
      }`}
    >
      {/* <header className="bg-grey-0 border-grey-100 border-b border-solid px-[4.8rem] py-5">
        The wild oasis, Muhammad Gad
      </header> */}
      <Header />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
      />

      <main className="bg-grey-50 overflow-y-scroll px-[4.8rem] pt-8">
        <div className="mx-auto my-0 flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
