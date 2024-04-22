import React from "react";
import Img from "../../components/Img";
import avatar from "../../assets/avatar.png";
import { useSelector } from "react-redux";
const TopCast = ({ movieCreators }) => {
  const { url } = useSelector(({ home }) => home);
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl">Top Cast</h2>
        <div className="flex overflow-y-hidden  gap-6 hide-scrollbar py-5">
          {movieCreators?.cast?.map((creator, index) => (
            <div className="w-[175px] flex-shrink-0" key={index}>
              <div className="w-full aspect-square">
                <Img
                  src={
                    creator.profile_path
                      ? `${url.profile}${creator.profile_path}`
                      : avatar
                  }
                  className="rounded-full w-full h-full object-cover object-[center_top]"
                  alt={creator.name}
                />
              </div>
              <h3 className="text-center">{creator.name}</h3>
              <h4 className="text-center opacity-[0.5] text-base mt-1">
                {creator.character}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCast;
