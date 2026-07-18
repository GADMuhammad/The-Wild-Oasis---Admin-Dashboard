import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
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
  const isOpen = name === openName;

  useEffect(() => {
    const escapeButtonToExit = ({ key }) => key === "Escape" && close();
    document.addEventListener("keydown", escapeButtonToExit);
    return () => document.removeEventListener("keydown", escapeButtonToExit);
  }, [close]);

  function handleOverlayClick({ target, currentTarget }) {
    target === currentTarget && close();
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleOverlayClick}
          className="bg-backdrop fixed top-0 left-0 z-1000 flex h-screen w-full items-center justify-center p-[2.4rem] backdrop-blur-[6px] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="border-grey-100 bg-grey-0 relative max-h-[90vh] w-fit max-w-full overflow-hidden rounded-lg border py-12 shadow-2xl"
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <motion.button
              onClick={close}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="hover:bg-grey-100 [&>svg]:text-grey-500 absolute top-[1.2rem] right-[1.6rem] z-10 rounded-sm border-none bg-none p-[0.4rem] [&>svg]:h-[2.4rem] [&>svg]:w-[2.4rem]"
            >
              <HiXMark />
            </motion.button>
            <div className="max-h-[90vh] overflow-y-auto px-12 py-[1.8rem]">
              {cloneElement(children, { onCloseModal: close })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("body"),
  );
};
