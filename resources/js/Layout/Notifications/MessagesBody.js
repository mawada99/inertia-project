// @flow
import { gql, useQuery } from "@apollo/client";
import { styled } from "@mui/material/styles";
import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as React from "react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import { pushUrl } from "../../Component/HOC/CustomFunctions/pushUrl";
import FullScreenLoading from "../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading";
import { LIST_MESSAGES } from "./Graphql";
import { useState } from "react";
import { useEffect } from "react";
import EmptyTableMessage from "../../Component/HOC/FunctionComponents/EmptyTableMessage";

const PREFIX = "MessagesBody";

const classes = {
  listItemIcon: `${PREFIX}-listItemIcon`,
  listItemText: `${PREFIX}-listItemText`,
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  newNotifi: `${PREFIX}-newNotifi`,
  notificationList: `${PREFIX}-notificationList`,
  loading: `${PREFIX}-loading`,
  bottomDrawer: `${PREFIX}-bottomDrawer`,
  notifiDrawer: `${PREFIX}-notifiDrawer`,
  notifiDrawerPaper: `${PREFIX}-notifiDrawerPaper`,
  messageSender: `${PREFIX}-messageSender`,
};

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  [`& .${classes.listItemIcon}`]: {
    minWidth: 48,
  },

  [`& .${classes.listItemText}`]: {
    paddingRight: theme.spacing(4),
  },

  [`& .${classes.success}`]: {
    color: theme.palette.success.main,
  },

  [`& .${classes.error}`]: {
    color: theme.palette.error.main,
  },

  [`& .${classes.newNotifi}`]: {
    "&::after": {
      backgroundColor: theme.palette.primary.main,
      position: "absolute",
      opacity: " 5%",
      width: "100%",
      content: "''",
      height: "100%",
      top: 0,
      left: 0,
    },
  },

  [`& .${classes.notificationList}`]: {
    padding: 0,
  },

  [`& .${classes.loading}`]: {
    paddingTop: theme.spacing(8),
  },

  [`&.${classes.bottomDrawer}`]: {
    [theme.breakpoints.down("sm")]: {
      width: "auto !important",
      height: "100%",
    },
  },

  [`&.${classes.notifiDrawer}`]: {
    [theme.breakpoints.up("sm")]: {
      width: 360,
      flexShrink: 0,
    },
  },

  [`& .${classes.notifiDrawerPaper}`]: {
    zIndex: 1090,
    backgroundColor: theme.palette.background.default,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 360,
    },
    // overflow: "hidden"
  },

  [`& .${classes.messageSender}`]: {
    paddingRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const MessagesBody = (props) => {
  const { t } = useTranslation();
  const [messagesData, setMessagesData] = useState({});
  const openedMessages =
    JSON.parse(localStorage.getItem("openedMessages")) || [];
  const firstOpen = localStorage.getItem("firstOpen");

  useEffect(() => {
    if (props.newMSG) {
      const data = messagesData.data
      data.reverse()
      data?.push(props.newMSG)
      data.reverse()
      data.pop()
      setMessagesData((prev) => ({ ...prev, ...data }));
    }
    return () => {
    }
  }, [props.newMSG?.id])

  const {
    data: notifications,
    fetchMore,
    loading: notifiLoad,
  } = useQuery(
    gql`
      ${LIST_MESSAGES.query}
    `,
    {
      variables: {
        first: 10,
        page: 1,
        receivedOnly: true,
      },
      skip: Boolean(props.newMSG),
      // notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      // nextFetchPolicy: "no-cache",
      onCompleted: (data) => {
        setMessagesData((prev) => ({ ...prev, ...data.listMessages }));
        localStorage.setItem("messagesNotifications", new Date());
      },
    }
  );

  const isMessageOpen = (id, messageDate) =>
    new Date(messageDate) < new Date(firstOpen) ||
    openedMessages.some((i) => i === id);

  const addMessagesToOpens = (id) => {
    const updatedUserMessages = [...openedMessages];
    updatedUserMessages.push(id);

    localStorage.setItem("openedMessages", JSON.stringify(updatedUserMessages));
  };

  return (
    <Fragment>
      {notifiLoad ? (
        <Grid container justifyContent="center" className={classes.loading}>
          <FullScreenLoading />
        </Grid>
      ) : notifications?.listMessages?.data.length === 0 ? (
        <EmptyTableMessage
          message={t("noResult")}
        />
      ) : (
        <List aria-label="contacts" className={clsx(classes.notificationList)}>
          {messagesData?.data?.map((message, index) => {
            const opened = isMessageOpen(message.id, message.createdAt);
            const senderName =
              message.user?.account?.name ?? message.user?.username;

            const messageDetails = (
              <span style={{ display: "flex" }}>
                <span className={classes.messageSender}>{senderName}:</span>
                {message.image ? (
                  <Image color="action" fontSize="small" />
                ) : (
                  <span>{message.body}</span>
                )}
              </span>
            );

            return (
              <ListItem
                key={message.id}
                button
                className={clsx({ [classes.newNotifi]: !opened })}
                onClick={() => {
                  !opened && addMessagesToOpens(message.id);
                  pushUrl(
                    props,
                    `/admin/shipments/${message.shipment.id}#messages`
                  );
                }}
              >
                {/* <ListItemIcon className={classes.listItemIcon}>
                  <Typography variant="h6" color="primary">
                    {}
                  </Typography>
                </ListItemIcon> */}
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                    color: "primary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "textPrimary",
                  }}
                  className={classes.listItemText}
                  secondary={messageDetails}
                  primary={message.shipment.code}
                />
                <ListItemSecondaryAction>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "caption",
                    }}
                    secondaryTypographyProps={{ variant: "caption" }}
                    primary={message.createdAt.split(" ")[0]}
                    secondary={message.createdAt.split(" ")[1]}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
      {messagesData.paginatorInfo?.hasMorePages && (
        <Button
          color="primary"
          variant="text"
          onClick={() =>
            fetchMore({
              variables: {
                page: messagesData.paginatorInfo.currentPage + 1,
              },
            }).then(({ data }) => {
              // console.log([...messagesData.data, ...data.listMessages.data]);
              setMessagesData((prev) => ({
                paginatorInfo: data.listMessages.paginatorInfo,
                data: [...prev.data, ...data.listMessages.data],
              }));
            })
          }
        >
          {t("more")}
        </Button>
      )}
    </Fragment>
  );
};

const NotificationBody = (props) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const { notifiAnchor, notifidrawerState, closeNotifi, notifiDrawer } = props;

  return (
    <StyledSwipeableDrawer
      disableDiscovery={true}
      disableSwipeToOpen={true}
      anchor={notifiAnchor}
      open={notifidrawerState[notifiAnchor]}
      onClose={closeNotifi}
      onOpen={() => notifiDrawer(notifiAnchor, true)}
      dir={theme.direction}
      className={clsx(classes.notifiDrawer, {
        [classes.bottomDrawer]: notifidrawerState[notifiAnchor],
      })}
      classes={{
        paper: clsx(classes.notifiDrawerPaper, {
          [classes.bottomDrawer]: notifidrawerState[notifiAnchor],
        }),
      }}
    >
      <Toolbar variant="dense">
        <Typography color="inherit" variant="h6">
          {t("messages")}
        </Typography>
      </Toolbar>

      {/* {notifidrawerState[notifiAnchor] && ( */}
      <MessagesBody {...props} onSelect={closeNotifi} />
      {/* )} */}
    </StyledSwipeableDrawer>
  );
};

NotificationBody.propTypes = {
  notifiAnchor: PropTypes.any,
  notifidrawerState: PropTypes.any,
  closeNotifi: PropTypes.any,
  notifiDrawer: PropTypes.any,
};

export default withRouter(NotificationBody);
