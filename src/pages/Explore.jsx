import { useCallback, useEffect, useRef, useState } from "react";
import { useGetExploreQuery } from "../app/services/moviesApi";
import { useParams } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";

const Explore = () => {
  const { mediaType } = useParams();
  const [page, setPage] = useState(1);
  const mediaRef = useRef(null);
  const [lists, setLists] = useState([]);
  const { data, isLoading, isFetching, error } = useGetExploreQuery({
    mediaType,
    params: { page },
  });

  useEffect(() => {
    if (mediaType !== mediaRef.current) {
      setPage(1);
      setLists([]);
      mediaRef.current = mediaType;
    }
  }, [mediaType]);

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
      <div className="container min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </section>
  );
};

export default Explore;
