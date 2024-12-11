import * as gqlb from "gql-query-builder";

export const USER_SETTINGS = gqlb.query([
  {
    operation: "me",
    fields: [
      "id",
      "username",
      "isSuper",
      {
        userBranches: ["default", { branch: ["id", "active", "name"] }],
      },
      {
        roles: ["code"],
      },
      {
        permissions: ["slug"],
      },
      {
        operation: "account",
        fields: [
          {
            operation: "...on Customer",
            fields: [
              "id",
              "name",
              "email",
              "__typename",
              // "specifyShipmentCode",
              // "warehousing",
              { glAccount: ["id"] },
            ],
            variables: {},
          },
          {
            operation: "...on Employee",
            fields: ["id", "name", "code", "__typename", { glAccount: ["id"] }],
            variables: {},
          },
        ],
        variables: {},
      },
      {
        roles: [
          "id",
          "name",
          "code",
          // {
          //   permissions: ["id", "name", "slug"],
          // },
        ],
      },
    ],
    variables: {},
  },
  {
    operation: "freightSettings",
    fields: ["renewalDate"],
    variables: {},
  },
]);
