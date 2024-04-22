import Img from "../../components/Img";
import { useParams } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { PlayIcon } from "../../components/PlayIcon";
import VideoPlayer from "../../components/VideoPlayer";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import noPoster from "../../assets/no-poster.png";
const DetailsBanner = ({ data, movieCreators, video }) => {
  const { url } = useSelector(({ home }) => home);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType } = useParams();
  function convertToHoursMinutes(runTime) {
    const hours = Math.floor(runTime / 60);
    const minutes = runTime % 60;
    return `${hours}h ${minutes > 0 && `${minutes}m`}`;
  }
  function findRole(role) {
    return movieCreators?.crew
      .filter((creator) => creator.department === role)
      .map((creator) => creator.name)
      .join(", ");
  }

  useEffect(() => {
    const trailer = video?.results?.find((item) => item.type === "Trailer");
    setVideoId(trailer?.key);
  }, [video]);

  return (
    <>
      <section className="relative">
        <div className="absolute z-[-1] inset-0 w-full h-full overflow-hidden opacity-[.1]">
          <Img
            src={`${url.profile}${data?.backdrop_path}`}
            className="backdrop_path"
          />
        </div>
        <div className="container py-20">
          <div className="flex min-h-screen items-center ">
            <div className="flex gap-10 max-md:flex-col">
              <div className="lg:max-w-[350px] max-md:w-full">
                <Img
                  src={
                    url.profile
                      ? ` ${url.profile}${data?.poster_path}`
                      : noPoster
                  }
                  className="aspect-[1/1.5] w-full  rounded-xl"
                />
              </div>
              <div className="flex-1">
                <div className="mb-5">
                  <h1 className="text-2xl font-bold leading-10">
                    {data?.original_title || data?.original_name} (
                    {new Date(
                      data?.release_date || data?.last_air_date.slice(0, 5)
                    ).getFullYear()}
                    )
                  </h1>

                  <h3 className="[font-style:italic] opacity-[0.5] text-xl">
                    {data?.tagline}
                  </h3>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {data?.genres?.map((genre) => (
                    <span key={genre.id} className="gener">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center  gap-5  mt-6">
                  <div className="bg-black2 rounded-full play_icon p-1">
                    <CircularProgressbar
                      className="max-md:w-[60px] w-[80px] "
                      styles={{
                        path: {
                          stroke:
                            data?.vote_average >= 7
                              ? "green"
                              : data?.vote_average >= 5
                              ? "orange"
                              : "red",
                        },
                        text: {
                          fill: "white",
                          fontSize: "30px",
                        },
                      }}
                      value={data?.vote_average}
                      maxValue={10}
                      text={`${data?.vote_average.toFixed(1)}`}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="playbtn" onClick={() => setShow(true)}>
                      <PlayIcon />
                      <h4 className="text max-sm:text-sm text-xl leading-9">Watch Trailer</h4>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="text-2xl">overview</h2>
                  <p className="lg:pe-28 leading-6 mt-2">{data?.overview}</p>
                </div>

                <div className="mt-6 divide-y-[0.1px] divide-[#ffffff1a]">
                  <div className="flex  items-center flex-wrap gap-5 py-5">
                    <div>
                      <span className="info_name">Status:</span>
                      <span className="info_value">{data?.status}</span>
                    </div>
                    {mediaType === "movie" && (
                      <div>
                        <span className="info_name">Release Date:</span>
                        <span className="info_value">
                          {new Date(data?.release_date).toDateString().slice(4)}
                        </span>
                      </div>
                    )}
                    {mediaType === "movie" && (
                      <div>
                        <span className="info_name">Runtime:</span>
                        <span className="info_value">
                          {data && convertToHoursMinutes(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                  {mediaType === "movie" && (
                    <div className="flex items-center gap-5  py-5">
                      <div>
                        <span className="info_name">Director:</span>
                        <span className="info_value">
                          {findRole("Directing")}
                        </span>
                      </div>
                    </div>
                  )}
                  {mediaType === "movie" && (
                    <div className="flex items-center gap-5  py-5">
                      <div>
                        <span className="info_name">Writer:</span>
                        <span className="info_value">
                          {findRole("Writing")}
                        </span>
                      </div>
                    </div>
                  )}
                  {mediaType === "tv" && data?.created_by.length > 0 && (
                    <div className="flex items-center gap-5  py-5">
                      <div>
                        <span className="info_name">Creator:</span>
                        <span className="info_value">
                          {data?.created_by
                            .map((creator) => creator.name)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {show && <VideoPlayer show={show} setShow={setShow} id={videoId} />}
      </AnimatePresence>
    </>
  );
};

export default DetailsBanner;
