import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineArchiveBox,
} from "react-icons/hi2";

const getLinkClassName =
  (isCollapsed) =>
  ({ isActive }) =>
    `flex items-center gap-[1.2rem] rounded-lg py-[1.2rem] text-[1.6rem] font-medium transition-all duration-300 [&>svg]:h-[2.4rem] [&>svg]:w-[2.4rem] [&>svg]:shrink-0 [&>svg]:transition-all [&>svg]:duration-300 hover:bg-grey-100 hover:text-grey-800 hover:[&>svg]:text-brand-600 ${
      isCollapsed ? "justify-center px-[1.2rem]" : "px-[2.4rem]"
    } ${
      isActive
        ? "bg-grey-200 text-grey-800 [&>svg]:text-brand-600"
        : "text-grey-600 [&>svg]:text-grey-400"
    }`;

const links = [
  { label: "Home", link: "/dashboard", icon: <HiOutlineHome /> },
  { label: "Bookings", link: "/bookings", icon: <HiOutlineCalendarDays /> },
  { label: "Cabins", link: "/cabins", icon: <HiOutlineArchiveBox /> },
  { label: "Users", link: "/users", icon: <HiOutlineUsers /> },
  { label: "Settings", link: "/settings", icon: <HiOutlineCog6Tooth /> },
];

export default function MainNav({ isCollapsed }) {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {links.map(({ label, link, icon }) => (
          <li key={link}>
            <NavLink
              to={link}
              className={getLinkClassName(isCollapsed)}
              title={isCollapsed ? label : undefined}
            >
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
