import Trending from "./Trending";
import HeroBanner from "./HeroBanner";
import Popular from "./Popular";
import TopRated from "./TopRated";
const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="my-20 flex flex-col gap-20">
        <Trending />
        <Popular />
        <TopRated />
      </div>
    </>
  );
};

export default Home;
