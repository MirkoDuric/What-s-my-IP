import { useState, useEffect } from "react";

export default function useGetFlag(url) {
  const [flag, setFlag] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setFlag(json))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(flag);
  return { flag };
}
