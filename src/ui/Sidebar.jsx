import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-grey-0 row-span-full flex flex-col gap-[3.2rem] border-r border-solid border-gray-100 px-[2.4rem] py-[3.2rem]">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
