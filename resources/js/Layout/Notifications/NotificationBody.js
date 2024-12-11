// @flow
import {
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CampaignIcon from "@mui/icons-material/Campaign";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import * as React from "react";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import clsx from "clsx";
import { Fragment } from "react";
import { useEffect } from "react";
import FullScreenLoading from "../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import { READ_NOTIFICATION } from "./Graphql";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import EmptyTableMessage from "../../Component/HOC/FunctionComponents/EmptyTableMessage";
import { Box } from "@mui/system";
import AlertView from "./AlertView";
import ImageIcon from "@mui/icons-material/Image";

function hexToRgb(hex) {
  // Remove the '#' symbol if it's present
  hex = hex.replace(/^#/, "");

  // Parse the hex color value to RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

const PREFIX = "NotificationBody";

const classes = {
  listItemIcon: `${PREFIX}-listItemIcon`,
  listItemText: `${PREFIX}-listItemText`,
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  listItem: `${PREFIX}-listItem`,
  notificationList: `${PREFIX}-notificationList`,
  loading: `${PREFIX}-loading`,
  bottomDrawer: `${PREFIX}-bottomDrawer`,
  notificationDrawer: `${PREFIX}-notificationDrawer`,
  notificationDrawerPaper: `${PREFIX}-notificationDrawerPaper`,
  alertSent: `${PREFIX}-alertSent`,
  actions: `${PREFIX}-actions`,
  colorSecondary: `${PREFIX}-colorSecondary`,
  info: `${PREFIX}-info`,
  warning: `${PREFIX}-warning`,
  listItemAlert: `${PREFIX}-listItemAlert`,
  messageAlert: `${PREFIX}-messageAlert`,
};

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  [`& .${classes.listItemIcon}`]: {
    minWidth: 35,
  },

  [`& .${classes.success}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.listItem}`]: {
    paddingRight: "30px",
  },

  [`& .${classes.listItemAlert}`]: {
    paddingRight: "47px",
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

  [`&.${classes.notificationDrawer}`]: {
    [theme.breakpoints.up("sm")]: {
      width: 360,
      flexShrink: 0,
    },
  },

  [`& .${classes.notificationDrawerPaper}`]: {
    zIndex: 1090,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      width: 360,
    },
  },

  [`& .${classes.alertSent}`]: {
    fontWeight: "800",
  },

  [`& .${classes.actions}`]: {
    right: "5px",
  },

  [`& .${classes.colorSecondary}`]: {
    color: theme.palette.text.secondary,
  },

  [`& .${classes.info}`]: {
    backgroundColor: `rgba(${hexToRgb(theme.palette.info.main)}, 0.3)`, // Adding 0.5 opacity
  },

  [`& .${classes.warning}`]: {
    backgroundColor: `rgba(${hexToRgb(theme.palette.error.main)}, 0.3)`, // Adding 0.5 opacity
  },

  [`& .${classes.messageAlert}`]: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
}));

function processLink(type, typeCode) {
  if (["REQUEST_CREATED"].includes(type)) {
    return "requests";
  } else if (
    [
      "SHIPMENT_STATUS_UPDATED",
      "SHIPMENT_UPDATED",
      "SHIPMENT_MESSAGE_CREATED",
      "SHIPMENT_CANCELLED",
    ].includes(type)
  ) {
    return "shipments";
  } else if (
    ["WAREHOUSE_PICKUP_CREATED", "WAREHOUSE_PICKUP_STATUS_UPDATED"].includes(
      type
    )
  ) {
    return "warehouse-pickups";
  } else if (
    [
      "TICKET_CREATED",
      "TICKET_ASSIGNED",
      "TICKET_REPLY_CREATED",
      "TICKET_STATUS_UPDATED",
    ].includes(type)
  ) {
    return "crm/tickets";
  } else if (
    ["CUSTOMER_REQUEST_CREATED", "CUSTOMER_REQUEST_STATUS_UPDATED"].includes(
      type
    )
  ) {
    return "customer-requests";
  } else if (["REGISTRATION_APPROVED", "REGISTRATION_CREATED"].includes(type)) {
    return "registrations";
  } else if (["DELIVERY_AGENT_REVIEWED"].includes(type)) {
    return "delivery-agents";
  } else if (["CONCIERGE_REQUEST_STATUS_UPDATED"].includes(type)) {
    return "concierge-request";
  } else if (
    ["OPERATION_APPROVED"].includes(type) &&
    ["RCVD", "PCKD"].includes(typeCode)
  ) {
    return "requests";
  } else if (
    ["OPERATION_APPROVED"].includes(type) &&
    ["UNLOADING", "LOADING", "ARRIVED", "DELIVERED"].includes(typeCode)
  ) {
    return "shipments";
  } else {
    return false;
  }
}

