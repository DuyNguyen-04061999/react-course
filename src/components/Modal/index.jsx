import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal";
import { CloseBtn } from "./styled";

const Modal = ({ children, visible, onCancel }) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={visible}
      unmountOnExit
      classNames="zoom"
      timeout={200}
      nodeRef={nodeRef}
    >
      <Portal
        overlay
        ref={nodeRef}
        onClose={onCancel}
        containerClassName="z-[999] flex items-center justify-center"
        contentClassName="lg:w-[65%] sm:w-[80%] w-[calc(100%-30px)] h-max mx-auto z-[99] bg-black scale-0 opacity-0"
      >
        <div
          style={{ border: "4px solid white" }}
          className="relative aspect-video w-full rounded"
        >
          {children}
          <CloseBtn onClick={onCancel}>
            <svg
              viewBox="0 0 21 21"
              fill="currentColor"
              height="35px"
              width="35px"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 7.5l6 6M13.5 7.5l-6 6" />
              </g>
            </svg>
          </CloseBtn>
        </div>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;

// const onMaskClick = () => {
//   if (maskCloseable) onCancel?.();
// };
// if (!visible) return null;
// return createPortal(
//   <div className="popup-video" onClick={onMaskClick}>
//     <div className="wrap">{children}</div>
//     <div className="close" onClick={onCancel} />
//   </div>,
//   document.body
// );
