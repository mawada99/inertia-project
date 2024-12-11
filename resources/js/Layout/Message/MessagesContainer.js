import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { Globals } from "../../Component/HOC/Classes/Globals";
import * as gqlb from "gql-query-builder";
import MessagesBody from "./MessagesBody";
import { LIST_MESSAGES } from "./Graphql";
import { ModeContext } from "../../Context/ModeContext";
import { useContext } from "react";

export const MESSAGE_CREATED_SUBSCRIPTION = gqlb.subscription({
  operation: "shipmentMessageCreated",
  fields: [
    "id",
    "createdAt",
    "body",
    {
      images: [
        "path",
      ]
    },
    {
      user: [
        "username",
        {
          account: [
            {
              "...on Customer": ["name"],
            },
            {
              "...on DeliveryAgent": ["name"],
            },
          ],
        },
      ],
    },
    {
      shipment: ["id", "code"],
    },
  ],
  variables: {},
});

const MessageContainer = (props) => {
  const { setBadge,
    setNewArrival,
    messageDrawer,
    messageDrawerAnchor,
    messageDrawerState
  } = props
  const user = Globals?.user;

  const { hasMessagesPermission } = useContext(ModeContext)
  const [newMSG, setNewMSG] = useState()
  const [messagesData, setMessagesData] = useState();

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
      const storageDate = localStorage.getItem(nameOnStorage) || firstOpen;
      const isNotificationUnread =
        new Date(firstOpen) < new Date(newNotificationDate) &&
        new Date(storageDate) < new Date(newNotificationDate);

      setNewArrival(isNotificationUnread)
      setBadge && setBadge((prev) => ({
        ...prev,
        message: isNotificationUnread ? "false" : "true",
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
        asConversation:true,
      },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onData: (data) => {
        localStorage.setItem("messageDate", data.data.data.shipmentMessageCreated.createdAt)
        setNewArrival(true)
        setBadge && setBadge((prev) => ({
          ...prev,
          message: "false",
        }));
        // deleteShipmentById(data.data.data.shipmentMessageCreated?.shipment?.id)
        setNewMSG(data.data.data.shipmentMessageCreated)
      }
    }
  );

  const { fetchMore, loading } = useQuery(
    gql`
      ${LIST_MESSAGES.query}
    `,
    {
      variables: {
        first: 20,
        page: 1,
        receivedOnly: true,
        asConversation:true,
      },
      skip: !hasMessagesPermission,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setMessagesData((prev) => ({ ...prev, ...data.listMessages }));
        localStorage.setItem("messageDate", data?.listMessages?.data[0]?.createdAt)
        onCompleteNotifications({
          data,
          quaryName: "listMessages",
          stateName: "messages",
          nameOnStorage: "messages",
          userId: user?.id,
        });
      },
      onError: ({ networkError }) => {
        console.log(networkError);
      },
    }
  );

  const closeMessageBody = () => {
    messageDrawer(messageDrawerAnchor, false);
    setNewArrival(false);
    setBadge && setBadge((prev) => ({
      ...prev,
      message: "true",
    }));
    // startPolling(10000);
  };


  return hasMessagesPermission ? (
    <>
      {/* <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          notifiDrawer(notificationDrawerAnchor, true);
          localStorage.setItem("messages", new Date())
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
          <Message color="action" />
        </Badge>
      </IconButton> */}
      {messagesData && <MessagesBody
        messageDrawerAnchor={messageDrawerAnchor}
        messageDrawerState={messageDrawerState}
        closeMessageBody={closeMessageBody}
        messageDrawer={messageDrawer}
        newMSG={newMSG}
        messagesData={messagesData}
        fetchMore={fetchMore}
        loading={loading}
        {...props}
      />}
    </>
  ) : null;
};
export default MessageContainer;
