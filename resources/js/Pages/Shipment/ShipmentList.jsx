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
import { Link, router } from "@inertiajs/react";

const ShipmentsList = ({ shipments }) => {
    const { t } = useTranslation();
    const screenWidth = useWidth();
    //   const history = useHistory();
    const [refetch, setrefetch] = useState(true);
    const urlQuery = urlParameters(window.location.search);
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
    useEffect(() => {
        urlQuery["type"] !== "" && setValue("type", urlQuery["type"]);
        urlQuery["price"] !== "" && setValue("price", urlQuery["price"]);
        urlQuery["payment_type"] !== "" &&
            setValue("payment_type", urlQuery["payment_type"]);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listShipments = shipments?.data;

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
        console.log("Before filtering:", data);

        // Remove empty or undefined fields
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) =>
                    value !== undefined && value !== null && value !== ""
            )
        );

        console.log("After filtering:", filteredData);

        // Send only the filled filter values
        router.get(shipments.first_page_url, {
            ...filteredData,
        });
    };

    const handleChangePage = (event, newPage) => {};

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        // Include the selected rowsPerPage as a query parameter in the request
        router.get(shipments.first_page_url, {
            perPage: newRowsPerPage,
        });
    };
    const icons = [
        {
            id: "filterList",
            action: toggleDrawer(filterAnchor, !drawerState[filterAnchor]),
        },
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
                                <Grid
                                    sm={12}
                                    spacing={1}
                                    alignItems="flex-start"
                                >
                                    <ControlMUItextField
                                        control={control}
                                        errors={errors}
                                        name={"price"}
                                        label={t("price")}
                                    />
                                </Grid>
                                <Grid
                                    sm={12}
                                    spacing={1}
                                    alignItems="flex-start"
                                >
                                    <ControlMUItextField
                                        control={control}
                                        errors={errors}
                                        name={"type"}
                                        label={t("type")}
                                    />
                                </Grid>
                                <Grid
                                    sm={12}
                                    spacing={1}
                                    alignItems="flex-start"
                                >
                                    <ControlMUItextField
                                        control={control}
                                        errors={errors}
                                        name={"payment_type"}
                                        label={t("paymentType")}
                                    />
                                </Grid>
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
                            name: "paymentType",
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
                            count={shipments.total}
                            rowsPerPage={shipments?.per_page}
                            page={shipments?.current_page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            shipments={shipments}
                            rowsPerPageOptions={[10, 20, 50]}
                        />
                    }
                />
            </RootStyleList>
        </LayoutWithDrawer>
    );
};

export default ShipmentsList;
