import React, { useId, useState } from "react";
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
  const [random, setRandom] = useState();
  const playId = useId();
  const pauseId = useId();
  useEffect(() => {
    setInterval(() => {
      setRandom(Math.random());
    }, 1000);
  }, []);
  return (
    <div className="">
      <VideoDemo ref={videoRef} random={Math.random()} />
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
