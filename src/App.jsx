import { useEffect } from "react";

import { fetchData } from "./Utils/Api";
import { useDispatch } from "react-redux";
import { ApiConfig, getGenres } from "./store/HomeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";

import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    testData();
    genresCall()
  });
  const testData = () => {
    fetchData("/configuration").then((res) => {
      
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(ApiConfig(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchData(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/:mediaType/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
