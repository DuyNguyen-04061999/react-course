import { videoTikTok } from "@/config";
import React, { useRef } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const VideoDemo = (props, ref) => {
  const videoRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      pause() {
        videoRef.current.pause();
      },
      play() {
        videoRef.current.play();
      },
    };
  });

  return (
    <div className="mx-auto mt-32 h-[500px] w-max">
      <video ref={videoRef} src={videoTikTok} className="h-full"></video>
    </div>
  );
};

export default forwardRef(VideoDemo);
