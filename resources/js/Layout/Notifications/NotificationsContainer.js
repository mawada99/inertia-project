import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { Globals } from "../../Component/HOC/Classes/Globals";
import * as gqlb from "gql-query-builder";
import { Collapse, ListItem, ListItemText } from "@mui/material";
import NotificationBody from "../Notifications/NotificationBody";
import { useSnackbar } from "notistack";
import { LIST_NOTIFICATIONS } from "./Graphql";
import notificationsSuccess from "../../assets/Sound/notifications.wav";

export const MESSAGE_CREATED_SUBSCRIPTION = gqlb.subscription({
    operation: "notificationCreated",
    fields: ["id", "createdAt", "readAt", "data"],
    variables: {},
});

const NotificationContainer = (props) => {
    const {
        setBadge,
        setNewArrival,
        notificationDrawer,
        notificationDrawerAnchor,
        notificationDrawerState,
    } = props;
    const user = Globals?.user;
    const [newMSG, setNewMSG] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const [notificationData, setNotificationData] = useState({});
    const audioNotifications = new Audio(notificationsSuccess);
    const onCompleteNotifications = ({
        data,
        quaryName,
        stateName,
        nameOnStorage,
        userId,
    }) => {
        if (data[quaryName]?.data?.length > 0) {
            const newNotificationDate = data?.[quaryName]?.data[0]?.createdAt;
            const firstOpen = localStorage.getItem("firstOpen");
            const storageDate =
                localStorage.getItem(nameOnStorage) || firstOpen;
            const isNotificationUnread =
                new Date(firstOpen) < new Date(newNotificationDate) &&
                new Date(storageDate) < new Date(newNotificationDate);

            setNewArrival(isNotificationUnread);
            setBadge &&
                setBadge((prev) => ({
                    ...prev,
                    notification: isNotificationUnread ? "false" : "true",
                }));
        }
    };

    useSubscription(
        gql`
            ${MESSAGE_CREATED_SUBSCRIPTION.query}
        `,
        {
            variables: {
                first: 1,
                receivedOnly: true,
                asConversation: true,
            },
            fetchPolicy: "network-only",
            notifyOnNetworkStatusChange: true,
            onData: (data) => {
                setNewArrival(true);
                setBadge &&
                    setBadge((prev) => ({
                        ...prev,
                        notification: "false",
                    }));
                localStorage.setItem(
                    "notificationDate",
                    data.data.data.notificationCreated.createdAt
                );
                setNewMSG(data.data.data.notificationCreated);
                const notification = data.data.data.notificationCreated;
                const NotificationData = JSON.parse(notification.data);
                const NotificationListItem = (
                    <ListItem key={notification.id} sx={{ p: 0 }}>
                        <ListItemText
                            sx={{ p: 0 }}
                            primaryTypographyProps={{ variant: "body2" }}
                            primary={NotificationData.message}
                        />
                    </ListItem>
                );
                audioNotifications.play();
                enqueueSnackbar(NotificationListItem, {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    TransitionComponent: Collapse,
                });
            },
        }
    );

    const { fetchMore, loading } = useQuery(
        gql`
            ${LIST_NOTIFICATIONS.query}
        `,
        {
            variables: {
                first: 20,
                page: 1,
                receivedOnly: true,
                asConversation: true,
            },
            // skip: !haveNotificationAccess,
            fetchPolicy: "network-only",
            notifyOnNetworkStatusChange: true,
            // nextFetchPolicy: "network-only",
            // pollInterval: 10000,
            onCompleted: (data) => {
                setNotificationData((prev) => ({
                    ...prev,
                    ...data.listNotifications,
                }));
                localStorage.setItem(
                    "notificationDate",
                    data?.listNotifications?.data[0]?.createdAt
                );

                onCompleteNotifications({
                    data,
                    quaryName: "listNotifications",
                    stateName: "status",
                    nameOnStorage: "notifications",
                    userId: user?.account?.id,
                });

                // onCompleteNotifications({
                //   data,
                //   quaryName: "listMessages",
                //   stateName: "messages",
                //   nameOnStorage: "messagesNotifications",
                //   userId: user?.id,
                // });
            },
            onError: ({ networkError }) => {},
        }
    );

    const closeNotification = () => {
        notificationDrawer(notificationDrawerAnchor, false);
        setNewArrival(false);
        setBadge &&
            setBadge((prev) => ({
                ...prev,
                notification: "true",
            }));
    };

    return (
        <>
            {/* <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          notifiDrawer(notificationDrawerAnchor, true);
          localStorage.setItem("notifications", new Date())
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
      </IconButton> */}
            <NotificationBody
                notificationDrawerAnchor={notificationDrawerAnchor}
                notificationDrawerState={notificationDrawerState}
                closeNotification={closeNotification}
                notificationDrawer={notificationDrawer}
                newMSG={newMSG}
                notificationData={notificationData}
                fetchMore={fetchMore}
                loading={loading}
                {...props}
            />
        </>
    );
};
export default NotificationContainer;
