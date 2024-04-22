import Img from "./Img";
import { CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import noPoster from "../assets/no-poster.png";
const CarouselCard = ({
  genre_ids,
  active_tab,
  media_type,
  id,
  original_name,
  first_air_date,
  poster_path,
  title,
  release_date,
  vote_average,
}) => {
  const { url } = useSelector(({ home }) => home);

  const navigate = useNavigate();
  const {
    genres: { movie, tv },
  } = useSelector((state) => state.home);
  const genresList = [...(movie || []), ...(tv || [])]
    .filter((genre) => genre_ids?.includes(genre.id))
    .map((genre) => genre.name)
    .filter((genre, i, arr) => arr.indexOf(genre, i + 1) === -1);

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/movix/${media_type || active_tab}/${id}`)}
    >
      <div className="relative aspect-[1/1.5] px-1 gap-2 py-2 flex items-end justify-between">
        <div className="rounded-xl absolute inset-0 w-full h-full z-[-1]">
          <Img
            src={poster_path ? `${url.profile}${poster_path}` : noPoster}
            className="rounded-xl w-full h-full"
          />
        </div>
        <div className="max-sm:w-[40px] relative top-[10%] left-[1%] bg-white rounded-full max-sm:text-base w-[50px] text-xl p-[2px] aspect-square font-bold">
          <CircularProgressbar
            value={vote_average ? vote_average  : 0}
            styles={{
              path: {
                stroke:
                  vote_average >= 7
                    ? "green"
                    : vote_average >= 5
                    ? "orange"
                    : "red",
              },
              text: {
                fill: "black",
                fontSize: "30px",
              },
            }}
            maxValue={10}
            className="text-black text-xl"
            text={`${vote_average?.toFixed(1)}`}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-2 right-2 w-full z-10">
          {genresList.map((genre, i) => (
            <span key={i} className="gener">
              {genre}
            </span>
          ))}
        </div>
      </div>
      <h3 className="mt-8 mb-2 text-xl whitespace-nowrap overflow-hidden text-ellipsis">
        {title || original_name}
      </h3>
      <h4 className="text-sm opacity-[.5]">{release_date || first_air_date}</h4>
    </div>
  );
};

export default CarouselCard;