function processId(data) {
  if (data.subject === "TICKET_REPLY_CREATED") {
    return data.ticketId;
  } else if (
    ["REGISTRATION_APPROVED", "REGISTRATION_CREATED"].includes(data.subject)
  ) {
    return data.customerTypeCode;
  } else if (["DELIVERY_AGENT_REVIEWED"].includes(data.subject)) {
    return data.deliveryAgentId;
  } else {
    return data.id;
  }
}

const NotificationsList = (props) => {
  const { t } = useTranslation();
  const { notificationData, fetchMore, loading, closeNotification } = props;
  const [messagesData, setMessagesData] = useState(notificationData);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setMessagesData(notificationData);
    return () => {};
  }, [notificationData]);

  useEffect(() => {
    if (props.newMSG) {
      const data = messagesData.data;
      data.reverse();
      data?.push(props.newMSG);
      data.reverse();
      !(messagesData.data.length < 21) && data.pop();
      setMessagesData((prev) => ({ ...prev, ...data }));
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newMSG?.id]);

  const [readNotificationMutation] = useMutation(
    gql`
      ${READ_NOTIFICATION.query}
    `
  );

  const readNotificationFun = (id) => {
    readNotificationMutation({
      variables: {
        id: id,
      },
    })
      .then((data) => {
        const notificationRead = messagesData.data.find(
          (el) => el.id === data.data.readNotification.id
        );
        notificationRead.readAt = data.data.readNotification.readAt;
      })
      .catch(({ graphQLErrors }) => {});
  };

  const [openAlertView, setOpenAlertView] = React.useState(false);
  const [dialogType, setDialogType] = React.useState();
  const [alertData, setAlertData] = React.useState();

  const handleClickOpen = () => {
    setOpenAlertView(true);
  };

  const handleClose = () => {
    setOpenAlertView(false);
  };

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        open={openAlertView}
        maxWidth={"xs"}
        fullWidth
      >
        <AlertView data={alertData} dialogType={dialogType} />
      </Dialog>
      {loading && !notificationData?.data ? (
        <Grid container justifyContent="center" className={classes.loading}>
          <FullScreenLoading />
        </Grid>
      ) : notificationData?.data?.length === 0 ? (
        <EmptyTableMessage message={t("noResult")} />
      ) : (
        <List aria-label="contacts" className={clsx(classes.notificationList)}>
          {messagesData?.data?.map((item, index) => {
            const NotificationData = JSON.parse(item.data);

            return NotificationData.subject === "EXPORT" ? (
              <ListItem
                className={classes.listItem}
                key={index}
                button
                onClick={() => {
                  closeNotification();
                  if (!item.readAt) {
                    readNotificationFun(item.id);
                    window.location.replace(NotificationData.url);
                  }
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DownloadIcon
                    className={clsx(
                      { [classes.success]: !item.readAt },
                      { [classes.colorSecondary]: item.readAt }
                    )}
                  />
                </ListItemIcon>
                <Box>
                  <Typography
                    variant="body2"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {NotificationData.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {item.createdAt.split(" ")[0] +
                      " - " +
                      item.createdAt.split(" ")[1]}
                  </Typography>
                </Box>
                {!item.readAt && (
                  <ListItemSecondaryAction className={classes.actions}>
                    <FiberManualRecordIcon fontSize="small" color="primary" />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ) : NotificationData.subject === "ALERT_SENT" ? (
              <ListItem
                button
                onClick={() => {
                  setAlertData(item);
                  setDialogType("alert");
                  handleClickOpen();
                  if (!item.readAt) {
                    readNotificationFun(item.id);
                  }
                }}
                className={clsx(
                  classes.listItemAlert,
                  classes[NotificationData.typeCode.toLowerCase()]
                )}
                key={index}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <CampaignIcon />
                </ListItemIcon>
                <Box>
                  <Typography
                    variant="body2"
                    color={"text.primary"}
                    className={clsx(classes.messageAlert, {
                      [classes.alertSent]:
                        NotificationData.subject === "ALERT_SENT",
                    })}
                  >
                    {NotificationData.title}
                  </Typography>
                  <Typography variant="caption" color={"text.primary"}>
                    {item.createdAt.split(" ")[0] +
                      " - " +
                      item.createdAt.split(" ")[1]}
                  </Typography>
                </Box>
                <ListItemSecondaryAction className={classes.actions}>
                  {NotificationData.image && (
                    <ImageIcon
                      fontSize="small"
                      className={classes.colorSecondary}
                    />
                  )}
                  {!item.readAt && (
                    <FiberManualRecordIcon
                      fontSize="small"
                      color="primary"
                      sx={{ ml: "5px" }}
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ) : NotificationData.subject === "DELIVERY_AGENT_REVIEWED" ? (
              <ListItem
                button
                onClick={() => {
                  setAlertData(item);
                  setDialogType("review");
                  handleClickOpen();
                  if (!item.readAt) {
                    readNotificationFun(item.id);
                  }
                }}
                key={index}
                className={clsx(classes.listItem)}
                sx={{ ":hover": { color: "text.primary" } }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <RemoveIcon
                    className={clsx({ [classes.success]: !item.readAt })}
                  />
                </ListItemIcon>
                <Box>
                  <Typography
                    variant="body2"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {NotificationData.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {item.createdAt.split(" ")[0] +
                      " - " +
                      item.createdAt.split(" ")[1]}
                  </Typography>
                </Box>
                {!item.readAt && (
                  <ListItemSecondaryAction className={classes.actions}>
                    <FiberManualRecordIcon fontSize="small" color="primary" />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ) : (
              <ListItem
                component={
                  processLink(
                    NotificationData.subject,
                    NotificationData.typeCode
                  )
                    ? Link
                    : "div"
                }
                className={clsx(classes.listItem)}
                to={
                  processLink(
                    NotificationData.subject,
                    NotificationData.typeCode
                  )
                    ? `/admin/` +
                      processLink(
                        NotificationData.subject,
                        NotificationData.typeCode
                      ) +
                      "/" +
                      processId(NotificationData)
                    : ""
                }
                key={index}
                button
                sx={{ ":hover": { color: "text.primary" } }}
                onClick={() => {
                  closeNotification();
                  if (!item.readAt) {
                    readNotificationFun(item.id);
                  }
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <RemoveIcon
                    className={clsx({ [classes.success]: !item.readAt })}
                  />
                </ListItemIcon>
                <Box>
                  <Typography
                    variant="body2"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {NotificationData.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={`${
                      !item.readAt ? "text.primary" : "text.secondary"
                    }`}
                  >
                    {item.createdAt.split(" ")[0] +
                      " - " +
                      item.createdAt.split(" ")[1]}
                  </Typography>
                </Box>
                {!item.readAt && (
                  <ListItemSecondaryAction className={classes.actions}>
                    <FiberManualRecordIcon fontSize="small" color="primary" />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
        </List>
      )}
      {messagesData.paginatorInfo?.hasMorePages && (
        <Button
          color="primary"
          variant="text"
          disabled={fetching}
          onClick={() => {
            setFetching(true);
            fetchMore({
              variables: {
                page: messagesData.paginatorInfo?.currentPage + 1,
              },
              // updateQuery: (prev, { fetchMoreResult }) => {
              //   fetchMoreResult.listNotifications["data"] = [
              //     ...prev.listNotifications.data,
              //     ...fetchMoreResult.listNotifications.data,
              //   ];
              //   return fetchMoreResult;
              // },
            }).then(({ data }) => {
              setMessagesData((prev) => ({
                paginatorInfo: data.listNotifications.paginatorInfo,
                data: [...prev.data, ...data.listNotifications.data],
              }));
              setFetching(false);
            });
          }}
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

  const {
    notificationDrawerAnchor,
    notificationDrawerState,
    closeNotification,
    notificationDrawer,
  } = props;

  return (
    <StyledSwipeableDrawer
      disableDiscovery={true}
      disableSwipeToOpen={true}
      anchor={notificationDrawerAnchor}
      open={notificationDrawerState[notificationDrawerAnchor]}
      onClose={closeNotification}
      onOpen={() => notificationDrawer(notificationDrawerAnchor, true)}
      dir={theme.direction}
      className={clsx(classes.notificationDrawer, {
        [classes.bottomDrawer]:
          notificationDrawerState[notificationDrawerAnchor],
      })}
      classes={{
        paper: clsx(classes.notificationDrawerPaper, {
          [classes.bottomDrawer]:
            notificationDrawerState[notificationDrawerAnchor],
        }),
      }}
    >
      <Toolbar variant="dense">
        <Typography color="inherit" variant="h6">
          {t("notifications")}
        </Typography>
      </Toolbar>
      <NotificationsList {...props} onSelect={closeNotification} />
    </StyledSwipeableDrawer>
  );
};

NotificationBody.propTypes = {
  notificationDrawerAnchor: PropTypes.any,
  notificationDrawerState: PropTypes.any,
  closeNotification: PropTypes.any,
  notificationDrawer: PropTypes.any,
};

export default withRouter(NotificationBody);
