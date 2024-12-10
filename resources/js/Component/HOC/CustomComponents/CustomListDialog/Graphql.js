import * as gqlb from "gql-query-builder";
const fields = [
  "id",
  "code",
  "exchangeRate",
  {
    branch: ["id", "code", "name"],
  },
  {
    currency: ["id", "code", "name"],
  },
];
const requestFields = [
  "id",
  "code",
  "consigneeName",
  "consigneeAddress",
  "consigneeMobile",
  "shipperName",
  "shipperAddress",
  "shipperMobile",
  {
    consigneeState: ["id", "name", "code"],
  },
  {
    shipperState: ["id", "name", "code"],
  },
  {
    loadingMode: ["id", "name", "code"],
  },
  {
    shippingMode: ["id", "name", "code"],
  },
  {
    shippingDirection: ["id", "name", "code"],
  },
];
export const QUERY_LIST = (operationName, input) =>
  gqlb.query({
    operation: operationName,
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
      {
        operation: "data",
        fields:
          operationName === "listRequests"
            ? [...requestFields, "requestDate"]
            : operationName === "listShipments"
            ? [
                ...requestFields,
                "shipmentDate",
                {
                  containers: [
                    "id",
                    "containerNumber",
                    { packageType: ["id", "name", "code"] },
                  ],
                },
                {
                  originPort: ["id", "name", "code"],
                },
                {
                  destinationPort: ["id", "name", "code"],
                },
              ]
            : [
                ...fields,
                operationName === "listBills" ||
                operationName === "listInvoices"
                  ? "totalAmount"
                  : "amount",
              ],

        variables: {},
      },
    ],
    variables: {
      input: {
        type: `List${input}FilterInput`,
      },
      page: {
        type: "Int",
      },
      first: {
        type: "Int",
      },
    },
  });
