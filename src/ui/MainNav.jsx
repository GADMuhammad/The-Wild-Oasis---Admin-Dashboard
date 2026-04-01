import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineArchiveBox,
} from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi";

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    /* border: solid 1px var(--color-grey-300); */
    border-radius: var(--radius-lg);
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover > svg,
  &:active > svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const links = [
  { label: "Home", link: "/dashboard", icon: <HiOutlineHome /> },
  { label: "Bookings", link: "/bookings", icon: <HiOutlineCalendarDays /> },
  { label: "Cabins", link: "/cabins", icon: <HiOutlineArchiveBox /> },
  { label: "Users", link: "/users", icon: <HiOutlineUsers /> },
  // { label: "", link: "", icon:<HiOutlineHome /> },
];

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {links.map(({ label, link, icon }) => (
          <li key={link}>
            <StyledNavLink to={link}>
              {icon}
              <span>{label}</span>
            </StyledNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
