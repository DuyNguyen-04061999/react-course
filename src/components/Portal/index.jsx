import React, { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Portal = forwardRef(
  (
    {
      overlay,
      containerClassName,
      contentClassName,
      children,
      containerStyle,
      contentStyle,
      onClose,
    },
    ref
  ) => {
    const renderElement = (
      <div
        ref={ref}
        style={containerStyle && containerStyle}
        className={`${
          containerClassName ? containerClassName : ""
        } fixed left-0 top-0 h-screen w-screen`}
      >
        {overlay && (
          <div
            className="overlay absolute inset-0 cursor-pointer bg-black opacity-0"
            onClick={onClose}
          ></div>
        )}

        {children && (
          <div
            style={contentStyle}
            className={`content ${contentClassName && contentClassName}`}
          >
            {children}
          </div>
        )}
      </div>
    );

    return createPortal(renderElement, document.body);
  }
);

Portal.propTypes = {
  overlay: PropTypes.bool,
  containerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  onClose: PropTypes.func,
};

export default Portal;
