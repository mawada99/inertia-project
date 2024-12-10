import React, { Fragment, useEffect } from "react";
import * as gqlb from "gql-query-builder";

import { useTranslation } from "react-i18next";
// import useSettingsQuery from "./queriesBuilder/useSettingsQuery";
import useWaybillBatch from "./queriesBuilder/useWaybillBatch";
import useWaybillOperation from "./queriesBuilder/useWaybillOperation";
import LogoImg from "../../../../../Layout/LogoImg";
import { urlParameters } from "../../../CustomFunctions/urlParameters";
import useWaybillDetails from "./queriesBuilder/useWaybillDetails";

const operationQuery = (operation) => ({
  operation: operation,
  fields: [
    {
      operation: `entries`,
      fields: [
        {
          paginatorInfo: ["lastPage"],
        },
      ],
      variables: {
        first: {
          type: "Int",
        },
      },
    },
  ],
  variables: {
    id: {
      type: "Int",
      required: true,
    },
  },
});

export const MANIFEST_LAST_PAGE = (type) => gqlb.query(operationQuery(type));

export const MANIFEST_BY_ID_QUERY = (templateDetailFields) =>
  gqlb.query({
    operation: "manifest",
    fields: [
      {
        operation: `entries`,
        fields: [
          {
            operation: `data`,
            fields: [
              {
                shipment: templateDetailFields,
              },
            ],
            variables: {},
          },
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

const StickyPrint = (props) => {
  // Split the string by '=' and take the second part (the numbers after "requestId=")
  const { id } = props.match.params;

  // Split the string by '=' to separate the key ("requestId") and the values ("2,3,4,5,6,7,8,9,10,1")
  const [key, idValues] = id.split("=");

  // Now split the idValues by "," to get the individual IDs
  const numericIds = idValues.split(",").map(Number);
  const isBatch = props.match.params.type === "batch";
  const template = props.match.params.template;
  const operation = props.match.params.operation;

  const urlQuery = urlParameters(window.location.search);

  const { i18n } = useTranslation();
  const templateBatchFields = require(`./Sticker_${template}.js`).batchFields;
  const templateDetailFields =
    require(`./Sticker_${template}.js`).requestFields;
  const TemplateComponent = require(`./Sticker_${template}.js`).default;

  const token = urlQuery["token"];
  const lang = urlQuery["lang"];

  // const { settingsLoad, settings, currency, footer } = useSettingsQuery({
  //   token,
  //   lang,
  // });
  console.log(" IDs:", numericIds);
  const shipments = useWaybillDetails({
    numericIds,
    key,
    templateDetailFields,
    skip: isBatch || operation,
    token,
    lang,
  });

  const batch = useWaybillBatch({
    id,
    templateBatchFields,
    skip: !isBatch || operation,
    token,
    lang,
  });

  const entries = useWaybillOperation({
    id,
    operation,
    skip: !operation,
    token,
    lang,
    templateDetailFields,
  });

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    return () => {};
  }, [i18n, lang]);

  useEffect(() => {
    if (shipments?.parsedData || batch?.parsedData || entries.parsedData) {
      document.fonts.onloadingdone = function (fontFaceSetEvent) {
        window.print();
        document.fonts.onloadingdone = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipments?.data || batch?.data || entries?.data]);

  return (
    <>
      <TemplateComponent
        loading={shipments?.loading || batch?.loading || entries?.loading}
        validData={
          shipments?.parsedData.length > 0 ||
          batch?.parsedData.length > 0 ||
          entries?.parsedData.length > 0
        }
        // settingsLoad={settingsLoad}
        parsedData={
          shipments?.parsedData || batch?.parsedData || entries?.parsedData
        }
        isBatch={isBatch}
        customer={batch?.customer}
        // footer={footer}
        // currency={currency}
        LogoImg={LogoImg}
      />
    </>
  );
};

export default StickyPrint;
