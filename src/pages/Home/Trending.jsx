import { useState } from "react";
import SwitchingTab from "../../components/SwitchingTab";
import { useGetMoviesQuery } from "../../app/services/moviesApi";
import Carousel from "../../components/Carousel";

const Trending = () => {
  const [activeTab, setActiveTab] = useState("day");
  const { data: trending ,isLoading} = useGetMoviesQuery({
    url: `/trending/all/${activeTab}`,
  });
  
  return (
    <section className="container">
      <div className="flex justify-between flex-wrap  gap-5 items-center">
        <h2 className="text-2xl">Trending</h2>
        <SwitchingTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Day", "Week"]}
        />
      </div>
      <div className="mt-10">
        <Carousel isLoading={isLoading} data={trending?.results} activeTab={activeTab} />
      </div>
    </section>
  );
};

export default Trending;
