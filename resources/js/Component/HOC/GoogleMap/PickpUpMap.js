import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "../../../assets/Image/marker.png";
export default function MapComponent(props) {
  const { setLocationValue, heightValue } = props;
  const iconUrl = marker;
  const icon = new L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const [position, setPosition] = useState(null);
  const [boolLocation, setBoolLocation] = useState(true);
  function LocationMarker(props) {
    const map = useMap();
    const handleMarkerClick = (e) => {
      const clickedPosition = e.latlng;
      map.removeLayer({});
      setLocationValue(clickedPosition); // Update the location using the callback
      setPosition(clickedPosition)
    };
    const handleCurrentLocation = (e) => {
      map.flyTo(e.latlng, map.getZoom());
      setPosition(e.latlng)
      setLocationValue(e.latlng); // Update the location using the callback
      setBoolLocation(false)
    };
    useEffect(() => {

      if (boolLocation) {
        // console.log(map.locate());
        map.locate({ setView: true, zoom: 16 }).on("locationfound", handleCurrentLocation);
      }
      return () => {

      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

      map.on("click", handleMarkerClick);

      return () => {

      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, setLocationValue]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
      </Marker>
    )
  }
  return (
    <div >
      <MapContainer
        whenCreated={(map) => {
          map.invalidateSize();
        }}
        zoom={3}
        center={[29.94579, 31.24177]}
        style={{ height: `${heightValue}`, margin: "auto" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
