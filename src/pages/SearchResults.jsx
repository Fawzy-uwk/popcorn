import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Ui/Spinner";
import Container from "../Ui/Container";

import Card from "../Ui/Card";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { fetchData } from "../Utils/Api";

function SearchResults() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResults">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <Container>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return <Card key={index} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <Container className="flex items-center justify-center "><span className="resultNotFound ">Sorry, Results not found!</span></Container>
          )}
        </Container>
      )}
    </div>
  );
}

export default SearchResults;
