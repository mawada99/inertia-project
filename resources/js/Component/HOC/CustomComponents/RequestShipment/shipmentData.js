import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

const TRACKING = ({ operation, queryByType }) =>
  gqlb.query([
    {
      operation: operation,
      fields: [
        "id",
        "code",
        { status: ["id", "name", "code"] },
        "deletable",
        "editable",
        {
          shippingMode: ["code"],
        },
        {
          loadingMode: ["code"],
        },
      ],

      variables: {
        id: {
          type: "Int",
        },
      },
    },
    queryByType,
  ]);

export const useShipmentData = ({
  operation,
  trackingId,
  dispatch,
  type,
  queryByType,
  user,
  skip,
}) => {
  const { data, loading } = useQuery(
    gql`
      ${TRACKING({
        operation,
        queryByType,
        user,
      }).query}
    `,
    {
      variables: {
        id: parseInt(trackingId),
      },
      skip: !trackingId || skip,
      // notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      onCompleted: (data) => {
        dispatch({ type, payload: { data: data[type] } });
      },
    }
  );
  return {
    data,
    loading,
  };
};

export const useShipmentDataByType = ({
  changedType,
  dispatch,
  queryByType,
  trackingId,
  shipmentViewManagement,
  skip,
}) => {
  useQuery(
    gql`
      ${gqlb.query(queryByType).query}
    `,
    {
      variables: {
        id: parseInt(trackingId),
      },
      skip:
        !trackingId ||
        (!!shipmentViewManagement[changedType]?.data &&
          !shipmentViewManagement[changedType]?.expire) ||
        !skip,
      // notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      onCompleted: (data) => {
        dispatch({
          type: changedType,
          payload: { data: data[changedType], expire: false },
        });
      },
    }
  );

  return {};
};

// details({ type: changedType ?? "description", permission, operation })
