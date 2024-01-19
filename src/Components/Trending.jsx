import { useState } from "react";
import Container from "../Ui/Container";
import Tabs from "./Tabs";

import Carousel from "./Carousel";
import { useFetch } from "../hooks/useFetch";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <Container className="flex justify-center gap-4 sm:justify-between flex-wrap">
        <span className="carouselTitle">Trending</span>
        <Tabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </Container>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
