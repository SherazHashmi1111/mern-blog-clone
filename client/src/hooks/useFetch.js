import { useState, useEffect } from "react";

const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(
            `Error: ${response.statusText}, Status: ${response.status}`
          );
        }

        setData(resData);
        setError(null);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;
