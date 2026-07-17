import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

function Header() {
  return (
    <header className="flex items-center justify-start gap-[2.4rem] border-b border-grey-100 bg-grey-0 px-[4.8rem] py-[1.2rem]">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
