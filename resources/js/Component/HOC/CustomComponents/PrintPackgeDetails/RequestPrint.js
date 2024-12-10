import React, { useEffect, useMemo } from "react";
import * as gqlb from "gql-query-builder";
import { withRouter } from "react-router";
import { useTranslation } from "react-i18next";

import clsx from "clsx";
import WaybillA4, { Root, classes } from "./Waybill/WaybillA4";
import LogoImg from "../../../../Layout/LogoImg";
import useSettingsQuery from "./Waybill/queriesBuilder/useSettingsQuery";
import useWaybillRequest from "./Waybill/queriesBuilder/useWaybillRequest";
import useWaybillBatch from "./Waybill/queriesBuilder/useWaybillBatch";
import useWaybillOperation from "./Waybill/queriesBuilder/useWaybillOperation";
import { urlParameters } from "../../CustomFunctions/urlParameters";
import FullScreenLoading from "../../FunctionComponents/LoadingPages/FullScreenLoading";

const listRequestFields = [
  {
    data: [
      "id",
      "code",
      "date",
      "consigneeName",
      "consigneeAddress",
      "consigneePostalCode",
      "consigneeMobile",
      "shippingDate",
      "finishDate",
      "shipperName",
      "shipperAddress",
      "shipperPostalCode",
      "shipperMobile",
      "requestDate",
      {
        branch: ["id", "name", "code"],
      },
      {
        shippingDirection: ["id", "name", "code"],
      },
      {
        shippingMode: ["id", "name", "code"],
      },
      {
        loadingMode: ["id", "name", "code"],
      },
      {
        transactionType: ["id", "name", "code"],
      },
      {
        originCountry: ["id", "name", "code"],
      },
      {
        originPort: ["id", "name", "code"],
      },

      {
        shipperState: ["id", "name", "code"],
      },
      {
        destinationCountry: ["id", "name", "code"],
      },
      {
        destinationPort: ["id", "name", "code"],
      },

      {
        consigneeState: ["id", "name", "code"],
      },
      {
        currency: ["id", "name", "code"],
      },
      {
        payableCurrency: ["id", "name", "code"],
      },
      {
        status: ["id", "name", "code"],
      },
      {
        vendor: ["id", "code", "name"],
      },
      {
        customer: ["id", "code", "name"],
      },

      "payToVendor",
      "payableAmount",
      "remarks",
      "totalPackages",
      "volume",
      "weight",
      "freightAmount",
      "exchangeRate",
      {
        status: ["id", "name", "code"],
      },
      {
        packages: [
          "id",
          "code",
          "fragile",
          "height",
          "weight",
          "length",
          "breadth",
          "count",
          "totalWeight",
          "pieces",
          "volume",
          "volumetricWeight",
          "volumetricFactor",
          "chargeableUnits",
          "chargePrice",
          "chargeAmount",
          "description",
          "exchangeRate",
          "productPrice",
          { packageType: ["id", "name", "code"] },
          { product: ["id", "name", "code"] },
          { priceMode: ["id", "name", "code"] },
          { originCountry: ["id", "name", "code"] },
          { currency: ["id", "name", "code"] },
          { warehouse: ["id", "name", "code"] },
          {
            image: ["path"],
          },
          {
            commodities: [
              "count ",
              { commodity: ["id", "name", "code"] },
              "id",
            ],
          },
        ],
      },
    ],
  },
];

const barcodeBatch = [
  "id",
  {
    barcodes: [
      "id",
      "code",
      {
        customer: [
          "code",
          {
            operation: `isMobileHidden(code: WAYBILL)`,
            fields: [],
            variables: {},
          },
        ],
      },
    ],
  },
];

export const SHIPPING_SETTING = gqlb.query({
  operation: "freightSettings",
  fields: [{ localCurrency: ["name"] }],
  variables: {},
});

