import DetailsBanner from "../Components/DetailsBanner";
import { useParams } from "react-router";

import Cast from "../Components/Cast";
import Videos from "../Components/Videos";
import Similar from "../Components/Similar";
import Recommendation from "../Components/Recommendation";
import {useFetch} from "../hooks/useFetch";

function MovieDetails() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Videos data={data} loading={loading} />

      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default MovieDetails;
