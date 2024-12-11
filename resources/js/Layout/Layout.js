import React, { memo } from "react";
import { styled } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

import withErrorHandler from "../Error/withErrorHandler";
import Footer from "./Footer";

const PREFIX = 'Layout';

const classes = {
  drawerHeader: `${PREFIX}-drawerHeader`,
  mainContainer: `${PREFIX}-mainContainer`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.drawerHeader}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  [`& .${classes.mainContainer}`]: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
}));

const Layout = (props) => {


  return (
    <Root>
      <CssBaseline />

      {/* <Header /> */}
      <main className={classes.mainContainer}>
        <div className={classes.drawerHeader} />
        {props.children}
        <Footer />
      </main>
    </Root>
  );
};

export default memo(withErrorHandler(Layout));
