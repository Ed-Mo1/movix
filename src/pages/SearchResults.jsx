import { useCallback, useEffect, useRef, useState } from "react";
import { useGetSearchQuery } from "../app/services/moviesApi";
import { useParams } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import noResults from "../assets/no-results.png";
const SearchResults = () => {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const queryRef = useRef(null);
  const [lists, setLists] = useState([]);
  const { data, isLoading, isFetching, error } = useGetSearchQuery({ query });

  useEffect(() => {
    if (query !== queryRef.current) {
      setPage(1);
      setLists([]);
      queryRef.current = query;
    }
  }, [data]);
  useEffect(() => {
    setLists((prev) => [...prev, ...(data?.results || [])]);
  }, [data]);

  const observer = useRef();
  const lastDataRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page < data.total_pages) setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, data, page]
  );

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-2xl mb-5">Search Results of {`'${query}'`}</h2>
        <div className="min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {lists.map((item, index) => {
            if (lists.length === index + 1) {
              return (
                <div ref={lastDataRef} key={item.id}>
                  <CarouselCard {...item} />
                </div>
              );
            } else {
              return (
                <div key={item.id}>
                  <CarouselCard {...item} />
                </div>
              );
            }
          })}
          {!isLoading && lists.length === 0 && (
            <div className="col-span-6 flex flex-col items-center">
              <img
                src={noResults}
                alt="no results"
                className="w-full max-w-[300px]"
              />
              <p className="text-center text-xl">No results found</p>
            </div>
          )}
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </section>
  );
};

export default SearchResults;
