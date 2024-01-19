import { useState } from "react";
import Container from "../Ui/Container";
import Tabs from "./Tabs";
import { useFetch } from "../hooks/useFetch";
import Carousel from "./Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <Container className="flex items-center justify-center gap-4 sm:justify-between flex-wrap">
        <span className="carouselTitle">Popular</span>
        <Tabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </Container>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
