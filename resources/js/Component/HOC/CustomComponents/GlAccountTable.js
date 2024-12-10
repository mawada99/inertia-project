import React from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FixedTableCell } from "./FixedTableCell";
import TableFixedHeaderWraper from "./TableWithFixedHeader";
import FullScreenLoading from "../FunctionComponents/LoadingPages/FullScreenLoading";
import CellLink from "./CellLink";
import MUITablePagination from "../MUI/TablePagination/MUITablePagination";
import formatMoney from "../../../helpers/numbersDot";
import EmptyTableMessage from "../FunctionComponents/EmptyTableMessage";

const PREFIX = "GLTable";
const classes = {
  table: `${PREFIX}-table`,
  tableContainer: `${PREFIX}-tableContainer`,
};
const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingTop: "16px",
  [`& .${classes.table}`]: {
    display: "grid",
  },
  [`& .${classes.tableContainer}`]: {
    minHeight: "250px",
  },
}));
export default function GlAccountTable(props) {
  const {
    page,
    rowsPerPage,
    data,
    handleChangePage,
    handleChangeRowsPerPage,
    loading,
    tableData,
    count,
    classess,
    finance,
    currency,
    sub,
  } = props;
  const { t } = useTranslation();
  return (
    <StyledGrid container alignItems="flex-start">
      <Grid container item sm={12} component={Paper}>
        {loading ? (
          <FullScreenLoading height={"327px"} />
        ) : (
          <Grid container item className={classes.table}>
            <TableFixedHeaderWraper className={classes.tableContainer}>
              {data?.entryRecords?.data.length !== 0 ? (
                <Table aria-label="simple table">
                  <TableHead>
                    {finance && (
                      <TableRow>
                        <FixedTableCell colSpan={5} />

                        <FixedTableCell
                          className={classess.balance}
                          colSpan={2}
                        >
                          {t("balance")}
                        </FixedTableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <FixedTableCell>{t("theDate")}</FixedTableCell>
                      <FixedTableCell>{t("recordNumber")}</FixedTableCell>
                      <FixedTableCell>
                        {t("transactionDescription")}
                      </FixedTableCell>
                      <FixedTableCell>{t("debit")}</FixedTableCell>
                      <FixedTableCell>{t("credit")}</FixedTableCell>
                      {finance && (
                        <>
                          <FixedTableCell>{t("debit")}</FixedTableCell>
                          <FixedTableCell>{t("credit")}</FixedTableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finance && (
                      <TableRow className={classess.balanceFont}>
                        <FixedTableCell>{t("startBalance")}</FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell>
                          {data?.glAccount?.startBalance >= 0
                            ? "00.00"
                            : formatMoney(
                                Math.abs(data?.glAccount?.startBalance)
                              ) || "00.00"}
                        </FixedTableCell>
                        <FixedTableCell>
                          {data?.glAccount?.startBalance <= 0
                            ? "00.00"
                            : formatMoney(
                                Math.abs(data?.glAccount?.startBalance)
                              ) || "00.00"}
                        </FixedTableCell>
                      </TableRow>
                    )}
                    {tableData?.length !== 0 &&
                      tableData.map((row, index) => {
                        return (
                          <TableRow key={Math.random()}>
                            <FixedTableCell component="th" scope="row">
                              {row?.entry.date}
                            </FixedTableCell>
                            <CellLink
                              pathname={`/admin/finance/journal-entries/${row.entry.id}`}
                            >
                              {row?.entry.code}
                            </CellLink>
                            <FixedTableCell>{row.description}</FixedTableCell>
                            <FixedTableCell>
                              {sub
                                ? formatMoney(row?.accountedDebit.toFixed(2))
                                : formatMoney(row?.debit.toFixed(2))}
                            </FixedTableCell>
                            <FixedTableCell>
                              {sub
                                ? formatMoney(row?.accountedCredit.toFixed(2))
                                : formatMoney(row?.credit.toFixed(2))}
                            </FixedTableCell>
                            {finance && (
                              <>
                                <FixedTableCell>
                                  {formatMoney(row.totalDebit.toFixed(2))}
                                </FixedTableCell>
                                <FixedTableCell>
                                  {formatMoney(row.totalCredit.toFixed(2))}
                                </FixedTableCell>
                              </>
                            )}
                          </TableRow>
                        );
                      })}
                    {finance && (
                      <TableRow className={classess.balanceFont}>
                        <FixedTableCell>{t("endBalance")}</FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell></FixedTableCell>
                        <FixedTableCell>
                          {formatMoney(
                            data?.sumJournalEntryRecords?.debit + currency
                          )}
                        </FixedTableCell>
                        <FixedTableCell>
                          {formatMoney(
                            data?.sumJournalEntryRecords?.credit + currency
                          )}
                        </FixedTableCell>
                        <FixedTableCell>
                          {data?.glAccount?.endBalance >= 0
                            ? "00.00"
                            : formatMoney(
                                Math.abs(data?.glAccount?.endBalance)
                              ) || "00.00"}
                          {currency}
                        </FixedTableCell>
                        <FixedTableCell>
                          {data?.glAccount?.endBalance <= 0
                            ? "00.00"
                            : formatMoney(
                                Math.abs(data?.glAccount?.endBalance)
                              ) || "00.00"}
                          {currency}
                        </FixedTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <Grid container justifyContent="center" alignItems="center">
                  <EmptyTableMessage loading={false} />
                </Grid>
              )}
            </TableFixedHeaderWraper>
            <MUITablePagination
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              disableLastPage
            />
          </Grid>
        )}
      </Grid>
    </StyledGrid>
  );
}
