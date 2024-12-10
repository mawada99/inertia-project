import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ButtonLoading from "../FunctionComponents/LoadingPages/ButtonLoading";

const CustomButton = (props) => {
  const { className, loading, ...prop } = props;
  return (
    <Button
      sx={{
        backgroundColor: props?.customcolor,
        color: "#fff",
        "&:hover": {
          backgroundColor: props?.customcolor,
          "&::after": {
            content: "' '",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: "4px",
          },
          "& .MuiButton-label": {
            zIndex: 1,
          },
        },
      }}
      {...prop}
      className={className}
    >
      {!loading && props.children}
      {loading && <ButtonLoading color={props.customcolor} />}
    </Button>
  );
};

CustomButton.propTypes = {
  customcolor: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default CustomButton;
