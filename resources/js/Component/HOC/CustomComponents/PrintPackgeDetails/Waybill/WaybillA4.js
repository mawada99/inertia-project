import React, { useEffect } from "react";
import clsx from "clsx";
import { Icon, Table, TableBody, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { zoom } from "./RequestPrintFunc";

import { RootPrintRequestList, classesPrintRequestList } from "./RequestStyle";
import { FixedTableCell } from "../../FixedTableCell";
import NotFound from "../../../../../Error/NotFound";
const PREFIX = "SHIPMENT_PRINT";

export const classes = {
  hideSenderPhone: `${PREFIX}-hideSenderPhone`,
  requestInvoiceContainer: `${PREFIX}-requestInvoiceContainer`,
  printSticky: `${PREFIX}-printSticky`,
  stickyCode: `${PREFIX}-stickyCode`,
  stickyRecipientName: `${PREFIX}-stickyRecipientName`,
  stickyDestination: `${PREFIX}-stickyDestination`,
  stickyRecipientAddress: `${PREFIX}-stickyRecipientAddress`,
  receipt: `${PREFIX}-receipt`,
  receiptSmall: `${PREFIX}-receiptSmall`,
  leftRadius: `${PREFIX}-leftRadius`,
  rightRadius: `${PREFIX}-rightRadius`,
  body: `${PREFIX}-body`,
  section: `${PREFIX}-section`,
  header: `${PREFIX}-header`,
  reportHeader: `${PREFIX}-reportHeader`,
  tableCell: `${PREFIX}-tableCell`,
  centerContent: `${PREFIX}-centerContent`,
  barcode: `${PREFIX}-barcode`,
  tableHeader: `${PREFIX}-tableHeader`,
  logo: `${PREFIX}-logo`,
  dFlex: `${PREFIX}-dFlex`,
  tableBorder: `${PREFIX}-tableBorder`,
  marginRight1: `${PREFIX}-marginRight1`,
  width21: `${PREFIX}-width21`,
  width28: `${PREFIX}-width28`,
  width30: `${PREFIX}-width30`,
  width50: `${PREFIX}-width50`,
  width72: `${PREFIX}-width72`,
  width79: `${PREFIX}-width79`,
  width90: `${PREFIX}-width90`,
  width100: `${PREFIX}-width100`,
  height9: `${PREFIX}-height9`,
  height_3_13: `${PREFIX}-height_3_13`,
  height35: `${PREFIX}-height35`,
  height65: `${PREFIX}-height65`,
  borderRadius: `${PREFIX}-borderRadius`,
  borderRight: `${PREFIX}-borderRight`,
  headerStyle: `${PREFIX}-headerStyle`,
  logoImg: `${PREFIX}-logoImg`,
  flexChild: `${PREFIX}-flexChild`,
  container: `${PREFIX}-container`,
  topHeaders: `${PREFIX}-topHeaders`,
  details: `${PREFIX}-details`,
  notes: `${PREFIX}-notes`,
  borderBottom: `${PREFIX}-borderBottom`,
  description: `${PREFIX}-description`,
  footer: `${PREFIX}-footer`,
  reportFooter: `${PREFIX}-reportFooter`,
};

export const Root = styled("div")(({ theme }) => ({
  [`& .${classes.hideSenderPhone}`]: {
    display: "none !important",
  },

  [`& .${classes.requestInvoiceContainer}`]: {
    pageBreakAfter: "always",
    pageBreakInside: "avoid",
    height: "272mm",
    fontSize: "75%",
    color: "black",
    "&:first-of-type": {
      "& $receipt": {
        "& :first-of-type": {
          borderTop: "none",
          // backgroundColor:"red"
        },
      },
    },
    WebkitPrintColorAdjust: "exact !important",
    // -webkit-print-color-adjust: exact !important,
  },

  [`& .${classes.printSticky}`]: {
    pageBreakAfter: "always",
    pageBreakInside: "avoid",
    maxWidth: "5cm",
    maxHeight: "4cm",
    overflow: "hidden",
    fontSize: 11,
    color: "black",
  },

  [`& .${classes.stickyCode}`]: {
    height: "calc(100% * (1/4))",
    overflow: "hidden",
    fontSize: "30px !important",
  },

  [`& .${classes.stickyRecipientName}`]: {
    height: "calc(100% * (0.75/4))",
    overflow: "hidden",
    whiteSpace: "pre",
  },

  [`& .${classes.stickyDestination}`]: {
    height: "calc(100% * (0.75/4))",
    overflow: "hidden",
    whiteSpace: "pre",
  },

  [`& .${classes.stickyRecipientAddress}`]: {
    height: "calc(100% * (1.5/4))",
    overflow: "hidden",
  },

  [`& .${classes.container}`]: {
    flexDirection: "column",
    gap: 8,
  },
  [`& .${classes.details}`]: {
    flexDirection: "column",
    flex: "1 1 auto",
    minHeight: 0,
  },
  [`& .${classes.notes}`]: {
    flex: "1 1 auto",
    minHeight: "calc(100% / 21 * 5)",
  },
  [`& .${classes.description}`]: {
    flex: "1 1 auto",
    minHeight: "calc(100% / 21 * 9)",
  },

  [`& .${classes.flexChild}`]: {
    display: "flex",
    flex: "1 1 auto",
    minHeight: 0,
  },
  [`& .${classes.borderBottom}`]: {
    borderBottom: "1px solid black !important",
  },
  [`& .${classes.topHeaders}`]: {
    flex: "1 1 auto",
    minHeight: "calc(100% / 21 * 2.5)",
  },
  [`& .${classes.receipt}`]: {
    fontSize: 12,
    height: "50%",
    padding: "8mm",
    boxSizing: "border-box",
    textAlign: "start",
    borderTop: "1px dashed black",
    "&:first-of-type": {
      "@media print": {
        borderTop: "none",
      },
    },
    "@media print": {
      padding: "5px 0px !important",
    },
  },

  [`& .${classes.receiptSmall}`]: {
    height: "calc(100%/3)",
    padding: "6mm",
  },

  [`& .${classes.leftRadius}`]: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  [`& .${classes.rightRadius}`]: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  [`& .${classes.body}`]: {
    height: "35%",
    display: "flex",
    lineHeight: 1.1,
  },

  [`& .${classes.section}`]: {
    height: "100%",
  },

  [`& .${classes.header}`]: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    height: "18%",
  },

  [`& .${classes.reportHeader}`]: {
    whiteSpace: "pre-line",
    paddingLeft: 16,
    lineHeight: "115%",
    color: "black",
    fontSize: 11,
    margin: 0,
    height: 50,
    display: "flex !important",
    alignItems: "center",
  },

  [`& .${classes.tableCell}`]: {
    display: "flex",
    padding: "0 6px",
    // border: "1px solid black",
    // borderBlockEnd: "none",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },

  [`& .${classes.centerContent}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  [`& .${classes.barcode}`]: {
    fontFamily: "'Libre Barcode 39 Text'",
    fontSize: 48,
  },

  [`& .${classes.tableHeader}`]: {
    backgroundColor: "#ddd",
  },

  [`& .${classes.logo}`]: {
    height: "100%",
  },

  [`& .${classes.dFlex}`]: {
    display: "flex",
  },

  [`& .${classes.tableBorder}`]: {
    height: "inherit",
  },

  [`& .${classes.marginRight1}`]: {
    marginRight: "1%",
  },

  [`& .${classes.width21}`]: {
    width: "21%",
  },
  [`& .${classes.width28}`]: {
    width: "28%",
  },

  [`& .${classes.width30}`]: {
    width: "30%",
  },

  [`& .${classes.width50}`]: {
    width: "50%",
  },

  [`& .${classes.width72}`]: {
    width: "72%",
  },

  [`& .${classes.width79}`]: {
    width: "79%",
  },

  [`& .${classes.width90}`]: {
    width: "90%",
  },

  [`& .${classes.width100}`]: {
    width: "100%",
  },

  [`& .${classes.height9}`]: {
    height: "calc(100% / 21 * 9)",
  },

  [`& .${classes.height_3_13}`]: {
    height: "calc(100% * 3 / 13)",
  },

  [`& .${classes.height35}`]: {
    height: "35%",
  },

  [`& .${classes.height65}`]: {
    height: "40%",
  },

  [`& .${classes.borderRadius}`]: {
    borderRadius: 10,
    border: "1px solid black",
  },

  [`& .${classes.borderRight}`]: {
    borderRight: "1px solid black",
    textTransform: "capitalize",
  },

  [`& .${classes.headerStyle}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  [`& .${classes.logoImg}`]: {
    maxWidth: "100%",
    maxHeight: "48px",
  },
  [`& .${classes.footer}`]: {
    overflow: "hidden",
    height: "7%",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.reportFooter}`]: {
    whiteSpace: "pre-line",
    lineHeight: "115%",
    color: "black",
    fontSize: 11,
    margin: 0,
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box !important",
  },
}));

export default function WaybillA4(props) {
  const { t } = useTranslation();

  const { request, requestIndex, threeCopies, threeDifferent, logoImg, data } =
    props;
  useEffect(() => {
    if (request?.packages) {
      if (request?.packages.length === 0) return;
      // if (!zoomed) {

      const zoomDetails = zoom();

      let newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.href = process.env.PUBLIC_URL + "/" + zoomDetails?.css;

      document
        .querySelectorAll("#requestPrintTable")
        .forEach((i) => (i.style.zoom = zoomDetails.percent));

      document.querySelectorAll("#requestsTableContainer").forEach((i) => {
        i.style.minWidth = "100%";
        i.style.width = "100vw";
      });
      newLink.onload = () => {
        window.print();
        newLink.onload = null;
      };
      document.getElementById("maniContainer").appendChild(newLink);
      // }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.packages]);
  return (
    <div
      key={requestIndex}
      className={clsx(classes.receipt, {
        [classes.receiptSmall]: threeCopies || threeDifferent,
      })}
    >
      <div className={classes.header}>
        <div>{logoImg}</div>
        <div style={{ flexGrow: 1 }}>
          <p className={classes.reportHeader}>
            {data?.organization?.reportHeader}
          </p>
        </div>
        <div className={clsx(classes.barcode, classes.centerContent)}>
          *{request?.code}*
        </div>
      </div>
      <div className={classes.body}>
        {/********************** Right **********************/}
        <div
          className={clsx(classes.section, classes.marginRight1)}
          style={{ width: "50%" }}
        >
          <div
            className={clsx(
              classes.tableBorder,
              classes.dFlex,
              classes.container
            )}
          >
            <div
              className={clsx(
                classes.tableBorder,
                classes.dFlex,
                classes.borderRadius,
                classes.details
              )}
            >
              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("senderName")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.shipperName}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("senderPhone")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.shipperMobile}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("senderState")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.shipperState?.name}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("senderAddress")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.shipperAddress}
                </div>
              </div>

              <div className={clsx(classes.flexChild)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                  // style={{
                  //   borderBottom: "1px solid",
                  // }}
                >
                  {t("senderPostalCode")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.shipperPostalCode}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/********************** left **********************/}

        <div className={classes.section} style={{ width: "50%" }}>
          <div
            className={clsx(
              classes.dFlex,
              classes.container,
              classes.tableBorder
            )}
          >
            <div
              className={clsx(
                classes.dFlex,
                classes.details,
                classes.tableBorder,
                classes.borderRadius
              )}
            >
              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("consigneeName")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.consigneeName}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("recipientPhone")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.consigneeMobile}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("recipientState")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.consigneeState?.name}
                </div>
              </div>

              <div className={clsx(classes.flexChild, classes.borderBottom)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                >
                  {t("recipientAddress")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.consigneeAddress}
                </div>
              </div>

              <div className={clsx(classes.flexChild)}>
                <div
                  className={clsx(
                    classes.width21,
                    classes.tableCell,
                    classes.borderRight
                  )}
                  // style={{
                  //   borderBottom: "1px solid",
                  // }}
                >
                  {t("recipientPostalCode")}
                </div>
                <div className={clsx(classes.tableCell, classes.width79)}>
                  {request?.consigneePostalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(classes.borderRadius, classes.description)}
        style={{ textAlign: "center", overflow: "hidden", marginTop: "10px" }}
      >
        <div
          className={classes.width100}
          style={{
            textAlign: "center",
            wordBreak: "break-word",
            padding: 5,
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            MsWordBreak: "break-word",
            MsHyphens: "auto",
            MozHyphens: "auto",
            WebkitHyphens: "auto",
            hyphens: "auto",
          }}
        >
          {request?.packages && (
            <RootPrintRequestList id="maniContainer">
              {"reportDetails" === null ? (
                <NotFound />
              ) : (
                <Root>
                  <div id="printManifestContainer">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div
                              className={clsx(classes.requestsTable, {
                                // [classes.tableWidth]: tableZoom,
                              })}
                              id="requestsTableContainer"
                            >
                              <Table
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                                id="requestPrintTable"
                              >
                                <TableHead>
                                  <TableRow>
                                    <FixedTableCell>{t("code")}</FixedTableCell>
                                    <FixedTableCell>
                                      {t("product")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("productPrice")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("description")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("volume")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("totalWeight")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("chargeableAmount")}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                      {t("fragile")}
                                    </FixedTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {request?.packages &&
                                    request.packages?.map((row, index) => (
                                      <TableRow
                                        hover
                                        className={classes.tableRow}
                                        key={index}
                                      >
                                        {/* <FixedTableCell>{row.packageType?.name}</FixedTableCell> */}
                                        <FixedTableCell>
                                          {row?.code}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.product?.name}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.productPrice}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.description}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.volume}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.totalWeight}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                          {row?.chargeAmount}
                                        </FixedTableCell>

                                        <FixedTableCell>
                                          {row?.fragile ? (
                                            <Icon
                                              className={
                                                classesPrintRequestList.iconColor
                                              }
                                            >
                                              check_circle_outline
                                            </Icon>
                                          ) : (
                                            <Icon color="error">
                                              highlight_off
                                            </Icon>
                                          )}
                                        </FixedTableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Root>
              )}
            </RootPrintRequestList>
          )}
        </div>
      </div>

      {!(threeCopies || threeDifferent) && (
        <div className={classes.footer}>
          <p className={classes.reportFooter}>
            {data?.organization?.reportFooter}
          </p>
        </div>
      )}
    </div>
  );
}
