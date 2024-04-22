import React, { useState } from "react";
import Img from "../../components/Img";
import { PlayIcon } from "../../components/PlayIcon";
import VideoPlayer from "../../components/VideoPlayer";
import { AnimatePresence } from "framer-motion";
const OfficalVideos = ({ videos }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      <section>
        <div className="container">
          <h2 className="text-2xl">Offical Videos</h2>
          <div className="flex overflow-y-hidden gap-6 hide-scrollbar py-5">
            {videos?.results?.map(({ id, key, name }) => (
              <div className="w-[300px]  flex-shrink-0" key={id}>
                <div
                  onClick={() => {
                    setId(key);
                    setShow(true);
                  }}
                  className="w-full aspect-video  relative "
                >
                  <Img
                    src={`https://img.youtube.com/vi/${key}/mqdefault.jpg`}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute z-30 transition bg-black bg-opacity-0 hover:bg-opacity-[0.7]  w-full h-full inset-0 flex items-center justify-center">
                    <div className="playbtn relative z-30">
                      <PlayIcon />
                    </div>
                  </div>
                </div>
                <p className="">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {show && <VideoPlayer id={id} setShow={setShow} />}
      </AnimatePresence>
    </>
  );
};

export default OfficalVideos;
