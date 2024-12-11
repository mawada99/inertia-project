import { styled } from "@mui/material/styles";
import React from "react";

const Root = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const HFWraper = (props) => {
  return <Root />;
};

export default HFWraper;
