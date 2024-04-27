import { useState } from "react";
import SwitchingTab from "../../components/SwitchingTab";
import { useGetMoviesQuery } from "../../app/services/moviesApi";
import Carousel from "../../components/Carousel";

const Popular = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const { data: popular,isLoading } = useGetMoviesQuery({
    url: `/${activeTab}/popular`,
  });
  return (
    <section className="container">
      <div className="flex justify-between flex-wrap  gap-5 items-center">
        <h2 className="text-2xl">What's Popular</h2>
        <SwitchingTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Movie", "Tv"]}
        />
      </div>
      <div className="mt-10">
        <Carousel isLoading={isLoading} data={popular?.results} activeTab={activeTab} />
      </div>
    </section>
  );
};

export default Popular;
