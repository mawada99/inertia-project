import React, { Fragment, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import EmptyTableMessage from "../../../FunctionComponents/EmptyTableMessage";
import Grid from "@mui/material/Unstable_Grid2";

// import { dateFormat } from "../../../helpers/dateFunctions";
// import { Background } from "devextreme-react/range-selector";

export const batchFields = [
  "id",
  { barcodes: ["id", "code"] },
  {
    customer: [
      "code",
      "name",
      {
        operation: `isMobileHidden(code: WAYBILL)`,
        fields: [],
        variables: {},
      },
      {
        zone: ["id", "code", "name"],
      },
      {
        subzone: ["id", "code", "name"],
      },
      "phone",
      "mobile",
    ],
  },
];

export const requestFields = [
  {
    data: [
      "date",
      "id",
      "missing",
      "damaged",
      "barcode",
      "pieceNumber",
      { warehouse: ["id", "name", "code"] },
      {
        package: [
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
          { product: ["name"] },
          { packageType: ["id", "name", "code"] },
          {
            request: [
              "code",
              "consigneeName",
              "consigneeAddress",
              "consigneePostalCode",
              "consigneeMobile",
              "shipperName",
              "shipperAddress",
              "shipperPostalCode",
              "shipperMobile",
              "detailsCount",
              {
                customer: ["code"],
              },
              {
                consigneeState: ["id", "name", "code"],
              },
              {
                shipperState: ["id", "name", "code"],
              },
            ],
          },
          { priceMode: ["id", "name", "code"] },
          { originCountry: ["id", "name", "code"] },
          { currency: ["id", "name", "code"] },
          { warehouse: ["id", "name", "code"] },
        ],
      },
    ],
  },
];

const PREFIX = "REQUEST_STICKY_PRINT";

export const classes = {
  flex: `${PREFIX}-flex`,
  flexBetween: `${PREFIX}-flexBetween`,
  customHeight18: `${PREFIX}-customHeight18`,
  customHeight25: `${PREFIX}-customHeight25`,
  customHeight5: `${PREFIX}-customHeight5`,
  customHeight6: `${PREFIX}-customHeight6`,
  customHeight13: `${PREFIX}-customHeight13`,
  customHeight12: `${PREFIX}-customHeight12`,
  customHeight10: `${PREFIX}-customHeight10`,
  printSticky: `${PREFIX}-printSticky`,
  stickyCode: `${PREFIX}-stickyCode`,
  line: `${PREFIX}-line`,
  lineTop: `${PREFIX}-lineTop`,
  tableData: `${PREFIX}-tableData`,
  reMarks: `${PREFIX}-reMarks`,
  width50: `${PREFIX}-width50`,
  width60: `${PREFIX}-width60`,
  width70: `${PREFIX}-width70`,
  width30: `${PREFIX}-width30`,
  borderRight: `${PREFIX}-borderRight`,
  padding2: `${PREFIX}-padding2`,
  hideSenderPhone: `${PREFIX}-hideSenderPhone`,
  minHeight: `${PREFIX}-minHeight`,
  borderLeft: `${PREFIX}-borderLeft`,
  rotate: `${PREFIX}-rotate`,
  borderTop: `${PREFIX}-borderTop`,
  borderBottom: `${PREFIX}-borderBottom`,
  bold: `${PREFIX}-bold`,
  imgDiv: `${PREFIX}-imgDiv`,
  logoImg: `${PREFIX}-logoImg`,
  logoWrapper: `${PREFIX}-logoWrapper`,
  paddingX: `${PREFIX}-paddingX`,
  tableDataZones: `${PREFIX}-tableDataZones`,
  capitalize: `${PREFIX}-capitalize`,
  uppercase: `${PREFIX}-uppercase`,
  qrWrapper: `${PREFIX}-qrWrapper`,
  overflowHidden: `${PREFIX}-overflowHidden`,
  rotateWrapper: `${PREFIX}-rotateWrapper`,
  contentWrapper: `${PREFIX}-contentWrapper`,
  contentWrapperCustomer: `${PREFIX}-contentWrapperCustomer`,
  rotateHeight38: `${PREFIX}-rotateHeight38`,
  rotateHeight24: `${PREFIX}-rotateHeight24`,
  centerData: `${PREFIX}-centerData`,
  customFont: `${PREFIX}-customFont`,
};
export const Root = styled("div")(({ theme }) => ({
  [`& .${classes.hideSenderPhone}`]: {
    display: "none !important",
  },
  [`& .${classes.printSticky}`]: {
    Background: "red",
    border: "1px solid #000",
    pageBreakAfter: "always",
    position: "relative",
    pageBreakInside: "avoid",

    width: "calc(13cm - (2px + 2mm))",
    height: "calc(8cm - (2px + 2mm))",

    overflow: "hidden",
    fontSize: 17,
    color: "black",
    boxSizing: "border-box",
  },
  [`& .${classes.imgDiv}`]: {
    padding: theme.spacing(0.5, 0, 0, 0),
  },
  [`& .${classes.line}`]: {
    borderBottom: "1px solid #000",
  },
  [`& .${classes.lineTop}`]: {
    borderTop: "1px solid #000",
  },
  [`& .${classes.borderRight}`]: {
    borderRight: "1px solid #000",
  },
  [`& .${classes.borderLeft}`]: {
    borderLeft: "1px solid #000",
  },
  [`& .${classes.flexBetween}`]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  [`& .${classes.flex}`]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [`& .${classes.width60}`]: {
    width: "60%",
  },
  [`& .${classes.width70}`]: {
    width: "70%",
  },
  [`& .${classes.width30}`]: {
    width: "30%",
  },
  [`& .${classes.stickyCode}`]: {
    fontFamily: "'Libre Barcode 39 Text'",
    // height: "100px",
    overflow: "hidden",
    fontSize: 50,
  },
  [`& .${classes.tableData}`]: {
    width: "calc(100% * (1/3))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "6px 0",
    height: "100%",
    // fontSize: "15px",
    justifyContent: "flex-start",
  },
  [`& .${classes.tableDataZones}`]: {
    width: "calc(100% * (1/2))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "6px 0",
    height: "100%",
    fontSize: "15px",
    justifyContent: "space-between",
  },
  [`& .${classes.reMarks}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.padding2}`]: {
    padding: "2px 0",
  },
  [`& .${classes.customHeight25}`]: {
    height: "25%",
  },
  [`& .${classes.customHeight18}`]: {
    height: "18%",
  },
  [`& .${classes.customHeight12}`]: {
    height: "12%",
  },
  [`& .${classes.customHeight5}`]: {
    height: "5%",
  },
  [`& .${classes.customHeight6}`]: {
    height: "6%",
  },
  [`& .${classes.customHeight13}`]: {
    height: "13%",
  },
  [`& .${classes.customHeight10}`]: {
    height: "10%",
  },
  [`& .${classes.contentWrapper}`]: {
    padding: "2px 8px",
    width: "70%",
    height: "100%",
  },
  [`& .${classes.contentWrapperCustomer}`]: {
    padding: "2px 8px",
    width: "50%",
    height: "100%",
  },
  [`& .${classes.rotateWrapper}`]: {
    width: "30%",
    height: "100%",
    padding: "2px 8px",
  },
  [`& .${classes.rotate}`]: {
    rotate: "-90deg",
    fontSize: "18px",
    margin: "auto",
  },
  [`& .${classes.rotateHeight38}`]: {
    height: "38%",
  },
  [`& .${classes.rotateHeight24}`]: {
    height: "24%",
  },
  [`& .${classes.borderBottom}`]: {
    borderBottom: "1px solid #000",
  },
  [`& .${classes.borderTop}`]: {
    borderTop: "1px solid #000",
  },
  [`& .${classes.bold}`]: {
    fontWeight: 700,
  },
  [`& .${classes.logoImg}`]: {
    maxHeight: "75%",
    maxWidth: "fit-content",
  },
  [`& .${classes.logoWrapper}`]: {
    paddingTop: theme.spacing(1),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.paddingX}`]: {
    padding: theme.spacing(0, 1),
  },
  [`& .${classes.capitalize}`]: {
    textTransform: "capitalize",
  },
  [`& .${classes.uppercase}`]: {
    textTransform: "uppercase",
  },
  [`& .${classes.qrWrapper}`]: {
    height: "100%",
    width: "30%",
    padding: theme.spacing(1),
    justifyContent: "end",
  },
  [`& .${classes.overflowHidden}`]: {
    overflow: "hidden",
  },
  [`& .${classes.centerData}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  [`& .${classes.customFont}`]: {
    fontSize: 30,
  },
}));

function createDynamicStyles() {
  const style = document.createElement("style");
  style.type = "text/css";

  const styles = `
    @page {
        size: 13cm 8cm; 
        margin: 1mm !important;
        overflow: hidden;
    }
    * {
            color: black;
    }
    body {
            background: #fff !important
    }
    `;

  if (style.styleSheet) {
    style.styleSheet.cssText = styles;
  } else {
    style.appendChild(document.createTextNode(styles));
  }

  document.head.appendChild(style);
}

const Template13X8 = (props) => {
  const { loading, validData, settingsLoad, parsedData, isBatch } = props;

  const { t } = useTranslation();

  useEffect(() => {
    createDynamicStyles();
  }, []);

  return (
    <Fragment>
      {loading || (!loading && !validData) || settingsLoad ? (
        <>
          <EmptyTableMessage loading={loading} message={t("noResults")} />

          {/* <FullScreenLoading minHeight="25%" /> */}
        </>
      ) : (
        parsedData.map((detail, index) => {
          return (
            <Root key={index}>
              <div
                className={clsx({
                  [classes.printSticky]: !loading && validData,
                })}
                style={{ lineHeight: "1.2" }}
              >
                <div
                  className={clsx(
                    classes.flexBetween,
                    classes.line,
                    classes.customHeight25,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(
                      classes.barcode,
                      classes.width70,
                      classes.stickyCode
                    )}
                  >
                    *{detail.barcode}*
                  </div>
                  <div className={clsx(classes.flex, classes.qrWrapper)}>
                    <QRCode
                      value={detail.barcode}
                      style={{ height: "100%", width: "70%" }}
                    />
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight18,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <Box
                    component="span"
                    className={clsx(
                      classes.uppercase,
                      classes.bold,
                      classes.customFont
                    )}
                  >
                    {detail?.package?.request?.customer?.code}
                    {/* N-584 */}
                  </Box>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight18,
                    classes.centerData
                  )}
                >
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("shopName")} */}
                      SHOP NAME
                      {" : "}
                    </Box>
                    <Box component="span">
                      {detail?.package?.request?.shipperName}
                    </Box>
                  </div>
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("itemName")} */}
                      ITEM NAME
                      {" : "}
                    </Box>
                    <Box component="span">{detail?.package?.product?.name}</Box>
                  </div>
                </div>
                {/* <Grid
                  className={clsx(classes.customHeight10)}
                  spacing={2}
                  container
                  xs={{ p: 1 }}
                >
                  <Grid item xs={2}>
                    SHOP NAME
                  </Grid>
                  <Grid item xs={1}>
                    :
                  </Grid>
                  <Grid item xs={9}>
                    {detail?.package?.request?.shipperName}
                  </Grid>
                </Grid>
                <Grid
                  className={clsx(classes.line, classes.customHeight10)}
                  spacing={2}
                  container
                  xs={{ p: 1 }}
                >
                  <Grid item xs={2}>
                    {" "}
                    item NAME
                  </Grid>
                  <Grid item xs={1}>
                    :
                  </Grid>
                  <Grid item xs={9}>
                    {detail?.package?.product?.name}
                  </Grid>
                </Grid> */}

                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("ctnSize")} */}
                      CTN SIZE
                      {" : "}
                    </Box>
                    <Box component="span">
                      {detail?.package?.length}
                      {" x "}
                      {detail?.package?.weight}
                      {" x "}
                      {detail?.package?.length}
                    </Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("qty")} */}
                      QTY
                      {" : "}
                    </Box>
                    <Box component="span">{detail?.package?.pieces} PCS</Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("ctn/no")} */}
                      CTN/NO
                      {" : "}
                    </Box>
                    <Box component="span">
                      {detail?.package?.request?.customer?.code}
                      {"-"}
                      {`(${detail?.pieceNumber}-${detail?.package?.request?.detailsCount})`}
                    </Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(classes.paddingX)}
                    style={{ direction: "ltr" }}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                      sx={{ mx: 1 }}
                    >
                      {/* {t("madeIn")} */}
                      MADE IN
                    </Box>
                    <Box component="span">
                      {detail?.package?.originCountry?.name}
                    </Box>
                  </div>
                </div>
                {/* <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.paddingX
                  )}
                >
                  <Box
                    component="span"
                    className={clsx(classes.capitalize, classes.bold)}
                    sx={{ mx: 1 }}
                  >
                    {t("waybillNumber")}
                    {" : "}
                  </Box>
                  <Box component="span">{detail?.package?.request?.code}</Box>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,

                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(
                      classes.contentWrapperCustomer,
                      classes.borderRight
                    )}
                  >
                    {" "}
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("senderName")}
                      {" : "}
                    </Box>
                    <Box component="span">
                      {!isBatch && detail?.package?.request?.shipperName}
                    </Box>
                  </div>
                  <div className={clsx(classes.contentWrapperCustomer)}>
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("consigneeName")}
                      {" : "}
                    </Box>
                    <Box component="span">
                      {!isBatch && detail?.package?.request?.consigneeName}
                    </Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(
                      classes.contentWrapperCustomer,
                      classes.borderRight
                    )}
                  >
                    {" "}
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("senderPhone")}
                      {" : "}
                    </Box>
                    <Box component="span" dir="ltr">
                      {!isBatch && detail?.package?.request?.shipperMobile}
                    </Box>
                  </div>
                  <div className={clsx(classes.contentWrapperCustomer)}>
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("recipientPhone")}
                      {" : "}
                    </Box>
                    <Box component="span" dir="ltr">
                      {!isBatch && detail?.package?.request?.consigneeMobile}
                    </Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    classes.line,
                    classes.customHeight10,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(
                      classes.contentWrapperCustomer,
                      classes.borderRight
                    )}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("senderState")}
                      {" : "}
                    </Box>
                    <Box component="span" dir="ltr">
                      {!isBatch && detail?.package?.request?.shipperState?.name}
                    </Box>
                  </div>
                  <div className={clsx(classes.contentWrapperCustomer)}>
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("recipientState")}
                      {" : "}
                    </Box>
                    <Box component="span" dir="ltr">
                      {!isBatch &&
                        detail?.package?.request?.consigneeState?.name}
                    </Box>
                  </div>
                </div>
                <div
                  className={clsx(
                    // classes.line,
                    classes.customHeight13,
                    classes.overflowHidden,
                    classes.flex,
                    classes.paddingX
                  )}
                >
                  <div
                    className={clsx(
                      classes.contentWrapperCustomer,
                      classes.borderRight
                    )}
                  >
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("senderAddress")}
                      {" : "}
                    </Box>
                    <Box component="span">
                      {!isBatch && detail?.package?.request?.shipperAddress}
                    </Box>
                  </div>
                  <div className={clsx(classes.contentWrapperCustomer)}>
                    <Box
                      component="span"
                      className={clsx(classes.capitalize, classes.bold)}
                    >
                      {t("recipientAddress")}
                      {" : "}
                    </Box>
                    <Box component="span">
                      {!isBatch && detail?.package?.request?.consigneeAddress}
                    </Box>
                  </div>
                </div> */}
                {/* <Box
                  component="div"
                  className={clsx(
                    classes.lineTop,
                    classes.customHeight6,
                    classes.bold,
                    classes.centerData,
                    classes.overflowHidden,
                    "py-1"
                  )}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                >
                  <Box component="span" pl="2px">
                    {footer}
                  </Box>
                </Box> */}
              </div>
            </Root>
          );
        })
      )}
    </Fragment>
  );
};

export default Template13X8;
