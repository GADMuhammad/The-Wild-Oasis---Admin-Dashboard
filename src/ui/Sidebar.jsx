import { Uploader } from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-grey-0 row-span-full flex flex-col gap-[3.2rem] border-r border-solid border-grey-100 px-[2.4rem] py-[3.2rem]">
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </aside>
  );
}

export default Sidebar;
