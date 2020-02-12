import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalStyled } from "./styles";
const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);
  return createPortal(<ModalStyled>{children}</ModalStyled>, elRef.current);
};

export default Modal;
