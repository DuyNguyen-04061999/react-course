import React, { useId } from "react";
import { useRef } from "react";
import VideoDemo from "@/components/VideoDemo";
import { useEffect } from "react";
const Demo = () => {
  const videoRef = useRef();
  const onPlay = () => {
    videoRef.current.play();
  };
  const onPause = () => {
    videoRef.current.pause();
  };

  const playId = useId();
  const pauseId = useId();
  return (
    <div className="">
      <VideoDemo ref={videoRef} />
      <div className="ml-32 flex gap-5">
        <button
          id={playId}
          className="bg-blue-500 p-5 text-white"
          onClick={onPlay}
        >
          Play
        </button>
        <button
          id={pauseId}
          className="bg-red-500 p-5 text-white"
          onClick={onPause}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Demo;
