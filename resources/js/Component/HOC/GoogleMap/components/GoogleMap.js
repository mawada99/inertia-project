import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

// const style =
// {
//   width: "100%",
//   height: "100%"
// }
const style = {
  width: "100%",
  height: "100%",
};

const GoogleMap = ({ children, ...props }) => (
  <div sx={style}>
    <GoogleMapReact
      bootstrapURLKeys={{
        language: "ar",
        region: "EG",
        key: "AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc",
        libraries: ["places", "geometry"],
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
