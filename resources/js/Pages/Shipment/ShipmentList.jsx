import React, { useEffect, useState } from "react";
import { TableBody, TableRow, Button, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
// import CellLink from "../HOC/CustomComponents/CellLink";
// import MUITablePagination from "../HOC/MUI/TablePagination/MUITablePagination";
// import { FixedTableCell } from "../HOC/CustomComponents/FixedTableCell";
// import { pushUrl, windowUrl } from "../HOC/CustomFunctions/pushUrl";
// import ListWrapper from "../CustomComponents/ListWrapper/ListWrapper";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import useWidth from "../../Hooks/useWidth";
// import config from "../../config.json";
// import Grid from "@mui/material/Unstable_Grid2";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { urlParameters } from "../HOC/CustomFunctions/urlParameters";
// import {
//   LIST_LOOKUP_ENTRIES_DROPDOWN,
// } from "../../GlobalsQuery/ListDropdown/ListDropdown";
// import ControlMUItextField from "../HOC/MUI/ControlMUItextField";

// import { MultipleAutocomplete } from "../HOC/MUI/MultipleAutocomplete";
import moment from "moment";
// import MUIDateRangeCustom from "../HOC/MUI/MUIDateRangeCustom";
// import { TableCellColor } from "../HOC/CustomComponents/TableCellColor";
// import ExportShipments from "./ExportShipments";
// import { RootStyleList, classes } from "../../GlobalStyles/ListStyle";
// import CustomExportExcel from "../HOC/CustomComponents/CustomExportExcel";
import { FixedTableCell } from "../../Component/HOC/CustomComponents/FixedTableCell";
import MUITablePagination from "../../Component/HOC/MUI/TablePagination/MUITablePagination";
import useWidth from "../../useWidth";
import { urlParameters } from "../../Component/HOC/CustomFunctions/urlParameters";
import ControlMUItextField from "../../Component/HOC/MUI/ControlMUItextField";
import ListWrapper from "../../Component/CustomComponents/ListWrapper/ListWrapper";
import { classes, RootStyleList } from "../../GlobalStyles/ListStyle";
import LayoutWithDrawer from "../LayoutWithDrawo";

const ShipmentsList = ({ shipments }) => {
    console.log(shipments);

    const { t } = useTranslation();
    const screenWidth = useWidth();
    //   const history = useHistory();
    const [refetch, setrefetch] = useState(true);
    const urlQuery = urlParameters(window.location.search);
    const validUrlParameters = Object.keys(urlQuery).length !== 0;
    const [rowsPerPage, setRowsPerPage] = useState(
        urlQuery["rowsPerPage"] ?? 20
    );
    const filterAnchor = screenWidth === "xs" ? "bottom" : "left";
    const [drawerState, setDrawerState] = React.useState({
        top: true,
        left: screenWidth === "xs" ? false : true,
        bottom: screenWidth === "xs" ? false : true,
        right: screenWidth === "xs" ? false : true,
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const [search, setSearch] = useState();

    const listShipments = shipments;

    const pushUrlSearch = (param) => {
        const queryParams = [];
        for (const i in param) {
            encodeURIComponent(param[i]) &&
                queryParams.push(
                    encodeURIComponent(i) + "=" + encodeURIComponent(param[i])
                );
        }
        const queryString = queryParams.join("&");

        // const url = history.createHref({
        //   pathname: `/admin/shipments`,
        //   search: "?" + queryString,
        // });
        // windowUrl(url);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            (event.type === "keydown" || event.type === "submit") &&
            (event.type === "submit" ||
                event.key === "Tab" ||
                event.key === "Shift")
        ) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
    };

    const onSubmit = (data) => {
        filterAnchor === "bottom" &&
            setDrawerState({ ...drawerState, [filterAnchor]: false });
        refetch ? setrefetch(false) : setrefetch(true);
        let handledData = {};
        console.log(handledData);

        for (const key in handledData) {
            if (
                handledData[key] === undefined ||
                handledData[key] === "" ||
                handledData[key] === null ||
                handledData[key].length === 0
            ) {
                delete handledData[key];
            }
        }
        pushUrlSearch({
            ...handledData,
            rowsPerPage: rowsPerPage,
        });

        console.log(handledData);

        // setSearch((prev) => ({
        //     ...handledData,
        //     refetch: !prev.refetch,
        // }));
        for (const key in handledData) {
            if (handledData[key] === null) {
                delete handledData[key];
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        pushUrlSearch({
            ...urlQuery,
            page: newPage,
            rowsPerPage: rowsPerPage,
        });

        // setSearch((prev) => ({ ...prev, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        pushUrlSearch({
            ...urlQuery,
            page: 0,
            rowsPerPage: +event.target.value,
        });

        setRowsPerPage(+event.target.value);
        // setSearch((prev) => ({ ...prev, page: 0 }));
    };

    const icons = [
        {
            id: "filterList",
            action: toggleDrawer(filterAnchor, !drawerState[filterAnchor]),
        },
        // {
        //   id: "add",
        //   action: () => pushUrl(props, `/admin/shipments/create`),
        //   permission: "freight.shipment.create",
        // },
        // {
        //     id: "export",
        //     action: openExportDialog,
        //     disabled: !Boolean(data),
        // },
    ];

    return (
        <LayoutWithDrawer>
            <RootStyleList>
                <ListWrapper
                    drawerState={drawerState[filterAnchor]}
                    icons={icons}
                    // path={props.match.ph}
                    empty={listShipments?.length === 0}
                    loading={false}
                    filters={
                        <Grid
                            container
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid
                                container
                                sm={12}
                                justifyContent="flex-start"
                                spacing={1}
                                className={classes.filterField}
                            >
                                <Grid sm={12} alignItems="flex-start">
                                    <ControlMUItextField
                                        control={control}
                                        errors={errors}
                                        name={"code"}
                                        label={t("code")}
                                    />
                                </Grid>
                                {/* <Grid sm={12} alignItems="flex-start">
                <MultipleAutocomplete
                  valueKey="code"
                  multiple
                  hideCode={true}
                  control={control}
                  errors={errors}
                  name={"status"}
                  label={t("status")}
                  parseData={(data) => parseData(data)}
                  variables={{ input: { code: "FR_SHIPMENT_STATUS" } }}
                  query={LIST_LOOKUP_ENTRIES_DROPDOWN.query}
                  defaultValue={autocompleteValues.status}
                  skip={noData}
                />
              </Grid> */}
                                {/* <Grid sm={12} alignItems="flex-start">
                <MUIDateRangeCustom
                  startText={t("createdAt")}
                  value={createdDate}
                  onChangeValue={(value) => setCreatedDate(value)}
                  resetDate={resetCreatedDate}
                />
              </Grid> */}
                            </Grid>
                            <Grid
                                container
                                sm={12}
                                className={classes.button}
                                alignItems="flex-end"
                                justifyContent="flex-end"
                            >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    startIcon={<Search />}
                                >
                                    {t("search")}
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    tableHeaders={[
                        {
                            name: "price",
                        },
                        {
                            name: "type",
                        },
                        {
                            name: "payment_type",
                        },
                    ]}
                    tableBody={
                        <TableBody>
                            {listShipments &&
                                listShipments?.map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                            className={classes.tableRow}
                                        >
                                            {/* <TableCellColor align="left" status={row?.status} />
                    <FixedTableCell>
                      {dateFormat(row?.shipmentDate)}
                    </FixedTableCell>
                   */}
                                            <FixedTableCell>
                                                {row.price}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {row.type}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {row.payment_type}
                                            </FixedTableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    }
                    pagination={
                        <MUITablePagination
                            count={2}
                            rowsPerPage={rowsPerPage}
                            page={0}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    }
                />
            </RootStyleList>
        </LayoutWithDrawer>
    );
};

export default ShipmentsList;
