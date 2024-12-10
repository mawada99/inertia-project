/* eslint-disable no-useless-concat */
import React, { useCallback, useState } from "react";

import { styled } from "@mui/material/styles";

import {
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";

import { gql, useQuery } from "@apollo/client";
import { Cancel, CheckCircle } from "@mui/icons-material";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { QUERY_LIST } from "./Graphql";
import SearchFilter from "./SearchFilter";
import EmptyTableMessage from "../../FunctionComponents/EmptyTableMessage";
import MUITablePagination from "../../MUI/TablePagination/MUITablePagination";
import CustomTableRow from "./CustomTableRow";
import { FixedTableCell } from "../FixedTableCell";
import TableFixedHeaderWraper from "../TableWithFixedHeader";
import useWidth, { isWidthDown } from "../../../../Hooks/useWidth";
import PackageCommoditiesProvider from "./PackageCommoditiesProvider";

const TOOLBAR_PREFIX = "styledToolbar";

const toolbarClasses = {
  highlight: `${TOOLBAR_PREFIX}-highlight`,
  title: `${TOOLBAR_PREFIX}-title`,
  filterButton: `${TOOLBAR_PREFIX}-filterButton`,
  toolbar: `${TOOLBAR_PREFIX}-toolbar`,
  shipmentCode: `${TOOLBAR_PREFIX}-shipmentCode`,
};

const StyledToolbar = styled("div")(({ theme }) => ({
  width: "100%",
  zIndex: 1,

  [`& .${toolbarClasses.highlight}`]:
    theme.palette.mode === "light"
      ? {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[300],
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[800],
        },

  [`& .${toolbarClasses.title}`]: {
    flex: "1 1 15%",
  },

  [`& .${toolbarClasses.filterButton}`]: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  [`& .${toolbarClasses.toolbar}`]: {
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1),
    },
  },
  [`& .${toolbarClasses.shipmentCode}`]: {
    display: "flex",
    whiteSpace: "nowrap",
  },
}));

const PREFIX = "BillList";

const classes = {
  track: `${PREFIX}-track`,
  paper: `${PREFIX}-paper`,
  filters: `${PREFIX}-filters`,
  header: `${PREFIX}-header`,
};