const RequestPrint = (props) => {
  const { type, size, operation } = props.match.params;
  const id = props.match.params.id.split(",").map(Number);
  const isBatch = type === "batch";
  const threeCopies = size === "3c";
  const twoCopies = size === "2c";
  const threeDifferent = size === "3d";
  const oneCopy = size === "1c";
  // const isBatch = props.match.params.type === "batch";
  // const threeCopies = props.match.params.size === "3c";
  // const twoCopies = props.match.params.size === "2c";
  // const threeDifferent = props.match.params.size === "3d";
  // const oneCopy = props.match.params.size === "1c";
  // const operation = props.match.params.operation;

  const urlQuery = urlParameters(window.location.search);
  const { i18n } = useTranslation();
  const token = urlQuery["token"];
  const lang = urlQuery["lang"];

  const { settings, currency, footer, header } = useSettingsQuery({
    token,
    lang,
    fields: ["reportHeader", "reportFooter"],
  });

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    return () => {};
  }, [i18n, lang, settings]);

  const requests = useWaybillRequest({
    id,
    templateRequestFields: listRequestFields,
    skip: isBatch || operation,
    token,
    lang,
  });

  const batch = useWaybillBatch({
    id,
    templateBatchFields: barcodeBatch,
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
    templateRequestFields: listRequestFields,
  });

  const waybillData =
    requests?.parsedData || batch?.parsedData || entries.parsedData;
  const waybillLoading = requests?.loading || batch?.loading || entries.loading;
  // let requestsArray = [];
  // if (waybillData.length > 0) {
  //   waybillData.forEach((request, i) => {
  //     if (oneCopy) {
  //       const copyNumber = 1;
  //       let smallRequest = [];
  //       for (let i = 0; i < copyNumber; i++) {
  //         smallRequest.push(request);
  //       }
  //       requestsArray.push(smallRequest);
  //     } else if (threeCopies || twoCopies) {
  //       const copyNumber = twoCopies ? 2 : 3;
  //       let smallRequest = [];
  //       for (let i = 0; i < copyNumber; i++) {
  //         smallRequest.push(request);
  //       }
  //       requestsArray.push(smallRequest);
  //     } else {
  //       const differentNumber = threeDifferent ? 3 : 2;
  //       const index = requestsArray.findIndex(
  //         (i) => i.length < differentNumber
  //       );
  //       if (index !== -1) {
  //         requestsArray[index].push(request);
  //       } else {
  //         requestsArray.push([request]);
  //       }
  //     }
  //   });
  // }

  const requestsArray = useMemo(() => {
    let arr = [];
    if (waybillData.length > 0) {
      waybillData.forEach((request) => {
        if (oneCopy) {
          arr.push([request]);
        } else if (threeCopies || twoCopies) {
          const copyNumber = twoCopies ? 2 : 3;
          let copies = Array(copyNumber).fill(request);
          arr.push(copies);
        } else {
          const differentNumber = threeDifferent ? 3 : 2;
          const index = arr.findIndex((i) => i.length < differentNumber);
          if (index !== -1) {
            arr[index].push(request);
          } else {
            arr.push([request]);
          }
        }
      });
    }
    return arr;
  }, [waybillData, oneCopy, threeCopies, twoCopies, threeDifferent]);

  const logoImg = <LogoImg className={classes.logoImg} forceLight={true} />;

  useEffect(() => {
    if (requestsArray.length) {
      document.fonts.onloadingdone = function (fontFaceSetEvent) {
        window.print();
        document.fonts.onloadingdone = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests?.data || batch?.data || entries?.data]);

  return (
    <Root>
      <meta name="viewport" content="width=no, user-scalable=no" />
      <link
        rel="stylesheet"
        type="text/css"
        href={process.env.PUBLIC_URL + "/print-portrait.css"}
      />
      {waybillLoading ? (
        <>
          <div style={{ visibility: "hidden", height: 0 }}>{logoImg}</div>
          <FullScreenLoading minHeight="30%" />
        </>
      ) : (
        requestsArray.map((page, index) => {
          return (
            <div key={index} className={clsx(classes.requestInvoiceContainer)}>
              {page.map((request, requestIndex) => {
                const rtsRequest = request?.type?.code === "RTS";
                return (
                  <WaybillA4
                    key={requestIndex}
                    request={request}
                    requestIndex={requestIndex}
                    threeCopies={threeCopies}
                    threeDifferent={threeDifferent}
                    oneCopy={oneCopy}
                    logoImg={logoImg}
                    header={header}
                    currency={currency}
                    rtsRequest={rtsRequest}
                    isBatch={isBatch}
                    footer={footer}
                  />
                );
              })}
            </div>
          );
        })
      )}
    </Root>
  );
};

export default withRouter(RequestPrint);
