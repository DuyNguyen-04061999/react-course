import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal";

const Overlay = ({ visible = false, onClick: onClose }) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={200}
      unmountOnExit
      classNames="fade"
    >
      <Portal overlay onClose={onClose} ref={nodeRef} />
    </CSSTransition>
  );
};

export default Overlay;
