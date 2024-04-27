import { useState } from "react";
import SwitchingTab from "../../components/SwitchingTab";
import { useGetMoviesQuery } from "../../app/services/moviesApi";
import Carousel from "../../components/Carousel";

const TopRated = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const { data: topRated ,isLoading } = useGetMoviesQuery({
    url: `/${activeTab}/top_rated`,
  });
  return (
    <section className="container">
      <div className="flex justify-between flex-wrap  gap-5 items-center">
        <h2 className="text-2xl">Top Rated</h2>
        <SwitchingTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Movie", "Tv"]}
        />
      </div>
      <div className="mt-10">
        <Carousel data={topRated?.results} isLoading={isLoading}  activeTab={activeTab} />
      </div>
    </section>
  );
};

export default TopRated;
