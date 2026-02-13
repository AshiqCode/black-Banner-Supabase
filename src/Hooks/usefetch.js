import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [Ispending, setIspending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIspending(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIspending(false);
      })
      .catch((err) => {
        console.log("TEST", err);
        setError(true);
        setIspending(false);
      });
  }, [url]);
  return { data, setData, Ispending, error };
};

export default useFetch;
