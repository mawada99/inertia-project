import { Badge, IconButton } from "@mui/material";
import React from "react";
import useWidth, { isWidthDown } from "../../Hooks/useWidth";

const NotificationBadge = (props) => {
  const {
    startPolling,
    stopPolling,
    hasNotification,
    resetNotification,
    body: Body,
    icon: Icon,
  } = props;
  // const [newNotification, setNewNotification] = useState(false);

  const screenWidth = useWidth();

  const isScreenSmall = isWidthDown("xs", screenWidth);

  const notificationDrawerAnchor = isScreenSmall ? "bottom" : "right";

  const [notifidrawerState, setNotifiDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const notifiDrawer = (anchor, open) => {
    setNotifiDrawerState({ ...notifidrawerState, [anchor]: open });
  };

  // const { startPolling, stopPolling } = useQuery(
  //   gql`
  //     ${NOTIFICATION_DATE.query}
  //   `,
  //   {
  //     variables: {
  //       first: 1,
  //     },
  //     skip: newNotification || adminAccount,
  //     fetchPolicy: "network-only",
  //     notifyOnNetworkStatusChange: true,
  //     // nextFetchPolicy: "network-only",
  //     pollInterval: 1 * 60 * 100,
  //     onCompleted: (data) => {
  //       if (data.listNotifications.data.length > 0) {
  //         const notificationDate = data?.listNotifications?.data[0]?.createdAt;
  //         const parseNotification =
  //           JSON.parse(storageNotification)?.[Globals.user.account?.id];
  //         const localStorageDate = Boolean(
  //           !storageNotification || !parseNotification
  //         )
  //           ? new Date()
  //           : parseNotification;

  //         if (
  //           new Date(localStorageDate) < new Date(notificationDate) &&
  //           newNotification === false
  //         ) {
  //           setNewNotification(true);
  //         } else if (
  //           (!storageNotification || !parseNotification) &&
  //           newNotification === false
  //         ) {
  //           setNewNotification(true);
  //         }
  //       }
  //     },
  //   }
  // );

  const closeNotification = () => {
    notifiDrawer(notificationDrawerAnchor, false);
    resetNotification();
    startPolling(10000);
  };

  return (
    <>
      <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          notifiDrawer(notificationDrawerAnchor, true);
          stopPolling();
        }}
        size="large"
      >
        <Badge
          color="primary"
          variant="dot"
          invisible={!hasNotification}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Icon color="action" />
        </Badge>
      </IconButton>
      <Body
        notifiAnchor={notificationDrawerAnchor}
        notifidrawerState={notifidrawerState}
        closeNotifi={closeNotification}
        notifiDrawer={notifiDrawer}
        {...props}
      />
    </>
  );
};
export default NotificationBadge;
// const NotificationBadge = (props) => {
//   return (
//     !adminAccount && (
//       <IconButton
//         onClick={() => {
//           notifiDrawer(notificationDrawerAnchor, true);
//           stopPolling();
//         }}
//       >
//         <Badge
//           color="primary"
//           variant="dot"
//           invisible={!newNotification}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//         >
//           <Notifications color="action" />
//         </Badge>
//       </IconButton>
//     )
//   );
// };
