import React from "react";
import { useTheme } from '@mui/material/styles';
import * as Spinners from "react-spinners";

export default function CustomSpinner(props) {
  const { name } = props;
  const color = useTheme().palette.primary.main;
  const { [name]: Spinner } = Spinners;
  return <Spinner color={props.color ?? color} {...props} />;
}
