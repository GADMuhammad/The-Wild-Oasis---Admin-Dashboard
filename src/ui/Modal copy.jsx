import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-backdrop);
  backdrop-filter: blur(6px);
  z-index: 1000;
  transition: all 0.5s;
  user-select: none;
`;
const StyledCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

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
    <Overlay onClick={handleOverlayClick}>
      <div className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg bg-white px-12 py-[1.8rem] shadow-2xl transition-all duration-500 ease-in-out">
        <StyledCloseButton onClick={close}>
          <HiXMark />
        </StyledCloseButton>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </Overlay>,
    document.querySelector("body"),
  );
};
