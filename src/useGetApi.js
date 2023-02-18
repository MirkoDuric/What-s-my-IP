import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetApi(url) {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        if (response.data.location) {
          setLat(response.data.location.lat);
          setLng(response.data.location.lng);
        }
        console.log(lat, lng);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoading(false);
  }, []);
  return { data, lat, lng, isLoading };
}
