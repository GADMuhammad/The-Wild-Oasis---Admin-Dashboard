import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("Context was used outside of DarkMode Provider.");
  return context;
}

function DarkModeProvide({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "darkMode",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((prev) => !prev),
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeProvide, useDarkModeContext };
