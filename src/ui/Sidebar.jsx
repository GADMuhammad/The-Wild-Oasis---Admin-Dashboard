import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar({ isCollapsed, onToggleCollapse }) {
  return (
    <aside
      className={`bg-grey-0 border-grey-100 relative row-span-full flex flex-col gap-[3.2rem] border-r border-solid py-[3.2rem] transition-[padding] duration-300 ${
        isCollapsed ? "px-[1.2rem]" : "px-[2.4rem]"
      }`}
    >
      <ButtonIcon
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="border-grey-200 bg-grey-0 hover:bg-grey-100 absolute top-[2.4rem] -right-[1.4rem] z-10 rounded-full border shadow-sm"
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
