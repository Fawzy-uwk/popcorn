import { useSelector } from "react-redux";

import avatar from "../assets/avatar.png";
import Container from "../Ui/Container";
import LazyLoadImg from "./LazyLoadImg";

/* eslint-disable react/prop-types */
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.HomeSlice);

  

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <Container>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <a
                  key={item.id}
                  className="listItem"
                  href={`https://en.wikipedia.org/wiki/${item.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="profileImg">
                    <LazyLoadImg src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cast;
