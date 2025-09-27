import { useEffect, useState } from "react";

// ✅ Custom hook for fetching data
const useFetch = (url, options = {}, dependencies = []) => {
  if (!url) return; // ✅ don't run fetch until url is valid
  // state for data, loading, and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ run effect whenever dependencies change
  useEffect(() => {
    // define an async function inside useEffect
    const fetchData = async () => {
      setLoading(true); // start loading
      try {
        const response = await fetch(url, options);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(
            `Error: ${response.statusText}, Status: ${response.status}`
          );
        }

        setData(resData); // ✅ success → save data
        setError(null); // clear previous error if any
      } catch (err) {
        setError(err.message || "Something went wrong"); // save error
      } finally {
        setLoading(false); // stop loading in all cases
      }
    };

    // call the async function
    fetchData();
  }, dependencies); // dependencies decide when effect runs

  // return values so component can use them
  return { data, loading, error };
};

export default useFetch;