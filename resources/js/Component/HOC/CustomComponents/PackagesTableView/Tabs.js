import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
  Box,
  Button,
  TableContainer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import config from "../../../../config.json";
import { DELETE_REQUEST_PACKAGE } from "./Graphql";
import { gql, useMutation } from "@apollo/client";
import { EnhancedTableToolbarView } from "./EnhancedTableToolbarView";
import Row from "./Row";
import { FixedTableCell } from "../FixedTableCell";
import EmptyTableMessage from "../../FunctionComponents/EmptyTableMessage";
import TableFixedHeaderWraper from "../TableWithFixedHeader";
import CustomDialog from "../CustomDialog";
import MUITablePagination from "../../MUI/TablePagination/MUITablePagination";
import { useTabsContext } from "./TabContext";
import FullScreenLoading from "../../FunctionComponents/LoadingPages/FullScreenLoading";
const PREFIX = "CustomerTables";

const classes = {
  table: `${PREFIX}-table`,
  tableContainer: `${PREFIX}-tableContainer`,
  tableContainerTabes: `${PREFIX}-tableContainerTabes`,
  title: `${PREFIX}-title`,
  toolbar: `${PREFIX}-toolbar`,
  focus: `${PREFIX}-focus`,
  tableRow: `${PREFIX}-tableRow`,
  packageType: `${PREFIX}-packageType`,
  iconColor: `${PREFIX}-iconColor`,
  barcode: `${PREFIX}-barcode`,
  addIcon: `${PREFIX}-addIcon`,
  toolbars: `${PREFIX}-toolbars`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.table}`]: {
    display: "grid",
  },

  [`& .${classes.tableContainer}`]: {
    minHeight: "250px",
  },
  [`& .${classes.tableContainerTabes}`]: {
    minHeight: "205px",
  },

  [`& .${classes.title}`]: {
    flex: 1,
  },

  [`& .${classes.toolbar}`]: {
    // width: "100%",
    // backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid" + theme.palette.background.paper,
    // borderRight: "1px solid " + theme.palette.divider,
  },
  [`& .${classes.toolbars}`]: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid " + theme.palette.divider,
    borderRight: "1px solid " + theme.palette.divider,
  },

  [`& .${classes.focus}`]: {
    backgroundColor: theme.palette.action.hover,
  },

  [`& .${classes.tableRow}`]: {
    "&:hover": {
      cursor: "pointer",
    },
  },

  [`& .${classes.packageType}`]: {
    marginTop: theme.spacing(1),
  },
  [`& .${classes.iconColor}`]: {
    color: theme.palette.success.main,
  },
  [`& .${classes.barcode}`]: {
    fontFamily: "'Libre Barcode 39 Text'",
    fontSize: 30,
  },
  [`& .${classes.addIcon}`]: {
    color: theme.palette.success.main,
  },
}));
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.appTitle,
}));

export default function Tabs(props) {
  const {
    setDialogState,
    setUpdatePackages,
    setUpdateDetails,
    requestId,
    id,
    packages = [],
    setPackages,
    setDisabled,
    requestData,
    handleFetchPackageDetails,
    operationData,
    editDetails,
    tabsLoading,
  } = useTabsContext();
  const { t } = useTranslation();

  //////////// package Functions ////////////

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const handlePage = (event, newPage) => {
    setPage(newPage);
  };
  const [selectedIds, setSelectedIds] = useState([]);

  // Handle toggling individual checkbox in the parent
  const handleToggleCheck = (id, isChecked) => {
    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        // If checked, add to selectedIds
        return [...prevSelectedIds, id];
      } else {
        // If unchecked, remove from selectedIds
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      }
    });
  };

  // Handle "select all" checkbox in the parent
  const handleSelectAll = (ids, isChecked) => {
    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        // If checked, add all currentIds
        return [...new Set([...prevSelectedIds, ...ids])];
      } else {
        // If unchecked, remove all currentIds
        return prevSelectedIds.filter((id) => !ids.includes(id));
      }
    });
  };
  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const [deleteRequestPackage, { loading: deleteLoad }] = useMutation(
    gql`
      ${DELETE_REQUEST_PACKAGE.query}
    `,
    {
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
    }
  );

  const openDialog = (details) => {
    setDialogState((prev) => ({
      ...prev,
      packages: true,
    }));
    details && setUpdatePackages(details);
  };
  const openDetailsDialog = (details, id) => {
    setDialogState((prev) => ({
      ...prev,
      details: true,
    }));
    details &&
      setUpdateDetails((prev) => ({
        ...prev,
        details: details,
        id: id,
      }));
  };
  const [dialogDetails, setDialogDetails] = useState({
    state: false,
    function: null,
    confirmAction: true,
    title: "",
    content: "",
  });
  let getBackendUri = (imgPath) => {
    const domain = config.backend.domain
      ? config.backend.domain
      : window.location.hostname;

    return `${config.backend.protocol}://${domain}:${config.backend.port}/${imgPath}`;
  };
  const closeConfirmationDialog = () => {
    setDialogDetails((prev) => ({
      ...prev,
      state: false,
    }));
  };
  const openSignatureDialog = (imgPath) => {
    setDialogDetails((prev) => ({
      state: true,
      title: null,
      content: (
        <Box
          sx={{ background: "#fff", width: "100%" }}
          component="img"
          alt="signature"
          src={getBackendUri(imgPath.path)}
        />
      ),
      confirmAction: false,
      function: () => {},
    }));
  };

  const packagesTab = (
    <Grid
      item
      sm={12}
      md={12}
      className={classes.packageType}
      component={Paper}
    >
      <CustomDialog
        title={dialogDetails.title}
        fullWidth
        maxWidth="xs"
        onClose={closeConfirmationDialog}
        content={dialogDetails.content}
        open={dialogDetails.state}
        actions={
          dialogDetails.function !== null && (
            <>
              <Button color="primary" onClick={closeConfirmationDialog}>
                {dialogDetails.confirmAction ? t("cancel") : t("close")}
              </Button>
              {dialogDetails.confirmAction && (
                <Button color="primary" onClick={dialogDetails.function}>
                  {t("confirm")}
                </Button>
              )}
            </>
          )
        }
      >
        {dialogDetails.function === null && " "}
      </CustomDialog>
      <EnhancedTableToolbarView
        classes={classes}
        requestId={requestId}
        idView={id}
        packages={packages}
        requestData={requestData}
        openDialog={openDialog}
        selectedId={selectedIds}
        operationData={operationData}
      />
      <Grid container className={classes.table}>
        <TableFixedHeaderWraper>
          {tabsLoading && !packages?.length > 0 ? (
            <Paper>
              <FullScreenLoading minHeight={"100px"} />
            </Paper>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <StyledTableRow>
                    <FixedTableCell> </FixedTableCell>
                    <FixedTableCell>{t("packageCode")}</FixedTableCell>
                    <FixedTableCell>{t("priceModes")}</FixedTableCell>
                    <FixedTableCell>{t("volume")}</FixedTableCell>
                    <FixedTableCell>{t("weight")}</FixedTableCell>
                    <FixedTableCell>{t("value")}</FixedTableCell>
                    <FixedTableCell>{t("currency")}</FixedTableCell>
                    <FixedTableCell>{t("type")}</FixedTableCell>
                    <FixedTableCell>{t("count")}</FixedTableCell>
                    <FixedTableCell>{t("totalWeight")}</FixedTableCell>
                    <FixedTableCell>{t("image")}</FixedTableCell>
                    <FixedTableCell>{t("fragile")}</FixedTableCell>
                    <FixedTableCell>{t(" ")}</FixedTableCell>
                    {requestId && <FixedTableCell> </FixedTableCell>}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {packages &&
                    (rowsPerPage > 0
                      ? packages.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : packages
                    )?.map((row, index) => (
                      <Row
                        key={row?.code}
                        row={row}
                        index={index}
                        classes={classes}
                        requestId={requestId}
                        openDialog={openDialog}
                        openDetailsDialog={openDetailsDialog}
                        handleToggleCheck={handleToggleCheck}
                        handleSelectAll={handleSelectAll}
                        selectedIds={selectedIds}
                        deleteLoad={deleteLoad}
                        setPackages={setPackages}
                        setDisabled={setDisabled}
                        deleteRequestPackage={deleteRequestPackage}
                        openSignatureDialog={openSignatureDialog}
                        handleRowsPerPage={handleRowsPerPage}
                        handlePage={handlePage}
                        handleFetchPackageDetails={handleFetchPackageDetails}
                        editDetails={editDetails}
                      />
                    ))}
                </TableBody>
              </Table>
              {!(packages?.length > 0) && (
                <EmptyTableMessage
                  loading={tabsLoading}
                  message={t("noResult")}
                />
              )}
            </TableContainer>
          )}
        </TableFixedHeaderWraper>
        <MUITablePagination
          count={packages?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Grid>
    </Grid>
  );

  return (
    <StyledGrid container alignItems="flex-start">
      {packagesTab}
    </StyledGrid>
  );
}
