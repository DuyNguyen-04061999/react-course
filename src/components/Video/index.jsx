import React from "react";
import { createPortal } from "react-dom";

const VideoModal = ({ maskCloseable, visible, onCancel }) => {
  const onMaskClick = () => {
    if (maskCloseable) onCancel?.();
  };
  if (!visible) return null;
  return createPortal(
    <div className="popup-video" onClick={onMaskClick}>
      <div className="wrap">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/Zh6NzOHOU8s?autoplay=1"
          title="Liar Liar (1/9) Movie CLIP - Big Liar (1997) HD"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="close" onClick={onCancel} />
    </div>,
    document.body
  );
};

export default VideoModal;
