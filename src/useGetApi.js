import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetApi(url) {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        if (response.data.location) {
          setLat(response.data.location.lat);
          setLng(response.data.location.lng);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, lat, lng, error, isLoading };
}
