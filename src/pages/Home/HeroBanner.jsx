import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../../app/services/moviesApi";
import Img from "../../components/Img";
import { useSelector } from "react-redux";
const HeroBanner = () => {
  const { data: upcoming } = useGetMoviesQuery({ url: "/movie/upcoming" });
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [bg, setBg] = useState("");

  const { url } = useSelector(({ home }) => home);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * upcoming?.results.length);
    setBg(upcoming?.results[randomIndex]?.backdrop_path);
  }, [upcoming]);

  const handleSearch = (event) => {
    if (
      ((event.target.type === "text" && event.key === "Enter") ||
        event.target.type === "button") &&
      query.length
    ) {
      navigate(`/movix/search/${query}`);
    }
  };

  return (
    <div className="relative z-10">
      {/* bg-image */}
      <div className="absolute z-[-1] inset-0 w-full h-full overflow-hidden opacity-[.5]">
        <Img src={`${url.profile}${bg}`} className="backdrop_path" />
      </div>
      {/* overlay */}
      <div className="absolute z-[-1] bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#04152d00] to-black " />
      {/* hero section */}
      <section className="container h-screen flex justify-center items-center">
        <div className="text-center w-full mx-auto max-w-[800px]">
          <h1 className="max-lg:text-6xl max-sm:text-4xl text-8xl font-bold ">
            Welcome.
          </h1>
          <p className="max-sm:text-lg text-xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <div className="flex items-center w-full  mt-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearch}
              placeholder="Search for a movie or tv show...."
              className="flex-grow-[1] text-black text-ellipsis bg-none ps-4 max-sm:py-3 py-4 rounded-full rounded-r-none"
            />
            <button type="button" onClick={handleSearch} className="bg-gradient basis-[20%] py-4 max-sm:py-3  rounded-l-none rounded-full">
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
