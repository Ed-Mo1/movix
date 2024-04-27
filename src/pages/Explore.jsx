import { useCallback, useEffect, useRef, useState } from "react";
import { useGetExploreQuery } from "../app/services/moviesApi";
import { useParams } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import { IoIosArrowDown } from "react-icons/io";
import Select from "../components/Select";
import noResults from "../assets/no-results.png";
const sortItems = [
  {
    name: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    name: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    name: "Rating Descending",
    value: "vote_average.desc",
  },
  {
    name: "Rating Ascending",
    value: "vote_average.asc",
  },
  {
    name: "Release Date Descending",
    value: "release_date.desc",
  },
  {
    name: "Release Date Ascending",
    value: "release_date.asc",
  },
  {
    name: "Title (A-Z)",
    value: "title.asc",
  },
];
const Explore = () => {
  const { mediaType } = useParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showSelectGenre, setShowSelectGenre] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const mediaRef = useRef(null);
  const genresRef = useRef(null);
  const sortRef = useRef(null);
  const [lists, setLists] = useState([]);
  const { data, isLoading, isFetching, error } = useGetExploreQuery({
    mediaType,
    params: {
      page,
      sort_by: sortBy,
      with_genres: selectedGenre.map((genre) => genre.id).join(","),
    },
  });

  useEffect(() => {
    if (mediaType !== mediaRef.current) {
      setPage(1);
      setLists([]);
      mediaRef.current = mediaType;
    } else if (sortBy !== sortRef.current) {
      setPage(1);
      setLists([]);
      sortRef.current = sortBy;
    } else if (selectedGenre !== genresRef.current) {
      setPage(1);
      setLists([]);
      genresRef.current = selectedGenre;
    }
  }, [mediaType, sortBy, selectedGenre]);

  useEffect(() => {
    if (data && data.results) {
      setLists((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  const observer = useRef();

  const lastDataRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (page < data.total_pages) setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: "100px" }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, data, page]
  );

  return (
    <section className="py-20">
      <div className="container">
        <div className="py-4 flex justify-between items-center gap-y-5 flex-wrap">
          <h2 className="text-2xl ">Explore Movies</h2>
          <div className="flex gap-5 items-center justify-end flex-wrap">
            <Select
              mediaType={mediaType}
              data={selectedGenre}
              setShowSelectGenre={setShowSelectGenre}
              showSelectGenre={showSelectGenre}
              setdata={setSelectedGenre}
            />
            <div className="bg-blackLighter relative cursor-pointer flex justify-between items-center rounded-full py-1 px-2 min-w-[200px] max-w-[200px]">
              <h3 className="text-white">Sort By</h3>
              <div
                className="px-1 border-l-2 border-white"
                onClick={() => setShowSortBy((prev) => !prev)}
              >
                <IoIosArrowDown className=" text-lg text-white " />
              </div>
              {showSortBy && (
                <div className="absolute shadow-lg top-[110%] left-0 w-full  z-30 bg-white rounded-lg">
                  <ul className="p-2">
                    {sortItems.map(({ name, value }, i) => (
                      <li
                        key={i}
                        className={`text-black p-1 hover:bg-black rounded hover:bg-opacity-[0.1]`}
                        onClick={() => {
                          setShowSortBy((prev) => !prev);
                          setSortBy(value);
                        }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {lists.map((item, index) => {
            if (lists.length === index + 1) {
              return (
                <div ref={lastDataRef} key={item.id}>
                  <CarouselCard {...item} active_tab={mediaType} />
                </div>
              );
            } else {
              return (
                <div key={item.id}>
                  <CarouselCard {...item} active_tab={mediaType} />
                </div>
              );
            }
          })}
          {!isFetching && lists.length === 0 && (
            <div className="text-white col-span-6 justify-center">
              <div className="text-center w-fit mx-auto">
                <img src={noResults} className="max-w-[500px] w-full" />
                <h3>No movies found</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </section>
  );
};

export default Explore;
