import Banner from "../Components/Banner";
import Popular from "../Components/Popular";
import TopRated from "../Components/TopRated";
import Trending from "../Components/Trending";

function Home() {
  return (
    <>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
}

export default Home;
