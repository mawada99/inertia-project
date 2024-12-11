import {
  IconButton,
} from "@mui/material";
import React from "react";

import { useContext } from "react";

import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { ModeContext } from "../../../Context/ModeContext";


const DarkModeIcon = (props) => {
  const { darkMode, ChangeMode } = useContext(ModeContext)
  return (
    <IconButton
    aria-label="print"
    onClick={ChangeMode}>
    {darkMode ? <Brightness5Icon fontSize="inherit" />:<NightlightRoundIcon fontSize="inherit" />}
  </IconButton>
  )
};

export default DarkModeIcon;
