import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import useGetApi from "./useGetApi";
import { useState, useEffect } from "react";

export default function Container() {
  const { DateTime } = require("luxon");
  const { data, lat, lng, error, isLoading } = useGetApi(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`
  );
  const [flag, setFlag] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length) {
      fetch(`https://restcountries.com/v3.1/alpha/${data.location.country}`)
        .then((response) => response.json())
        .then((json) => setFlag(json))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      {Object.keys(data).length ? (
        <>
          <div className="mapContainer">
            <MapContainer className="map" center={[lat, lng]} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              ></TileLayer>
            </MapContainer>
          </div>
          <div className="dataContainer">
            {flag.length ? (
              <img className="flag" src={flag[0].flags.svg} alt="Flag"></img>
            ) : null}
            <div className="text-container">
              <h4>Your IP address is: {data.ip}</h4>
              <p>
                Server is located in: {data.location.city},{" "}
                {data.location.country}
              </p>
              <p>
                Today's date: {DateTime.local().toFormat("HH:mm dd/MM/yyyy")}
              </p>
              <p>Internet provider: {data.isp} </p>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
