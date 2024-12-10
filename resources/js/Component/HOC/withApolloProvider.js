/* eslint-disable default-case */
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { Collapse } from "@mui/material";
import { createUploadLink } from "apollo-upload-client";
import React, { useEffect, useState } from "react";
import { browserName, osName } from "react-device-detect";

import { ApolloLink } from "@apollo/client/link/core";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import * as gqlb from "gql-query-builder";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import pjson from "../../../package.json";
import config from "../../config.json";
// import SystemDown from "../../Error/SystemDown";
import { UserLogout } from "../../helpers/helpersFunction";
// import i18n from "i18next";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PusherLink from "./PusherLink";
import Pusher from "pusher-js";

const cache = new InMemoryCache({
  addTypename: false,
});

const writequery = (graphQLErrors, networkError) => {
  return cache.writeQuery({
    query: gql`
      query error {
        graphQLErrors @client
        networkError @client
        hasError @client
      }
    `,
    data: {
      graphQLErrors: graphQLErrors || null,
      networkError: networkError || null,
      hasError: true,
    },
  });
};

let ACCOUNT_DISABLED;
let AUTHENTICATION;
let USER_LOGOUT;
let SUBSCRIPTION_EXPIRED;

const graphQLErrors = onError(
  ({ graphQLErrors, networkError, forward, response, operation }) => {
    console.log(graphQLErrors);
    console.log(networkError);
    const queryName =
      operation.query.definitions[0].selectionSet?.selections?.[0]?.name?.value;
    const ignorMsg = queryName !== "listMessages";
    if (networkError && ignorMsg) {
      writequery(null, networkError);
    }
    if (graphQLErrors && ignorMsg) {
      console.log(graphQLErrors);
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "INSTANCE_CODE_MISSING":
          case "INVALID_INSTANCE_CODE":
            UserLogout(USER_LOGOUT);
            break;
          case "ACCOUNT_DISABLED":
          case "USER_DISABLED":
            ACCOUNT_DISABLED(err);
            return;
          case "SUBSCRIPTION_EXPIRED":
          case "SUBSCRIPTION_EXPIRED_RENEW":
            SUBSCRIPTION_EXPIRED(err);
            break;
        }

        if (err.extensions.category === "authentication") {
          AUTHENTICATION(err);
          return;
        }
      }
      writequery(graphQLErrors, null);
    }
  }
);
const retryLink = new RetryLink({
  attempts: {
    max: 3,
    retryIf: (error, count, operation) => {
      return !!error;
    },
  },
  delay: {
    initial: 500,
    max: Infinity,
    jitter: true,
  },
});

const multiInstance = config?.multiInstance;

let authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  const Languages = config.app.languages;
  const Language = localStorage.getItem("i18nextLng")
    ? localStorage.getItem("i18nextLng")
    : Languages[0];
  const instanceCode = localStorage.getItem("instanceCode");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "Content-Language": Language,
      "X-Client-Type": "WEB",
      "X-Client-Name": osName + "-" + browserName,
      "X-App-Version": pjson.version,
      ...(multiInstance && { "X-Instance-Code": instanceCode }),
      ...operation.getContext().headers,
    },
  });
  return forward(operation);
});
const port = config.backend.port;
const protocol = config.backend.protocol;
const path = config.backend.path;
const domain = config.backend.domain
  ? config.backend.domain
  : window.location.hostname;

const wsHost = config.backend.wsHost
  ? config.backend.wsHost
  : window.location.hostname;

const pusherLink = new PusherLink({
  pusher: new Pusher("accurate", {
    cluster: "mt1",
    wssPort: 6001,
    wsPort: 6001,
    wsHost: wsHost ?? domain,
    forceTLS: config.backend.wsForceTLS,

    authEndpoint: `${protocol}://${domain}:${port}/graphql/subscriptions/auth`,
  }),
});

let getBackendUri = () => {
  return `${protocol}://${domain}:${port}/${path}`;
};

const uploadLink = createUploadLink({ uri: getBackendUri });
export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    pusherLink,
    authLink,
    retryLink,
    graphQLErrors,
    uploadLink,
  ]),
});

export const HAND_SHAKE = gqlb.query([
  {
    operation: "freightSettings",
    fields: ["renewalDate"],
    variables: {},
  },
]);
const LoadingElement = document.getElementById("main-load");

function withApolloProvider(Component) {
  function WithApolloProvider(props) {
    // eslint-disable-next-line no-unused-vars
    const [handshake, setHandshake] = useState({
      data: false,
      error: false,
    });

    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const history = useHistory();

    const afterLogout = () => {
      history.push({
        pathname: "/login",
        state: {
          unAuthenticated: true,
          prevUrl: `${history.location.pathname}${window.location.search}`,
        },
      });
    };

    const subscriptionExpired = (error) => {
      localStorage.setItem(
        "subscriptionExpired",
        JSON.stringify({
          code: error.extensions.code,
          message: error.message,
        })
      );
      history.push({ pathname: "/renewal" });
    };

    const authError = (error, authentication) => {
      const token = localStorage.getItem("token");
      const errorMsg =
        authentication && token ? t("unauthenticationMessage") : error.message;
      // if (localStorage.getItem("token")) {
      enqueueSnackbar(errorMsg, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Collapse,
      });
      UserLogout(afterLogout);
      // }
    };

    ACCOUNT_DISABLED = (error) => authError(error);
    AUTHENTICATION = (error) => authError(error, true);
    SUBSCRIPTION_EXPIRED = (error) => subscriptionExpired(error);
    USER_LOGOUT = afterLogout;

    const [checkSubscription, setCheckSubscription] = useState(true);
    useEffect(() => {
      client
        .query({
          query: gql`
            ${HAND_SHAKE.query}
          `,
        })
        .then((data) => {
          const start = moment().startOf("day");
          const end = moment(
            data.data.freightSettings.renewalDate,
            "YYYY-MM-DD"
          );
          const days = moment.duration(end.diff(start)).asDays();
          if (data.data.freightSettings.renewalDate === null || days >= 0) {
            localStorage.removeItem("subscriptionExpired");
          }
          setCheckSubscription(data.loading);
          setHandshake((prev) => ({ ...prev, data: data }));
        })
        .catch((error) => {
          setHandshake((prev) => ({
            ...prev,
            error: error,
            renew: error.message,
          }));
          setCheckSubscription(false);
        });
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handshakeLoaded = () => {
      LoadingElement?.remove();
      return <Component {...props} />;
    };

    return (
      <ApolloProvider client={client}>
        {!checkSubscription && handshakeLoaded()}
      </ApolloProvider>
    );
  }

  return WithApolloProvider;
}

export default withApolloProvider;
