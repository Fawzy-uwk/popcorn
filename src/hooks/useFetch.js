import { useEffect, useState } from "react";
import { fetchData } from "../Utils/Api";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setError("Somthing went wrong");
      });
  }, [url]);
  return { data, loading, error };
};


