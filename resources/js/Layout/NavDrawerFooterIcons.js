// @flow
import { styled } from '@mui/material/styles';
import * as React from "react";
import LanguageIcons from "../Component/HOC/CustomComponents/LanguageIcons";
import { Box } from '@mui/material';
import DarkModeIcon from '../Component/HOC/CustomComponents/DarkModeIcon';

const PREFIX = 'Footer-Icons';

const classes = {
  root: `${PREFIX}-root`,
  menu: `${PREFIX}-menu`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  avatar: `${PREFIX}-avatar`,
  listItemText: `${PREFIX}-listItemText`,
  listItem: `${PREFIX}-listItem`
};

const Root = styled("div")((
  {
    theme
  }
) => ({
  height: 38,
  display: "flex",
  justifyContent: "start",
  padding: theme.spacing(0, 0.5),
  [`& .${classes.root}`]: {
    // margin: "0 auto 0 0",
  },

  [`& .${classes.menu}`]: {
    direction: theme.direction,
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },

  [`& .${classes.avatar}`]: {
    "&:focus": {
      border: "none",
    },
    textAlign: "center",
    justifyContent: "center",
    boxShadow: "none",
    width: "250px",
    borderBottom: "1px solid #00000054",
    borderRadius: "0",
    padding: theme.spacing(2),
  },

  [`& .${classes.listItemText}`]: {
    "& span": {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },

  [`& .${classes.listItem}`]: {

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }
}));

const FooterIcons = (props) => {
  return (
    <Root>
      <Box sx={{ mx: 0.5 }}>
        <LanguageIcons />
      </Box>
      <Box component="span" sx={{ mx: 0.5 }}>
        <DarkModeIcon />
      </Box>
    </Root>
  );
};

export default FooterIcons;
