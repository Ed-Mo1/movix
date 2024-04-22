import Carousel from "../../components/Carousel";
const Recommended = ({ data }) => {
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl mb-5">Recommended</h2>
        <Carousel data={data} activeTab={"movie"} />
      </div>
    </section>
  );
};

export default Recommended;
