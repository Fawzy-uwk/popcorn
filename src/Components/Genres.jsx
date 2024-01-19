import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function Genres({ data }) {
  const { genres } = useSelector((state) => state.HomeSlice);
  return (
    <div className="genres">
      {data?.map((genre) => {
        if (!genres[genre]?.name) return  ;
        return (
          <div key={genre} className="genre">
            {genres[genre]?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
