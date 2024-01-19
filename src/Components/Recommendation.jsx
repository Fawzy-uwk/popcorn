import { useFetch } from "../hooks/useFetch";
import Carousel from "./Carousel";

/* eslint-disable react/prop-types */
const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <>
      {data?.results?.length > 0 && (
        <Carousel
          title="Recommendations"
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      )}
    </>
  );
};

export default Recommendation;
