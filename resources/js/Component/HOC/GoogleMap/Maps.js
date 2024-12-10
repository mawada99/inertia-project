import React, { memo, useEffect, useState } from "react";
import { isEmpty } from "lodash";
// components:

// examples:
import GoogleMap from "./components/GoogleMap";
import AutocompleteMap from "./components/SearchBox";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";
import * as ELG from "esri-leaflet-geocoder";

// consts
let Map;
let mark;
let latCoords;
let lngCoords;

const buttonStyle = {
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
  backgroundColor: "white",
  borderRadius: "2px",
  padding: "0",
  margin: "5px 10px",
  minWidth: "40px",
  height: "40px",
};

let mapTimer;
const Maps = (props) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      latCoords = coords.latitude;
      lngCoords = coords.longitude;
    });

    return () => {
      clearTimeout(mapTimer);
    };
  }, []);
  const [state, setState] = useState({
    mapApiLoaded: false,
    places: null,
    onTilesLoaded: false,
  });

  const { onTilesLoaded, mapApiLoaded, places } = state;
  useEffect(() => {
    if (props.zoneName.zone || props.zoneName.subzone) {
      new ELG.Geocode()
        .address(`${props.zoneName.zone},${props.zoneName.subzone}`)
        .run(function (err, results, respose) {
          if (err) {
            console.log(err);
            return;
          }

          if (results) {
            setState((prevState) => {
              return {
                ...prevState,
                places: [
                  results.results[0]?.latlng.lat,
                  results.results[0]?.latlng.lng,
                ],
              };
            });
          }
        });
    }
  }, [props.zoneName]);

  useEffect(() => {
    if (places !== null && mark) {
      mark.setPosition({ lat: places[0], lng: places[1] });
      mark.setMap(Map);
      props.location(places[0], places[1]);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const addPlace = (place) => {
    setState({ ...state, places: [place.lat, place.lng] });
  };

  const onLoading = ({ map, maps }) => {
    const autoAddress = document.getElementById("AutocompleteAddress");
    map.controls[maps.ControlPosition.TOP_LEFT].push(autoAddress);

    const saveButton = document.getElementById("saveButton");
    map.controls[maps.ControlPosition.LEFT_BOTTOM].push(saveButton);

    setState({ ...state, mapApiLoaded: true });

    Map = map;
    mark = new maps.Marker({
      position: { lat: map.center.lat(), lng: map.center.lng() },
      map,
    });
  };
  const onClick = (e) => {
    // setState({ ...state, places: [e.lat, e.lng] });
    props.location(e.lat, e.lng);
    mark.setPosition({ lat: e.lat, lng: e.lng });
    mark.setMap(Map);
  };
  return (
    <>
      <AutocompleteMap
        display={onTilesLoaded}
        latlng={(place) => addPlace(place)}
      />

      <Button
        onClick={props.saveLocation}
        variant="contained"
        id="saveButton"
        sx={{ ...buttonStyle, display: !onTilesLoaded ? "none" : null }}
      >
        <Done color="primary" />
      </Button>

      <GoogleMap
        onTilesLoaded={() => {
          clearTimeout(mapTimer);

          mapTimer = setTimeout(() => {
            setState({ ...state, onTilesLoaded: true });
          }, 500);
        }}
        defaultZoom={15}
        // defaultCenter={}
        center={
          (!isEmpty(places) && [places[0], places[1]]) || [latCoords, lngCoords]
        }
        bootstrapURLKeys={{
          key: "AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc",
          libraries: ["places", "geometry"],
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onLoading}
        onClick={mapApiLoaded ? onClick : null}
      ></GoogleMap>
    </>
  );
};

export default memo(Maps);
