import React, { useEffect, useState } from "react";
import { TableBody, TableRow, Button, Grid } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FixedTableCell } from "../../Component/HOC/CustomComponents/FixedTableCell";
import MUITablePagination from "../../Component/HOC/MUI/TablePagination/MUITablePagination";
import useWidth from "../../useWidth";
import { urlParameters } from "../../Component/HOC/CustomFunctions/urlParameters";
import ControlMUItextField from "../../Component/HOC/MUI/ControlMUItextField";
import ListWrapper from "../../Component/CustomComponents/ListWrapper/ListWrapper";
import { classes, RootStyleList } from "../../GlobalStyles/ListStyle";
import LayoutWithDrawer from "../LayoutWithDrawo";
import { Link, router, usePage } from "@inertiajs/react";
import CellLink from "../../Component/HOC/CustomComponents/CellLink";

const ShipmentsList = ({ shipments }) => {
    const { props } = usePage();
    const loading = !props.shipments;
    console.log("!props.shipments" + loading);

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
        {
            id: "add",
            title: "createNew",
            action: () => router.get("/shipments/save"),
            icon: Add,
            permission: "shipping.shipment.create",
        },
    ];

    return (
        <LayoutWithDrawer>
            <RootStyleList>
                <ListWrapper
                    drawerState={drawerState[filterAnchor]}
                    icons={icons}
                    path={shipments?.path}
                    empty={listShipments?.length === 0}
                    loading={loading}
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
                                            <CellLink
                                                pathname={`/shipments/${row?.id}`}
                                            >
                                                {row?.id}
                                            </CellLink>
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
