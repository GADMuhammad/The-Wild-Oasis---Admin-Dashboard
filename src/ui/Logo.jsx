import { useDarkModeContext } from "../context/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkModeContext();
  return (
    <div className="mx-auto text-center">
      <img
        className="h-[9.6rem] w-auto"
        src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
