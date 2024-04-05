import styled from "styled-components";
import { FaBars, FaSearch, FaFilm, FaTimes } from "react-icons/fa";

import Container from "../Ui/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const A = styled.a`
  text-decoration: none;
  color: white;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #11998e;
  }
`;

const Logo = styled.a`
  background: linear-gradient(to right, #11998e, #38ef7d);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  gap: 5px;
`;
function Header() {
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrollState, setScrollState] = useState("top");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const controlNav = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > scrollY && !show) {
          setScrollState("hide");
        } else {
          setScrollState("show");
        }
      } else {
        setScrollState("top");
      }
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNav);
    return () => window.removeEventListener("scroll", controlNav);
  }, [scrollState, scrollY, show]);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 0) {
      navigate(`search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
    setQuery("");
  }

  const search = () => {
    setShowSearch((showSearch) => !showSearch);
    setShow(false);
  };
  return (
    <header
      className={`${
        !show
          ? "h-[4.2rem] md:h-[4.2rem] py-4 w-full flex flex-col items-start justify-between bg-[rgba(0,0,0,.5)] z-50"
          : "md:h-20 h-full w-full flex items-start flex-col py-4  divide-y divide-green-700 justify-between relative md:bg-[rgba(0,0,0,.5)] bg-[rgba(0,0,0)] z-50"
      } ${scrollState}`}
    >
      <Container className="flex items-center h-full justify-between relative">
        <Logo onClick={() => navigate("/")}>
          <div className="movie w-14 h-14 md:w-14 md:h-14 rounded-full p-2 flex items-center justify-center">
            <FaFilm className="" size={32} color="white" />
          </div>
          Popcorn
        </Logo>
        <ul className="flex items-center gap-4 flex-row-reverse md:flex-row ">
          <A
            className="hidden md:block"
            onClick={() => {
              navigate("/explore/movie");
              setShow(false);
            }}
          >
            movies
          </A>
          <A
            className="hidden md:block"
            onClick={() => {
              navigate("/explore/tv");
              setShow(false);
            }}
          >
            TV Shows
          </A>
          {!show ? (
            <FaBars
              className="md:hidden"
              onClick={() => {
                setShow((show) => !show);
                setShowSearch(false);
              }}
              size={25}
              color="white"
            />
          ) : (
            <FaTimes
              className="md:hidden"
              onClick={() => setShow((show) => !show)}
              size={25}
              color="white"
            />
          )}
          <FaSearch
            onClick={search}
            color="white"
            className="cursor-pointer"
            size={22}
            stroke={2}
          />
        </ul>

        <div
          className={
            show
              ? "menu w-full flex items-start absolute top-[64px] left-0 border-t border-t-green-700 flex-col gap-3 py-3 px-6 md:hidden bg-black"
              : "menu w-full hidden"
          }
        >
          <A
            className=""
            onClick={() => {
              navigate("/explore/movie");
              setShow(false);
            }}
          >
            movies
          </A>
          <A
            className=""
            onClick={() => {
              navigate("/explore/tv");
              setShow(false);
            }}
          >
            TV Shows
          </A>
        </div>
      </Container>

      {!show && showSearch && (
        <div className="absolute w-full left-0 top-[4.2rem] px-[.1rem]">
          <Container>
            <form
              onSubmit={handleSubmit}
              className="Sbar w-full relative flex items-center"
            >
              <input
                type="text"
                className="md:h-[55px] h-[40px] px-2 w-full rounded-md text-md placeholder:text-[#11998e] focus:outline-none text-[#11998e]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="query"
                placeholder="Search for movie or TV show"
              />
              <FaTimes
                className="shrink-0 top-5 mr-2 cursor-pointer"
                size={20}
                onClick={() => setShowSearch(false)}
              />
            </form>
          </Container>
        </div>
      )}
    </header>
  );
}

export default Header;
