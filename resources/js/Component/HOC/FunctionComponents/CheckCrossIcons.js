import { Icon } from "@mui/material";
import React from "react";

function CheckCrossIcons(props) {
  return props.active ? (
    <Icon color="success">check_circle_outline</Icon>
  ) : (
    <Icon color="error">highlight_off</Icon>
  );
}

export default CheckCrossIcons;
