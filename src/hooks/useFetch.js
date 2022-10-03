import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    controller.abort();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetch;
