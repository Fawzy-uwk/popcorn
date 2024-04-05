import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";
import { useSelector } from "react-redux";
import Container from "../Ui/Container";
import LazyLoadImg from "./LazyLoadImg";
import Button from "../Ui/Button";
import { useFetch } from "../hooks/useFetch";

const Content = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const H1 = styled.h1`
  font-size: 4rem;
  color: white;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }
`;

const P = styled.p`
  font-size: 18px;
  color: white;
`;
function Banner() {
  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.HomeSlice);
  const navigate = useNavigate();
  const [bg, setBg] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const background =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBg(background);
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    if (event.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  }

  return (
    <div className="banner flex-col">
      {!loading && (
        <div className="backdrop-img">
          <LazyLoadImg src={bg} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <Container className="flex items center h-full justify-center">
        <Content className="mt-12 md:mt-0">
          <H1>
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] bg-clip-text text-transparent">
              Popcorn
            </span>
          </H1>

          <P>
            Millions of movies, TV shows and people to discover. Explore now.
          </P>
          <div className="search relative w-full">
            <input
              type="text"
              className="md:h-[55px] h-[40px] px-4 text-md placeholder:text-[#11998e] rounded-full w-full focus:outline-none text-[#11998e] "
              value={query}
              onKeyUp={handleSubmit}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movie or TV show"
            />
            <Button className="absolute top-0 -right-[.8px] rounded-r-full">
              Search
            </Button>
          </div>
        </Content>
      </Container>
    </div>
  );
}

export default Banner;
