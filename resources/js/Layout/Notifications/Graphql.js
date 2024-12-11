import * as gqlb from "gql-query-builder";
export const LIST_NOTIFICATIONS = gqlb.query({
  operation: "listNotifications",
  fields: [
    {
      operation: "paginatorInfo",
      fields: [
        "total",
        "count",
        "hasMorePages",
        "currentPage",
        "firstItem",
        "lastItem",
        "lastPage",
        "perPage",
      ],
      variables: {},
    },
    {
      operation: "data",
      fields: [
        "id",
        "createdAt",
        "data",
        "readAt",
      ],
      variables: {},
    },
  ],
  variables: {
    first: {
      type: "Int",
    },
    page: {
      type: "Int",
    },
  },
});

export const LIST_MESSAGES = gqlb.query({
  operation: "listMessages",
  fields: [
    {
      operation: "paginatorInfo",
      fields: [
        "total",
        "count",
        "hasMorePages",
        "currentPage",
        "firstItem",
        "lastItem",
        "lastPage",
        "perPage",
      ],
      variables: {},
    },
    {
      operation: "data",
      fields: [
        "id",
        "createdAt",
        "body",
        "image",
        {
          user: [
            "username",
            {
              operation: "account",
              fields: [
                {
                  operation: "...on Customer",
                  fields: ["name"],
                  variables: {},
                },
                {
                  operation: "...on DeliveryAgent",
                  fields: ["name"],
                  variables: {},
                },
              ],
              variables: {},
            },
          ],
        },

        {
          shipment: ["id", "code"],
        },
      ],
      variables: {},
    },
  ],
  variables: {
    first: {
      type: "Int",
    },
    page: {
      type: "Int",
    },
    receivedOnly: {
      type: "Boolean",
    },
  },
});

export const READ_NOTIFICATION = gqlb.mutation({
  operation: "readNotification",
  fields: ["id","readAt"],
  variables: {
    id: {
      type: "String",
      required: true,
    },
  },
});

