import * as gqlb from "gql-query-builder";
export const DELETE_PACKAGE_COMMODITY = gqlb.mutation({
  operation: "deletePackageCommodity",
  fields: [],
  variables: {
    id: {
      type: "Int",
      required: true,
    },
  },
});
export const DELETE_REQUEST_PACKAGE = gqlb.mutation({
  operation: "deleteRequestPackage",
  fields: [],
  variables: {
    id: {
      type: "Int",
      required: true,
    },
  },
});
