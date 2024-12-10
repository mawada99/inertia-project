import React, { useState } from "react";
import {
  Paper,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTabsContext } from "../PackagesTableView/TabContext";
import { FixedTableCell } from "../FixedTableCell";
import { StyledTableRow } from "../PackagesTableView/Tabs";
import TableFixedHeaderWraper from "../TableWithFixedHeader";
import FullScreenLoading from "../../FunctionComponents/LoadingPages/FullScreenLoading";
import CellLink from "../CellLink";
import MUITablePagination from "../../MUI/TablePagination/MUITablePagination";
import EmptyTableMessage from "../../FunctionComponents/EmptyTableMessage";
import formatMoney from "../../../../helpers/numbersDot";

const BillOrInvoiceTable = (props) => {
  const { billData, invoiceData, classes } = useTabsContext();
  const href = document.location.href.split("#");
  const invoice = href[1] === "invoices";
  const data = invoice ? invoiceData : billData;
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);

  let totalAmount = 0;
  const handlePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <Grid
        container
        item
        sm={12}
        md={12}
        className={classes.tabpanel}
        component={Paper}
      >
        <Grid container item className={classes.table}>
          {!data ? (
            <Paper>
              <FullScreenLoading minHeight={"100px"} />
            </Paper>
          ) : (
            <TableFixedHeaderWraper>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <FixedTableCell>{t("code")}</FixedTableCell>
                    <FixedTableCell>
                      {invoice
                        ? t("chargeElementInvc")
                        : t("chargeElementBill")}
                    </FixedTableCell>
                    <FixedTableCell>{t("priceModes")}</FixedTableCell>
                    <FixedTableCell>{t("chargeableUnits")}</FixedTableCell>
                    <FixedTableCell>{t("chargePrice")}</FixedTableCell>
                    <FixedTableCell>{t("value")}</FixedTableCell>
                    <FixedTableCell>{t("tax")}</FixedTableCell>
                    <FixedTableCell>{t("total")}</FixedTableCell>
                    <FixedTableCell>{t("currency")}</FixedTableCell>
                    <FixedTableCell>{t("totallocal")}</FixedTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    (rowsPerPage > 0
                      ? data?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data
                    )?.map((row, index) =>
                      row?.lines?.map((line, lineIndex) => {
                        const lineTotal =
                          (line?.totalAmount || 0) * (row?.exchangeRate || 1); // Calculate total for this line
                        totalAmount += lineTotal; // Accumulate total

                        return (
                          <TableRow hover key={lineIndex}>
                            <CellLink
                              pathname={
                                invoice
                                  ? `/admin/invoices/${row?.id}`
                                  : `/admin/bills/${row?.id}`
                              }
                            >
                              {row?.code}
                            </CellLink>
                            <FixedTableCell>
                              {line?.chargeElement.name}
                            </FixedTableCell>
                            <FixedTableCell>
                              {line?.priceMode?.name}
                            </FixedTableCell>
                            <FixedTableCell>
                              {line?.chargeableUnits}
                            </FixedTableCell>
                            <FixedTableCell>{line?.chargePrice}</FixedTableCell>
                            <FixedTableCell>{line?.lineAmount}</FixedTableCell>
                            <FixedTableCell>{line?.taxAmount}</FixedTableCell>
                            <FixedTableCell>{line?.totalAmount}</FixedTableCell>
                            <FixedTableCell>
                              {row?.currency?.name}
                            </FixedTableCell>
                            <FixedTableCell>
                              {formatMoney(
                                (
                                  line?.totalAmount * row?.exchangeRate
                                )?.toFixed(2)
                              )}
                            </FixedTableCell>
                          </TableRow>
                        );
                      })
                    )}
                  {data?.length > 0 && (
                    <TableRow>
                      <FixedTableCell colSpan={8} />
                      <FixedTableCell>{t("total")}</FixedTableCell>
                      <FixedTableCell>
                        {formatMoney(totalAmount?.toFixed(2))}
                      </FixedTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {!(data.length > 0) && (
                <EmptyTableMessage message={t("noResult")} />
              )}
            </TableFixedHeaderWraper>
          )}
          <MUITablePagination
            count={data?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePage}
            onRowsPerPageChange={handleRowsPerPage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BillOrInvoiceTable;
