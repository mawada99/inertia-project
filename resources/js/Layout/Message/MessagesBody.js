// @flow
import { styled } from "@mui/material/styles";
import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
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
import FullScreenLoading from "../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading";
import { useState } from "react";
import { useEffect } from "react";
import EmptyTableMessage from "../../Component/HOC/FunctionComponents/EmptyTableMessage";
import { Link } from "react-router-dom/cjs/react-router-dom";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
  messageBody: `${PREFIX}-messageBody`,
  actions: `${PREFIX}-actions`,
  code: `${PREFIX}-code`,
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
  [`& .${classes.messageBody}`]: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  [`& .${classes.actions}`]: {
    right: "5px"
  },
  [`& .${classes.code}`]: {
    margin: theme.spacing(0, 0.5),
    fontWeight: "800",
    whiteSpace: "nowrap"
  },
}));

const MessagesBody = (props) => {
  const { t } = useTranslation();
  // const [messagesData, setMessagesData] = useState({});

  const openedMessages =
    JSON.parse(localStorage.getItem("openedMessages")) || [];
  const firstOpen = localStorage.getItem("firstOpen");

  const { messagesData, fetchMore, loading, closeMessageBody } = props

  const [listMessagesData, setListMessagesData] = useState(messagesData);
  const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   setListMessagesData(messagesData)
  //   return () => {
  //   }
  // }, [messagesData])
  useEffect(() => {
    if (props.newMSG) {
    const data=listMessagesData.data?.filter(shipment => shipment?.shipment?.id !== props.newMSG?.shipment?.id);
      data.reverse()
      data?.push(props.newMSG)
      data.reverse()
      listMessagesData.data.length >= 20 && data.pop()
      setListMessagesData((prev) => ({ ...prev,data: data }));
    }
    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newMSG?.id])

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
      {loading && !messagesData?.data ? (
        <Grid container justifyContent="center" className={classes.loading}>
          <FullScreenLoading />
        </Grid>
      ) : messagesData?.data.length === 0 ? (
        <EmptyTableMessage
          message={t("noResult")}
        />
      ) : (
        <List aria-label="contacts" className={clsx(classes.notificationList)}>
          {listMessagesData?.data?.map((message, index) => {
            const opened = isMessageOpen(message.id, message.createdAt);
            const senderName =
              message.user?.account?.name ?? message.user?.username;

            const messageDetails = (
              <span style={{ display: "flex" }}>
                {/* <span className={classes.messageSender}>{senderName}:</span> */}
                {message.images?.length > 0 && (
                  <Image color="action" fontSize="small" />
                )}
                <span className={classes.code}>{message.shipment.code}</span>
                <span className={classes.messageBody}>{message.body}</span>
              </span>
            );

            // const pp = (
            //   <ListItem
            //     key={message.id}
            //     button
            //     className={clsx({ [classes.newNotifi]: !opened })}
            //     onClick={() => {
            //       closeMessageBody()
            //       !opened && addMessagesToOpens(message.id);
            //       pushUrl(
            //         props,
            //         `/admin/shipments/${message.shipment.id}#messages`
            //       );
            //     }}
            //   >
            //     <ListItemText
            //       primaryTypographyProps={{
            //         variant: "body1",
            //         color: "primary",
            //       }}
            //       secondaryTypographyProps={{
            //         variant: "body2",
            //         color: "textPrimary",
            //       }}
            //       className={classes.listItemText}
            //       secondary={messageDetails}
            //       primary={message.shipment.code}
            //     />
            //     <ListItemSecondaryAction>
            //       <ListItemText
            //         primaryTypographyProps={{
            //           variant: "caption",
            //         }}
            //         secondaryTypographyProps={{ variant: "caption" }}
            //         primary={message.createdAt.split(" ")[0]}
            //         secondary={message.createdAt.split(" ")[1]}
            //       />
            //     </ListItemSecondaryAction>
            //   </ListItem>
            // )

            return (
              <ListItem
                component={Link}
                className={clsx(classes.listItem)}
                to={`/admin/shipments/${message.shipment.id}#messages`}
                key={index}
                button
                sx={{ ":hover": { color: "text.primary" } }}
                onClick={() => {
                  closeMessageBody()
                  !opened && addMessagesToOpens(message.id);
                }}
              >
                <Box>
                  <Typography className={classes.messageSender} variant="body2">
                    {senderName}
                  </Typography>
                  <Typography variant="body2" color={`${!opened ? "text.primary" : "text.secondary"}`}>
                    {messageDetails}
                  </Typography>
                  <Typography variant="caption" color={`${!opened ? "text.primary" : "text.secondary"}`}>
                    {message.createdAt.split(" ")[0] + ' - ' + message.createdAt.split(" ")[1]}
                  </Typography>
                </Box>
                {!opened && <ListItemSecondaryAction className={classes.actions}>
                  <FiberManualRecordIcon fontSize="small" color="primary" />
                </ListItemSecondaryAction>
                }
              </ListItem>

            );
          })}
        </List>
      )}
      {listMessagesData.paginatorInfo?.hasMorePages && (
        <Button
          color="primary"
          variant="text"
          disabled={fetching}
          onClick={() => {
            setFetching(true)
            fetchMore({
              variables: {
                page: listMessagesData.paginatorInfo.currentPage + 1,
              },
            }).then(({ data }) => {
              setListMessagesData((prev) => ({
                paginatorInfo: data.listMessages.paginatorInfo,
                data: [...prev.data, ...data.listMessages.data],
              }));
              setFetching(false)
            })
          }
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

  const { messageDrawerAnchor, messageDrawerState, closeMessageBody, messageDrawer } = props;

  return (
    <StyledSwipeableDrawer
      disableDiscovery={true}
      disableSwipeToOpen={true}
      anchor={messageDrawerAnchor}
      open={messageDrawerState[messageDrawerAnchor]}
      onClose={closeMessageBody}
      onOpen={() => messageDrawer(messageDrawerAnchor, true)}
      dir={theme.direction}
      className={clsx(classes.notifiDrawer, {
        [classes.bottomDrawer]: messageDrawerState[messageDrawerAnchor],
      })}
      classes={{
        paper: clsx(classes.notifiDrawerPaper, {
          [classes.bottomDrawer]: messageDrawerState[messageDrawerAnchor],
        }),
      }}
    >
      <Toolbar variant="dense">
        <Typography color="inherit" variant="h6">
          {t("messages")}
        </Typography>
      </Toolbar>

      {/* {notifidrawerState[notifiAnchor] && ( */}
      <MessagesBody {...props} onSelect={closeMessageBody} />
      {/* )} */}
    </StyledSwipeableDrawer>
  );
};

NotificationBody.propTypes = {
  messageDrawerAnchor: PropTypes.any,
  messageDrawerState: PropTypes.any,
  closeMessageBody: PropTypes.any,
  messageDrawer: PropTypes.any,
};

export default withRouter(NotificationBody);
