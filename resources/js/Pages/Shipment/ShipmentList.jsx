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
    const { t } = useTranslation();
    const screenWidth = useWidth();

    const [drawerState, setDrawerState] = useState({
        left: screenWidth !== "xs",
        bottom: screenWidth === "xs",
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        const urlQuery = urlParameters(window.location.search);
        setValue("type", urlQuery["type"] || "");
        setValue("price", urlQuery["price"] || "");
        setValue("payment_type", urlQuery["payment_type"] || "");
    }, [setValue]);

    const listShipments = shipments?.data;

    const toggleDrawer = (anchor, open) => () => {
        setDrawerState((prev) => ({ ...prev, [anchor]: open }));
    };

    const onSubmit = (data) => {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value)
        );
        router.get(shipments.first_page_url, filteredData);
    };

    const handleChangePage = (event, newPage) => {
        router.get(shipments.first_page_url, { page: newPage + 1 });
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        router.get(shipments.first_page_url, { perPage: newRowsPerPage });
    };

    const icons = [
        {
            id: "filterList",
            action: toggleDrawer("left", !drawerState.left),
        },
        {
            id: "add",
            title: "createNew",
            action: () => router.get("/shipments/save"),
            icon: Add,
        },
    ];

    return (
        <LayoutWithDrawer>
            <RootStyleList>
                <ListWrapper
                    drawerState={drawerState.left}
                    icons={icons}
                    path={shipments?.path}
                    empty={!listShipments?.length}
                    loading={loading}
                    filters={
                        <Grid
                            container
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            spacing={2}
                        >
                            <Grid item sm={12}>
                                <ControlMUItextField
                                    control={control}
                                    errors={errors}
                                    name="price"
                                    label={t("price")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <ControlMUItextField
                                    control={control}
                                    errors={errors}
                                    name="type"
                                    label={t("type")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <ControlMUItextField
                                    control={control}
                                    errors={errors}
                                    name="payment_type"
                                    label={t("paymentType")}
                                />
                            </Grid>
                            <Grid item sm={12} className={classes.button}>
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
                        { name: "code" },
                        { name: "price" },
                        { name: "type" },
                        { name: "paymentType" },
                    ]}
                    tableBody={
                        <TableBody>
                            {listShipments?.map((row, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    className={classes.tableRow}
                                >
                                    <CellLink pathname={`/shipments/${row.id}`}>
                                        {row.id}
                                    </CellLink>
                                    <FixedTableCell>{row.price}</FixedTableCell>
                                    <FixedTableCell>{row.type}</FixedTableCell>
                                    <FixedTableCell>
                                        {row.payment_type}
                                    </FixedTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                    pagination={
                        <MUITablePagination
                            count={shipments.total}
                            rowsPerPage={shipments.per_page}
                            page={shipments.current_page - 1}
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
