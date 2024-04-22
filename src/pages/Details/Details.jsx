import { useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner";
import {
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetRecommendationsQuery,
  useGetSimilarQuery,
  useGetVideosQuery,
} from "../../app/services/moviesApi";
import Img from "../../components/Img";
import { useLayoutEffect } from "react";
import TopCast from "./TopCast";
import OfficalVideos from "./OfficalVideos";
import SimilarVideos from "./SimilarVideos";
import Recommended from "./Recommended";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data: movieCreators } = useGetCreditsQuery(`${mediaType}/${id}`);
  const { data: movieInfo } = useGetDetailsQuery(`${mediaType}/${id}`);
  const { data: video } = useGetVideosQuery(`${mediaType}/${id}`);
  const { data: similarMovies } = useGetSimilarQuery(`${mediaType}/${id}`);
  const { data: recommendMovies } = useGetRecommendationsQuery(
    `${mediaType}/${id}`
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id, mediaType]);

  return (
    <div>
      <DetailsBanner
        data={movieInfo}
        video={video}
        movieCreators={movieCreators}
      />
      <div className="flex flex-col gap-10 py-5">
        <TopCast movieCreators={movieCreators} />
        <OfficalVideos videos={video} />
        <SimilarVideos data={similarMovies?.results} />
        <Recommended data={recommendMovies?.results} />
      </div>
    </div>
  );
};

export default Details;
