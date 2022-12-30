import { videoTikTok } from "@/config";
import React, { memo, useRef } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const VideoDemo = ({ ...props }, ref) => {
  const videoRef = useRef();
  console.log(props.random);
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

  console.log("Video re-render");
  return (
    <div className="mx-auto mt-32 h-[500px] w-max">
      <video
        ref={videoRef}
        src={videoTikTok}
        {...props}
        className="h-full"
      ></video>
    </div>
  );
};

export default memo(forwardRef(VideoDemo), (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
