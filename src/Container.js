import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import useGetApi from "./useGetApi";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function Container() {
  const { DateTime } = require("luxon");
  let { data, lat, lng } = useGetApi(
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

  return (
    <div className="container">
      {Object.keys(data).length ? (
        <>
          <div className="mapContainer">
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              style={{ height: "70vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              ></TileLayer>
              <Marker position={[lat, lng]}></Marker>
            </MapContainer>
          </div>
          <div className="dataContainer">
            {flag.length ? (
              <img className="flag" src={flag[0].flags.svg}></img>
            ) : null}
            <h4>Your IP address is: {data.ip}</h4>
            <p>
              You are located in: {data.location.city}, {data.location.country}
            </p>
            <p>Today's date: {DateTime.local().toFormat("HH:mm dd/MM/yyyy")}</p>
            <p>Internet provider: {data.isp} </p>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
