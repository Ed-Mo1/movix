import { useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner";
import {
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetRecommendationsQuery,
  useGetSimilarQuery,
  useGetVideosQuery,
} from "../../app/services/moviesApi";
import { useLayoutEffect } from "react";
import TopCast from "./TopCast";
import OfficalVideos from "./OfficalVideos";
import SimilarVideos from "./SimilarVideos";
import Recommended from "./Recommended";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data: movieCreators, isLoading: isMovieCreatorsLoading,isFetching } =
    useGetCreditsQuery(`${mediaType}/${id}`);
  const { data: movieInfo, isLoading: isMovieInfoLoading } = useGetDetailsQuery(
    `${mediaType}/${id}`
  );
  const { data: video, isLoading: isVideoLoading } = useGetVideosQuery(
    `${mediaType}/${id}`
  );
  const { data: similarMovies, isLoading: isSimilarLoading } =
    useGetSimilarQuery(`${mediaType}/${id}`);
  const { data: recommendMovies, isLoading: isRecommendedLoading } =
    useGetRecommendationsQuery(`${mediaType}/${id}`);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id, mediaType]);

  return (
    <div>
      <DetailsBanner
        isLoading={isMovieInfoLoading}
        data={movieInfo}
        video={video}
        isfetching={isFetching}
        movieCreators={movieCreators}
      />
      <div className="flex flex-col gap-10 py-5">
        {movieCreators?.cast.length > 0 && (
          <TopCast isLoading={isMovieCreatorsLoading} movieCreators={movieCreators} />
        )}
        {video?.results.length > 0 && (
          <OfficalVideos isLoading={isVideoLoading} videos={video} />
        )}
        {similarMovies?.results.length > 0 && (
          <SimilarVideos
            isLoading={isSimilarLoading}
            data={similarMovies?.results}
          />
        )}
        {recommendMovies?.results.length > 0 && (
          <Recommended
            isLoading={isRecommendedLoading}
            data={recommendMovies?.results}
          />
        )}
      </div>
    </div>
  );
};

export default Details;
