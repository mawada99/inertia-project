import {
  IconButton,
} from "@mui/material";
import React from "react";
import { ModeContext } from "../../../Context/ModeContext";
import { useContext } from "react";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";


const DarkModeIcon = (props) => {
  const { darkMode, ChangeMode } = useContext(ModeContext)
  return (
    <IconButton
      aria-label="print"
      onClick={ChangeMode}>
      {darkMode ? <MdLightMode fontSize="inherit" /> :
        <MdOutlineDarkMode fontSize="inherit" />}
    </IconButton>
  )
};

export default DarkModeIcon;
