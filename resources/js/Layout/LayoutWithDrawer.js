import { styled } from "@mui/material/styles";
import React, { memo, useEffect } from "react";

// import { Menu } from "@mui/icons-material";
import clsx from "clsx";
// import Header from "./Header";
import NavDrawer from "./NavDrawer";

import { withRouter } from "react-router";
import withErrorHandler from "../Error/withErrorHandler";
import useWidth, { isWidthDown } from "../Hooks/useWidth";
import Footer from "./Footer";
// import NotificationsContainer from "./Notifications/NotificationsContainer";
import withUserDataLoader from "./UserDataLoader";
// import MessageContainer from "./Message/MessagesContainer";
import { ModeContext } from "../Context/ModeContext";
import { useContext } from "react";

const PREFIX = "LayoutWithDrawer";

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  lang: `${PREFIX}-lang`,
  contentWrapper: `${PREFIX}-contentWrapper`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
  renewalContainer: `${PREFIX}-renewalContainer`,
};

const drawerWidth = 248;

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: "flex",
    position: "relative",
    // transition: "all 1s",
  },

  [`& .${classes.appBar}`]: {
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classes.drawerHeader}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  [`& .${classes.lang}`]: {
    marginLeft: theme.spacing(1),
  },

  [`& .${classes.contentWrapper}`]: {
    flexGrow: 1,
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: -drawerWidth,
    },
    position: "relative",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },

  [`& .${classes.contentShift}`]: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
    },
  },
  [`& .${classes.renewalContainer}`]: {
    width: "100%",
    position: "fixed",
    zIndex: 1068,
  },
}));

const LayoutWithDrawer = (props) => {
  const screenWidth = useWidth();
  const isScreenSmall = isWidthDown("xs", screenWidth);
  const drawerAnchor = isScreenSmall ? "bottom" : "left";
  const { navDrawer, setNavDrawer } = useContext(ModeContext);

  useEffect(() => {
    if (!localStorage.getItem("firstOpen")) {
      localStorage.setItem("firstOpen", new Date());
    }
    return () => {};
  }, []);

  const toggleDrawer = (anchor, open) => {
    setNavDrawer((prev) => ({ ...prev, [anchor]: open }));
  };

  const handleDrawerClose = () => {
    toggleDrawer(drawerAnchor, false);
  };
  return (
    <Root>
      <div className={classes.root}>
        {/* <Header top={open ? 48 : 0} MenuButton={MenuButton} Message={MessageContainer} Notification={NotificationsContainer} props={props} /> */}
        <NavDrawer
          // top={open ? 48 : 0}
          navDrawer={navDrawer}
          drawerAnchor={drawerAnchor}
          handleDrawerClose={handleDrawerClose}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: navDrawer[drawerAnchor],
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.contentWrapper}>{props.children}</div>
          <Footer />
        </main>
      </div>
    </Root>
  );
};

export default memo(
  withErrorHandler(withUserDataLoader(withRouter(LayoutWithDrawer)))
);
