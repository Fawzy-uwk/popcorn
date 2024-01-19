import { useState } from "react";
import Container from "../Ui/Container";
import Tabs from "./Tabs";

import Carousel from "./Carousel";
import { useFetch } from "../hooks/useFetch";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <Container className="flex items-center justify-center gap-4 sm:justify-between flex-wrap">
        <span className="carouselTitle">Top Rated</span>
        <Tabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </Container>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
