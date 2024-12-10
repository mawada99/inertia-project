import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

const operationQuery = (operation) => ({
  operation: operation,
  fields: [
    {
      operation: "paginatorInfo",
      fields: [
        "count",
        "currentPage",
        "firstItem",
        "hasMorePages",
        "lastItem",
        "lastPage",
        "perPage",
        "total",
      ],
      variables: {},
    },
  ],
  variables: {
    id: {
      type: "Int",
      required: true,
    },
  },
});

const fallbackQuery = gql`
  query {
    __typename
  }
`;

const useWaybillOperation = ({
  id,
  operation,
  skip,
  token,
  lang,
  templateDetailFields,
}) => {
  const OPERATION_QUERY =
    operation && gqlb.query(operationQuery("listPackageDetails"));

  const { data: lastPage, loading } = useQuery(
    operation
      ? gql`
          ${OPERATION_QUERY.query}
        `
      : fallbackQuery,
    {
      notifyOnNetworkStatusChange: true,
      skip: !id || skip,
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      variables: {
        id: parseInt(id[0]),
        first: 100,
      },
      ...(token && {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
            ...(lang && { "Content-Language": lang }),
          },
        },
      }),
      onCompleted: () => {},
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const pagesCount =
    lastPage?.[operation]?.entries.paginatorInfo?.lastPage ?? 1;

  let manifestBody;
  if (lastPage && !skip) {
    manifestBody = [
      {
        operation: operation,
        fields: ["id"],
        variables: {
          id: {
            type: "Int",
            required: true,
          },
        },
      },
    ];

    for (let i = 0; i < pagesCount; i++) {
      const initialQuery = {
        operation: `entries_${i}:entries`,
        fields: [
          { data: [{ request: templateDetailFields?.[0]?.data ?? "id" }] },
        ],
        variables: {
          ...(["collection", "payment"].includes(operation) && {
            typeCode: {
              type:
                operation === "payment"
                  ? "PaymentEntryTypeCode"
                  : "CollectionEntryTypeCode",
            },
          }),
          [`page_${i + 1}`]: {
            name: "page",
            type: "Int",
            value: i + 1,
          },
          first: {
            type: "Int",
          },
        },
      };
      manifestBody[0].fields.push(initialQuery);
    }
  }

  const MANIFEST_QUERY = manifestBody ? gqlb.query(manifestBody) : null;

  let parsedData = [];
  const { data, loading: entriesLoading } = useQuery(
    MANIFEST_QUERY
      ? gql`
          ${MANIFEST_QUERY.query}
        `
      : gql`
          query {
            __typename
          }
        `,
    {
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      skip: !MANIFEST_QUERY,
      variables: {
        ...MANIFEST_QUERY?.variables,
        id: parseInt(id),
        first: 100,
        ...(["collection", "payment"].includes(operation) && {
          typeCode: "SHIPMENT",
        }),
      },
      onCompleted: (data) => {},
      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (data?.[operation]?.entries_0) {
    let concatData = [];
    for (const key in data?.[operation]) {
      if (key.startsWith("entries")) {
        const requests = data?.[operation]?.[key].data.map(
          (request) => request.request
        );
        concatData = concatData.concat(requests);
      }
    }
    parsedData = concatData;
  }

  return {
    lastPage,
    data,
    loading: entriesLoading || loading,
    parsedData,
  };
};

export default useWaybillOperation;
