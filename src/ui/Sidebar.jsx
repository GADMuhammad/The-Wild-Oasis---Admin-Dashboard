import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { Uploader } from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";
import ButtonIcon from "./ButtonIcon";

function Sidebar({ isCollapsed, onToggleCollapse }) {
  return (
    <aside
      className={`bg-grey-0 relative row-span-full flex flex-col gap-[3.2rem] border-r border-solid border-grey-100 py-[3.2rem] transition-[padding] duration-300 ${
        isCollapsed ? "px-[1.2rem]" : "px-[2.4rem]"
      }`}
    >
      <ButtonIcon
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="border-grey-200 bg-grey-0 absolute top-[2.4rem] -right-[1.4rem] z-10 rounded-full border shadow-sm hover:bg-grey-100"
      >
        {isCollapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
      </ButtonIcon>

      {!isCollapsed && <Logo />}
      <MainNav isCollapsed={isCollapsed} />
      {/* <Uploader /> */}
    </aside>
  );
}

export default Sidebar;
