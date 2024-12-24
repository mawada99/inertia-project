import { Button } from "@mui/material";
import React from "react";

const FormButton = (props) => {
  return (
    <Button
      {...props}
      sx={{ width: props.width ?? "150px" }}
      color={props.color ?? "primary"}
      size="large"
      variant="contained"
      type="submit"
    >
      {props.children}
    </Button>
  );
};

export default FormButton;