const Root = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(0, 0),
  width: "100%",
  backgroundColor: theme.palette.background.default,

  [`& .${classes.track}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    [theme.breakpoints.down("md")]: {
      // flexWrap: "wrap",
    },
  },

  [`& .${classes.paper}`]: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflowX: "auto",
    maxHeight: `calc(100vh - 150px)`,
  },

  [`& .${classes.filters}`]: {
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 72px)",
    },
    [theme.breakpoints.up("sm")]: {
      width: "360px",
    },

    height: "100%",
    overflow: "hidden",
  },
}));

const EnhancedTableToolbar = (props) => {
  const screenWidth = useWidth();
  const screenIsSmall = isWidthDown("sm", screenWidth);
  const { numSelected, done, clear, disabled, filter } = props;

  return (
    <StyledToolbar>
      <Toolbar
        className={clsx(
          toolbarClasses.toolbar,
          {
            [toolbarClasses.highlight]: numSelected > 0,
          },
          classes.header
        )}
      >
        {!screenIsSmall && filter}
        {screenIsSmall && filter}

        <IconButton
          aria-label="done"
          sx={{ color: "success.main" }}
          disabled={disabled}
          onClick={() => {
            done();
            // setSelected(selectedRows); // Now triggers selection
          }}
          size="large"
        >
          <CheckCircle />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={() => clear()}
          color={"primary"}
          size="large"
        >
          <Cancel />
        </IconButton>
      </Toolbar>
    </StyledToolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  done: PropTypes.func.isRequired,
};

const CustomList = (props) => {
  const { done, setSelected, selected, filters, pathType } = props;

  const [dataList, setDataList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // Only one selected bill
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const [drawerState, setDrawerState] = useState(false);
  const [queryVariables, setQueryVariables] = useState({
    refetch: true,
  });

  const LIST_QUERY = QUERY_LIST(`list${pathType}s`, `${pathType}s`);
  const { refetch, ...restVariables } = queryVariables;
  const { data, loading } = useQuery(
    gql`
      ${LIST_QUERY.query}
    `,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      variables: {
        first: rowsPerPage,
        page: page + 1,
        input: {
          ...(restVariables.search && { code: restVariables.search[0] }),

          ...filters,
        },
      },
      onCompleted: (data) => {
        const handledData = data?.[`list${pathType}s`]?.data;

        let updatedDate = handledData.filter((i) => {
          //// Check if selected is not null or undefined, and if i.code is in selected
          return i?.code !== selected?.code; // Keep items where i.code is not in selected
        });

        setDataList(
          updatedDate.map((i) => ({
            data: i,
            select: i.id === selectedRow?.data?.id ? true : false, // No selection initially
          }))
        );
      },
    }
  );

  // Update selected row
  const handleRowClick = (data) => {
    setDataList((prev) =>
      prev.map((req) =>
        req.data.code === data.data.code
          ? { ...req, select: true }
          : { ...req, select: false }
      )
    );
    setSelectedRow(data);
  };

  const handleDone = () => {
    done();
    setSelected(selectedRow); // Pass the selected bill when done is clicked
  };

  const updateSelectedBillByForm = useCallback(
    ({ code, checkIsEmpty, name, value }) => {
      const update = [...dataList];
      const productIndex = update.findIndex((i) => {
        return i.data.code === code;
      });
      if (checkIsEmpty !== null || checkIsEmpty !== undefined)
        update[productIndex]["valid"] = checkIsEmpty;
      update[productIndex][name] = value;
      setDataList(update);
    },
    [dataList]
  );
  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  let tableBody = null;
  const toggleFilterDrawer = () => setDrawerState(!drawerState);

  const resetPage = () => setPage(0);

  const filtersForm = (
    <SearchFilter
      {...{ resetPage, loading }}
      preventPushUrl
      queryVariables={(variables) => setQueryVariables(variables)}
      onSubmitFunc={() => setDrawerState(false)}
    />
  );

  if (!loading && dataList.length > 0) {
    tableBody = (
      <Grid
        container
        justifyContent="end"
        sx={{ width: "100%" }}
        className={classes.paper}
      >
        <TableFixedHeaderWraper
          sx={{ minHeight: "250px" }}
          className={classes.tableContainer}
        >
          <Table aria-label="simple table" sx={{ cursor: "pointer" }}>
            <TableHead>
              <TableRow>
                <FixedTableCell> </FixedTableCell>
                <FixedTableCell>{t("code")}</FixedTableCell>
                {pathType === "Request" || pathType === "Shipment" ? (
                  <>
                    <FixedTableCell>{t("shippingMode")}</FixedTableCell>
                    <FixedTableCell>{t("shippingDirection")}</FixedTableCell>
                    <FixedTableCell>{t("senderName")}</FixedTableCell>
                    <FixedTableCell>{t("consigneeName")} </FixedTableCell>
                  </>
                ) : (
                  <>
                    <FixedTableCell>{t("branch")}</FixedTableCell>
                    <FixedTableCell>{t("value")}</FixedTableCell>
                    <FixedTableCell>{t("currency")} </FixedTableCell>
                    <FixedTableCell>{t("exchangeRate")} </FixedTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((bill, index) => {
                const isSelected = bill.select; // Check if the row is selected
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <CustomTableRow
                    pathType={pathType}
                    key={bill.data.code}
                    data={bill}
                    selected={isSelected} // Pass selection status for styling
                    onClick={() => handleRowClick(bill)} // Select the clicked row
                    labelId={labelId}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableFixedHeaderWraper>
        <MUITablePagination
          onRowsPerPageChange={handleRowsPerPage}
          count={data?.[`list${pathType}s`]?.paginatorInfo?.total ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePage}
          rowsPerPageOptions={[5, 10, 15]}
          disableLastPage
        />
      </Grid>
    );
  }
  return (
    <PackageCommoditiesProvider value={{ updateSelectedBillByForm }}>
      <Root container justifyContent="center">
        <Grid item container sm={12} alignContent="flex-start">
          <EnhancedTableToolbar
            toggleFilterDrawer={toggleFilterDrawer}
            numSelected={selectedRow ? 1 : 0}
            done={handleDone}
            clear={() => {
              done();
              setSelectedRow(null);
            }}
            disabled={!Boolean(selectedRow?.data)}
            filter={filtersForm}
          />
          {loading ? (
            <Grid
              container
              item
              justifyContent="center"
              className={classes.track}
              marginBottom="50px"
            >
              <CircularProgress />
            </Grid>
          ) : dataList.length > 0 ? (
            tableBody
          ) : (
            <EmptyTableMessage loading={false} message={t("noResult")} />
          )}
        </Grid>
      </Root>
    </PackageCommoditiesProvider>
  );
};

export default CustomList;
