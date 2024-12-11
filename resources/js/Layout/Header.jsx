import { AppBar, Badge, Grid, IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { memo, useContext, useState } from "react";

import { Fragment } from "react";
import { Link } from "@inertiajs/react";
// import GlobalSearch from "../Component/GlobalSearch/GlobalSearch";
// import LogoImg from "./LogoImg";


// import NotificationContainer from "./Notifications/NotificationsContainer";
// import MessageContainer from "./Message/MessagesContainer";
// import useWidth, { isWidthDown } from "../Hooks/useWidth";
import { Message, Notifications } from "@mui/icons-material";
import { ModeContext } from "../Context/ModeContext";
import LogoImg from "./LogoImg";
import useWidth, { isWidthDown } from "../useWidth";
import AvatarComponent from "./Avatar";

const PREFIX = "Header";

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  lang: `${PREFIX}-lang`,
  centerItems: `${PREFIX}-centerItems`,
  logoImg: `${PREFIX}-logoImg`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
  },

  [`& .${classes.appBar}`]: {
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0.5),
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

  [`& .${classes.centerItems}`]: {
    display: "flex",
    alignItems: "center",
  },

  [`& .${classes.logoImg}`]: {
    maxHeight: 48,
    marginLeft: theme.spacing(1),
  },
}));

const Header = (props) => {
  const { MenuButton } = props;

  const screenWidth = useWidth();
  const addDashboardIcons = isWidthDown("sm", screenWidth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [badge, setBadge] = useState({
    notification: "true",
    message: "true",
  });

  // notification content
  const [newArrival, setNewArrival] = useState(false);
  const isScreenSmall = isWidthDown("xs", screenWidth);
  const drawerAnchor = isScreenSmall ? "bottom" : "right";

  const [notificationDrawerState, setNotificationDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const notificationDrawer = (anchor, open) => {
    setNotificationDrawerState({ ...notificationDrawerState, [anchor]: open });
  };

  const notificationIcon = (
    <IconButton
      sx={{ p: 1 }}
      onClick={() => {
        notificationDrawer(drawerAnchor, true);
        localStorage.setItem("notifications", new Date());
        handleCloseMenu();
      }}
      size="large"
    >
      <Badge
        color="primary"
        variant="dot"
        invisible={!newArrival}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Notifications color="action" />
      </Badge>
    </IconButton>
  );

  // message content
  const { hasMessagesPermission } = useContext(ModeContext);
  const [newMessageArrival] = useState(false);
  const [messageDrawerState, setMessageDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const messageDrawer = (anchor, open) => {
    setMessageDrawerState({ ...messageDrawerState, [anchor]: open });
  };

  const messageIcon = hasMessagesPermission && (
    <IconButton
      sx={{ p: 1 }}
      onClick={() => {
        messageDrawer(drawerAnchor, true);
        localStorage.setItem("messages", new Date());
        handleCloseMenu();
      }}
      size="large"
    >
      <Badge
        color="primary"
        variant="dot"
        invisible={!newMessageArrival}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Message color="action" />
      </Badge>
    </IconButton>
  );

  return (
    <Root className={classes.root}>
      <Fragment>
        {/* <NotificationContainer
          newArrival={newArrival}
          setNewArrival={setNewArrival}
          notificationDrawer={notificationDrawer}
          notificationDrawerAnchor={drawerAnchor}
          notificationDrawerState={notificationDrawerState}
          setBadge={setBadge}
        /> */}

        {/* {hasMessagesPermission && (
          // <MessageContainer
          //   newArrival={newMessageArrival}
          //   setNewArrival={setNewMessageArrival}
          //   messageDrawer={messageDrawer}
          //   messageDrawerAnchor={drawerAnchor}
          //   messageDrawerState={messageDrawerState}
          //   setBadge={setBadge}
          // />
        )} */}

        <AppBar
          position="fixed"
          className={classes.appBar}
          sx={{ top: props.top }}
        >
          <Toolbar sx={{ padding: 0 }}>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} className={classes.centerItems}>
                {MenuButton && <MenuButton />}
                <Link to={true? "/" : "/admin"}>
                  <LogoImg className={classes.logoImg} />
                </Link>
              </Grid>

              <Grid
                item
                xs={6}
                container
                justifyContent="flex-end"
                className={classes.centerItems}
              >
                <Grid>
                  {/* {!addDashboardIcons && <GlobalSearch props={props.props} />} */}
                  {!addDashboardIcons && notificationIcon}
                  {!addDashboardIcons && messageIcon}
                  <AvatarComponent
                    addDashboardIcons={addDashboardIcons}
                    notificationIcon={notificationIcon}
                    messageIcon={messageIcon}
                    badge={badge}
                    open={open}
                    handleClick={handleClick}
                    handleCloseMenu={handleCloseMenu}
                    anchorEl={anchorEl}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* <div className={classes.drawerHeader} /> */}
      </Fragment>
    </Root>
  );
};

export default memo(Header);
