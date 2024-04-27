import Carousel from "../../components/Carousel";
const SimilarVideos = ({ data  ,isLoading}) => {
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl mb-5">Similar Videos</h2>
        <Carousel isLoading={isLoading} data={data} activeTab={"movie"} />
      </div>
    </section>
  );
};

export default SimilarVideos;
