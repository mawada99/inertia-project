import React, { useEffect, useState } from "react";
import { ChevronLeft, Delete, Edit, Image } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DELETE_REQUEST_PACKAGE } from "./Graphql";
import clsx from "clsx";
import { FixedTableCell } from "../FixedTableCell";
import EmptyTableMessage from "../../FunctionComponents/EmptyTableMessage";
import MUITablePagination from "../../MUI/TablePagination/MUITablePagination";
import MutationWithDialog from "../MutationWithDialog";
import CustomDialog from "../CustomDialog";
import PackageView from "./PackageView";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Globals } from "../../Classes/Globals";

const StyledTableRowChild = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const StyledTableBodyChild = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.appTitle,
}));
export default function Row(props) {
  const {
    row,
    openSignatureDialog,
    requestId,
    openDialog,
    deleteLoad,
    setPackages,
    index,
    setDisabled,
    openDetailsDialog,
    // deleteRequestPackage,
    handleToggleCheck, // New callback to update selected IDs in parent
    handleSelectAll, // New callback for "select all" action
    selectedIds,
    classes,
    handleFetchPackageDetails,
    findChild,
    editDetails,
  } = props;

  const { t } = useTranslation();
  const user = Globals.user;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState(selectedIds); // Local state to manage checked IDs
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dialogState, setDialogState] = useState(false);
  const openPackageView = (data) => {
    setDialogState(true);
  };
  const onCloseDialog = () => {
    setDialogState(false);
  };
  const handleOpenDialog = () => {
    setOpenDeleteDialog(true);
  };
  const currentIds = row.details?.data?.map((i) => i.id); // Get IDs of current row details
  const detailsCount = currentIds?.length; // Total number of details in current row
  const fieldSelected = currentIds?.filter((i) =>
    checkedIds.includes(i)
  )?.length; // Count of selected IDs in the current row

  // Determines if "Select All" should be in an indeterminate state
  const indeterminate = () => fieldSelected > 0 && fieldSelected < detailsCount;
  // Determines if "Select All" should be fully checked
  const selectAllChecked = () =>
    detailsCount > 0 && fieldSelected === detailsCount;

  const handlePage = (event, newPage) => {
    setPage(newPage);
    handleFetchPackageDetails(row?.id, newPage, rowsPerPage);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    handleFetchPackageDetails(row?.id, 0, event.target.value);
    setPage(0);
  };

  const onCheckAll = (e) => {
    let ids = [];
    if (e.target.checked) {
      const checkedAll = new Set([...checkedIds, ...currentIds]);
      ids = [...checkedAll]; // Add all currentIds to the checkedIds set
      handleSelectAll(currentIds, true); // Pass updated list to parent
    } else {
      ids = checkedIds.filter((i) => !currentIds.includes(i)); // Remove currentIds from checkedIds
      handleSelectAll(currentIds, false); // Pass updated list to parent
    }
    setCheckedIds(ids); // Update local state
  };
  const toggleCheck = (e, id) => {
    const checked = e.target.checked;
    let updateCheckedIds = [...checkedIds];
    if (checked) {
      updateCheckedIds.push(id); // Add ID if checked
      handleToggleCheck(id, true); // Update parent state with ID selected
    } else {
      updateCheckedIds = updateCheckedIds.filter((i) => i !== id); // Remove ID if unchecked
      handleToggleCheck(id, false); // Update parent state with ID unselected
    }
    setCheckedIds(updateCheckedIds); // Update local state
  };
  useEffect(() => {
    if (open && !row.details) {
      handleFetchPackageDetails(row?.id, page, rowsPerPage);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  // console.log(findChild);
  const PackagesView = <PackageView packageData={row} />;
  return (
    <React.Fragment>
      <MutationWithDialog
        mutaion={DELETE_REQUEST_PACKAGE.query}
        setOpenDelete={setOpenDeleteDialog}
        openDelete={openDeleteDialog}
        dialogTitle={t("deleteRecord")}
        dialogContent={t("deleteRecordMessage")}
        mutaionProps={{
          variables: { id: parseInt(row.id) },
        }}
        onCompleted={() => {
          setPackages((prev) => {
            const filterd = prev.filter(
              (i, deleteIndex) => deleteIndex !== page * rowsPerPage + index
            );
            return filterd;
          });
          page * rowsPerPage + index === 0 &&
            !findChild &&
            setDisabled((prev) => ({
              ...prev,
              addPackage: false,
            }));
        }}
        onCompleteMessage={t("successfullyDeletedRecord")}
      />
      <CustomDialog
        fullWidth
        maxWidth="md"
        open={dialogState}
        onClose={onCloseDialog}
        actions={
          <>
            <Button color="primary" onClick={onCloseDialog}>
              {t("cancel")}
            </Button>
          </>
        }
        content={dialogState ? PackagesView : null}
      />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* Main Table Row with Collapsible Icon and Data */}
        <FixedTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <ChevronLeft />}
          </IconButton>
        </FixedTableCell>
        {/* <FixedTableCell component="th" scope="row">
            {row.code}
          </FixedTableCell> */}
        <FixedTableCell>{row?.code}</FixedTableCell>
        <FixedTableCell>{row?.priceMode?.name}</FixedTableCell>
        <FixedTableCell>{row?.volume}</FixedTableCell>
        <FixedTableCell>{row?.weight}</FixedTableCell>
        <FixedTableCell>{row?.chargeAmount}</FixedTableCell>
        <FixedTableCell>{row?.currency?.name}</FixedTableCell>
        <FixedTableCell>{row?.packageType?.name}</FixedTableCell>
        <FixedTableCell>{row?.count}</FixedTableCell>
        <FixedTableCell>{row?.totalWeight}</FixedTableCell>
        {row?.image ? (
          <FixedTableCell>
            <IconButton
              size="small"
              onClick={() => openSignatureDialog(row.image)}
            >
              <Image fontSize="small" />
            </IconButton>
          </FixedTableCell>
        ) : (
          <FixedTableCell></FixedTableCell>
        )}
        <FixedTableCell>
          {row?.fragile ? (
            <Icon className={classes.iconColor}>check_circle_outline</Icon>
          ) : (
            <Icon color="error">highlight_off</Icon>
          )}
        </FixedTableCell>
        <FixedTableCell>
          <IconButton size="small" onClick={() => openPackageView(row)}>
            <VisibilityIcon />
          </IconButton>
        </FixedTableCell>
        {requestId && (
          <FixedTableCell>
            <IconButton size="small" onClick={() => openDialog(row)}>
              <Edit />
            </IconButton>
            <IconButton
              size="small"
              disabled={deleteLoad}
              onClick={() => {
                handleOpenDialog();
              }}
            >
              <Delete />
            </IconButton>
          </FixedTableCell>
        )}
      </TableRow>

      {open && (
        <>
          {/* Collapsible Row Content */}
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  {!row?.details?.data ? (
                    <>
                      <EmptyTableMessage
                        loading={true}
                        message={t("noResult")}
                      />
                    </>
                  ) : (
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <StyledTableRowChild>
                          {/* Table Details Header */}
                          <FixedTableCell
                            className={clsx(classes.toolbar, classes.checkbox)}
                          >
                            <Checkbox
                              edge="start"
                              id="check-all-details"
                              indeterminate={indeterminate()}
                              checked={selectAllChecked()}
                              inputProps={{
                                "aria-label": "select all desserts",
                              }}
                              tabIndex={-1}
                              onChange={(e) => onCheckAll(e)}
                              disableRipple
                            />
                          </FixedTableCell>
                          {(editDetails || !requestId) && (
                            <FixedTableCell>{t("pieceNumber")}</FixedTableCell>
                          )}
                          <FixedTableCell>{t("wareHouse")}</FixedTableCell>
                          <FixedTableCell>{t("missing")}</FixedTableCell>
                          <FixedTableCell>{t("damaged")}</FixedTableCell>

                          <FixedTableCell sx={{ text: "center" }}>
                            {t("barcode")}
                          </FixedTableCell>
                          {<FixedTableCell> </FixedTableCell>}
                          <FixedTableCell>{t("loaded")}</FixedTableCell>
                          <FixedTableCell>{t("unLoaded")}</FixedTableCell>
                        </StyledTableRowChild>
                      </TableHead>
                      <StyledTableBodyChild>
                        {row?.details?.data &&
                          row?.details?.data.map((detail, index) => (
                            <TableRow key={index}>
                              <FixedTableCell
                                key={`${index}-che`}
                                className={clsx(
                                  classes.toolbar,
                                  classes.bodyCheckbox
                                )}
                                component="th"
                                scope="row"
                              >
                                <Checkbox
                                  edge="start"
                                  checked={checkedIds.includes(detail?.id)} // Check based on local state
                                  onChange={(e) => toggleCheck(e, detail?.id)}
                                  disableRipple
                                />
                              </FixedTableCell>
                              {(editDetails || !requestId) && (
                                <FixedTableCell className={classes.toolbar}>
                                  {`${detail?.pieceNumber}/${detail?.package?.request?.detailsCount}`}
                                </FixedTableCell>
                              )}

                              <FixedTableCell
                                component="th"
                                scope="row"
                                className={classes.toolbar}
                              >
                                {detail.warehouse?.name}
                              </FixedTableCell>
                              <FixedTableCell
                                className={classes.toolbar}
                                component="th"
                                scope="row"
                              >
                                {detail?.missing ? (
                                  <Icon className={classes.iconColor}>
                                    check_circle_outline
                                  </Icon>
                                ) : (
                                  <Icon color="error">highlight_off</Icon>
                                )}
                              </FixedTableCell>
                              <FixedTableCell
                                className={classes.toolbar}
                                component="th"
                                scope="row"
                              >
                                {detail?.damaged ? (
                                  <Icon className={classes.iconColor}>
                                    check_circle_outline
                                  </Icon>
                                ) : (
                                  <Icon color="error">highlight_off</Icon>
                                )}
                              </FixedTableCell>

                              <FixedTableCell
                                className={clsx(
                                  classes.toolbar,
                                  classes.barcode
                                )}
                                component="th"
                                scope="row"
                                dir="ltr"
                                auto={true}
                              >
                                {detail?.barcode}
                              </FixedTableCell>
                              {editDetails &&
                              user.hasPermission(
                                "freight.package_detail.update"
                              ) &&
                              detail?.editable ? (
                                <FixedTableCell className={classes.toolbar}>
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      openDetailsDialog(detail, row.id)
                                    }
                                  >
                                    <Edit />
                                  </IconButton>
                                </FixedTableCell>
                              ) : (
                                <FixedTableCell className={classes.toolbar}>
                                  {" "}
                                </FixedTableCell>
                              )}
                              <FixedTableCell
                                className={classes.toolbar}
                                component="th"
                                scope="row"
                              >
                                {detail?.loaded ? (
                                  <Icon className={classes.iconColor}>
                                    check_circle_outline
                                  </Icon>
                                ) : (
                                  <Icon color="error">highlight_off</Icon>
                                )}
                              </FixedTableCell>
                              <FixedTableCell
                                className={classes.toolbar}
                                component="th"
                                scope="row"
                              >
                                {detail?.unloaded ? (
                                  <Icon className={classes.iconColor}>
                                    check_circle_outline
                                  </Icon>
                                ) : (
                                  <Icon color="error">highlight_off</Icon>
                                )}
                              </FixedTableCell>
                            </TableRow>
                          ))}
                      </StyledTableBodyChild>
                    </Table>
                  )}
                  <MUITablePagination
                    onRowsPerPageChange={handleRowsPerPage}
                    count={row?.details?.paginatorInfo?.total ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePage}
                    rowsPerPageOptions={[5, 10, 15]}
                    disableLastPage
                  />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      )}
    </React.Fragment>
  );
}
