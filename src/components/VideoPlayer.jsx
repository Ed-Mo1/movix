import  { useEffect } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player/lazy";
import {motion } from "framer-motion";
const VideoPlayer = ({ setShow, id }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  })
  return createPortal(
    <>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed z-50 rounded-lg bg-black max-w-[800px] w-[95%] aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          className="absolute bottom-[100%] right-0"
          onClick={() => setShow(false)}
        >
          Close
        </button>
        <ReactPlayer
          controls
          width={"100%"}
          height={"100%"}
          url={`https://www.youtube.com/watch?v=${id}`}
        />
      </motion.div>
      <div
        className="fixed inset-0 bg-black bg-opacity-[0.25] w-full h-full backdrop-blur-[3.5px] z-40"
        onClick={() => setShow(false)}
      />
    </>,
    document.getElementById("video_player")
  );
};

export default VideoPlayer;
