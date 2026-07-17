import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext(undefined);
function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("No context!!");
  return context;
}

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  return (
    <ModalContext.Provider
      value={{ openName, close: () => setOpenName(""), setOpenName }}
    >
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = function ModalOpen({ children, opensWindowName }) {
  const { setOpenName } = useModalContext();
  return cloneElement(children, {
    onClick: () => setOpenName(opensWindowName),
  });
};

Modal.Window = function ModalWindow({ children, name }) {
  const { openName, close } = useModalContext();

  useEffect(() => {
    const escapeButtonToExit = ({ key }) => key === "Escape" && close();
    document.addEventListener("keydown", escapeButtonToExit);
    return () => document.removeEventListener("keydown", escapeButtonToExit);
  }, [close]);
  if (name !== openName) return null;

  function handleOverlayClick({ target, currentTarget }) {
    target === currentTarget && close();
  }

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed top-0 left-0 z-[1000] h-screen w-full bg-backdrop backdrop-blur-[6px] transition-all duration-500 select-none"
    >
      <div className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg bg-white px-12 py-[1.8rem] shadow-2xl transition-all duration-500 ease-in-out">
        <button
          onClick={close}
          className="absolute top-[1.2rem] right-[1.9rem] translate-x-[0.8rem] rounded-sm border-none bg-none p-[0.4rem] transition-all duration-200 hover:bg-grey-100 [&>svg]:h-[2.4rem] [&>svg]:w-[2.4rem] [&>svg]:text-grey-500"
        >
          <HiXMark />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.querySelector("body"),
  );
};
