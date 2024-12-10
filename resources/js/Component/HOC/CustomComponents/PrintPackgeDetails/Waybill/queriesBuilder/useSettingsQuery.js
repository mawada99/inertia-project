import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

export const SHIPPING_SETTING = (fields) =>
  gqlb.query([
    {
      operation: "freightSettings",
      fields: [{ localCurrency: ["name"] }],
      variables: {},
    },
    {
      operation: "organization",
      fields: fields ?? ["reportFooter"],
      variables: {},
    },
  ]);

const useSettingsQuery = ({ token, lang, fields }) => {
  const { data: settings, loading: settingsLoad } = useQuery(
    gql`
      ${SHIPPING_SETTING(fields).query}
    `,
    {
      nextFetchPolicy: "no-cache",
      fetchPolicy: "no-cache",
      ...(token && {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
            ...(lang && { "Content-Language": lang }),
          },
        },
      }),
    }
  );

  const currency = ` ${settings?.freightSettings?.localCurrency?.name} ` ?? "";
  const reportFooter = settings?.organization?.reportFooter?.split("\n");
  const header = settings?.organization?.reportHeader;
  const footer = reportFooter?.toString().replace(/,/g, " | ");

  return {
    settingsLoad,
    settings,
    currency,
    footer,
    header,
  };
};

export default useSettingsQuery;
