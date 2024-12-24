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

const ShipmentsList = (props) => {
    const { t } = useTranslation();
    const screenWidth = useWidth();
    //   const history = useHistory();
    const [refetch, setrefetch] = useState(true);
    const urlQuery = urlParameters(window.location.search);
    const validUrlParameters = Object.keys(urlQuery).length !== 0;
    const [autocompleteValues, setAutocompleteValues] = useState({
        destinationAgency: null,
        originAgency: null,
        branch: null,
        loadingMode: null,
        status: null,
        originCountry: null,
        destinationCountry: null,
        originPort: null,
        destinationPort: null,
        mode: [],
        shippingDirection: [],
    });
    const [noData, setNoData] = useState(true);
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

    const [scheduledDepartureDate, setScheduledDepartureDate] = useState([
        urlQuery["fromDateSDD"] ? urlQuery["fromDateSDD"] : null,
        urlQuery["toDateSDD"] ? urlQuery["toDateSDD"] : null,
    ]);
    const [scheduledArrivalDate, setScheduledArrivalDate] = useState([
        urlQuery["fromDateSAD"] ? urlQuery["fromDateSAD"] : null,
        urlQuery["toDateSAD"] ? urlQuery["toDateSAD"] : null,
    ]);
    const [actualDepartureDate, setActualDepartureDate] = useState([
        urlQuery["fromDateADD"] ? urlQuery["fromDateADD"] : null,
        urlQuery["toDateADD"] ? urlQuery["toDateADD"] : null,
    ]);
    const [actualArrivalDate, setActualArrivalDate] = useState([
        urlQuery["fromDateAAD"] ? urlQuery["fromDateAAD"] : null,
        urlQuery["toDateAAD"] ? urlQuery["toDateAAD"] : null,
    ]);
    const [shipmentDate, setShipmentDate] = useState([
        urlQuery["shipmentFromDate"] ? urlQuery["shipmentFromDate"] : null,
        urlQuery["shipmentToDate"] ? urlQuery["shipmentToDate"] : null,
    ]);
    const [createdDate, setCreatedDate] = useState([
        urlQuery["createdFromDate"] ? urlQuery["createdFromDate"] : null,
        urlQuery["createdToDate"] ? urlQuery["createdToDate"] : null,
    ]);
    const createdFromDate = moment(createdDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const createdToDate = moment(createdDate[1])
        .locale("en")
        .format("YYYY-MM-DD");
    const fromDateSDD = moment(scheduledDepartureDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const toDateSDD = moment(scheduledDepartureDate[1])
        .locale("en")
        .format("YYYY-MM-DD");
    const fromDateSAD = moment(scheduledArrivalDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const toDateSAD = moment(scheduledArrivalDate[1])
        .locale("en")
        .format("YYYY-MM-DD");

    const fromDateADD = moment(actualDepartureDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const toDateADD = moment(actualDepartureDate[1])
        .locale("en")
        .format("YYYY-MM-DD");
    const fromDateAAD = moment(actualArrivalDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const toDateAAD = moment(actualArrivalDate[1])
        .locale("en")
        .format("YYYY-MM-DD");
    const shipmentFromDate = moment(shipmentDate[0])
        .locale("en")
        .format("YYYY-MM-DD");
    const shipmentToDate = moment(shipmentDate[1])
        .locale("en")
        .format("YYYY-MM-DD");
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const initSearch = () => {
        let searchParameters = {
            page: 0,
            refetch: true,
            ...(scheduledDepartureDate[0] && { fromDateSDD }),
            ...(scheduledDepartureDate[1] && { toDateSDD }),
            ...(createdDate[0] && { createdFromDate }),
            ...(createdDate[1] && { createdToDate }),
            ...(scheduledArrivalDate[0] && { fromDateSAD }),
            ...(scheduledArrivalDate[1] && { toDateSAD }),
            ...(actualDepartureDate[0] && { fromDateADD }),
            ...(actualDepartureDate[1] && { toDateADD }),
            ...(actualArrivalDate[0] && { fromDateAAD }),
            ...(actualArrivalDate[1] && { toDateAAD }),
            ...(shipmentDate[0] && { shipmentFromDate }),
            ...(shipmentDate[1] && { shipmentToDate }),
        };
        delete urlQuery["rowsPerPage"];
        if (validUrlParameters) {
            if (urlQuery["code"])
                urlQuery["code"] = urlQuery["code"].toString();
            if (urlQuery["name"])
                urlQuery["name"] = urlQuery["name"].toString();
            if (urlQuery["shippingMode"]) {
                urlQuery["shippingMode"] = urlQuery["shippingMode"].split(",");
            }
            if (urlQuery["shippingDirection"]) {
                urlQuery["shippingDirection"] =
                    urlQuery["shippingDirection"].split(",");
            }
            if (urlQuery["loadingMode"]) {
                urlQuery["loadingMode"] = urlQuery["loadingMode"].split(",");
            }
            if (urlQuery["status"]) {
                urlQuery["status"] = urlQuery["status"].split(",");
            }
            if (urlQuery.fromDateSDD || urlQuery.toDateSDD) {
                const scheduledDepartureDate = {
                    ...(urlQuery?.fromDateSDD && {
                        fromDate: urlQuery?.fromDateSDD,
                    }),
                    ...(urlQuery?.toDateSDD && { toDate: urlQuery?.toDateSDD }),
                };
                delete urlQuery["fromDateSDD"];
                delete urlQuery["toDateSDD"];
                urlQuery.scheduledDepartureDate = scheduledDepartureDate;
            }
            if (urlQuery.createdFromDate || urlQuery.createdToDate) {
                const createdDate = {
                    ...(urlQuery?.createdFromDate && {
                        fromDate: urlQuery?.createdFromDate,
                    }),
                    ...(urlQuery?.createdToDate && {
                        toDate: urlQuery?.createdToDate,
                    }),
                };
                delete urlQuery["createdFromDate"];
                delete urlQuery["createdToDate"];
                urlQuery.createdDate = createdDate;
            }
            if (urlQuery.fromDateSAD || urlQuery.toDateSAD) {
                const scheduledArrivalDate = {
                    ...(urlQuery?.fromDateSAD && {
                        fromDate: urlQuery?.fromDateSAD,
                    }),
                    ...(urlQuery?.toDateSAD && {
                        toDate: urlQuery?.toDateSAD,
                    }),
                };
                delete urlQuery["fromDateSAD"];
                delete urlQuery["toDateSAD"];
                urlQuery.scheduledArrivalDate = scheduledArrivalDate;
            }

            if (urlQuery.fromDateADD || urlQuery.toDateADD) {
                const actualDepartureDate = {
                    ...(urlQuery?.fromDateADD && {
                        fromDate: urlQuery?.fromDateADD,
                    }),
                    ...(urlQuery?.toDateADD && { toDate: urlQuery?.toDateADD }),
                };
                delete urlQuery["fromDateADD"];
                delete urlQuery["toDateADD"];
                urlQuery.actualDepartureDate = actualDepartureDate;
            }
            if (urlQuery.fromDateAAD || urlQuery.toDateAAD) {
                const actualArrivalDate = {
                    ...(urlQuery?.fromDateAAD && {
                        fromDate: urlQuery?.fromDateAAD,
                    }),
                    ...(urlQuery?.toDateAAD && {
                        toDate: urlQuery?.toDateAAD,
                    }),
                };
                delete urlQuery["fromDateAAD"];
                delete urlQuery["toDateAAD"];
                urlQuery.actualArrivalDate = actualArrivalDate;
            }

            if (urlQuery.shipmentFromDate || urlQuery.shipmentToDate) {
                const shipmentDate = {
                    ...(urlQuery?.shipmentFromDate && {
                        fromDate: urlQuery?.shipmentFromDate,
                    }),
                    ...(urlQuery?.shipmentToDate && {
                        toDate: urlQuery?.shipmentToDate,
                    }),
                };
                delete urlQuery["shipmentFromDate"];
                delete urlQuery["shipmentToDate"];
                urlQuery.shipmentDate = shipmentDate;
            }
            urlQuery["page"] = urlQuery["page"] ?? 0;
            searchParameters = urlQuery;
        }
        return {
            ...searchParameters,
        };
    };
    const [search, setSearch] = useState(initSearch());
    const [openExport, setOpenExport] = useState(false);

    const listShipments = [];

    useEffect(() => {
        urlQuery["code"] && setValue("code", urlQuery["code"]);
        setAutocompleteValues((prev) => ({
            ...(urlQuery["branchId"] && {
                branch: urlQuery["branchId"],
            }),
            ...(urlQuery["originAgencyId"] && {
                originAgency: urlQuery["originAgencyId"],
            }),
            ...(urlQuery["destinationAgencyId"] && {
                destinationAgency: urlQuery["destinationAgencyId"],
            }),
            ...(urlQuery["shippingMode"] && {
                mode: urlQuery["shippingMode"],
            }),
            ...(urlQuery["shippingDirection"] && {
                shippingDirection: urlQuery["shippingDirection"],
            }),
            ...(urlQuery["loadingMode"] && {
                loadingMode: urlQuery["loadingMode"],
            }),
            ...(urlQuery["status"] && {
                status: urlQuery["status"],
            }),
            ...(urlQuery["destinationPortId"] && {
                destinationPort: urlQuery["destinationPortId"],
            }),
            ...(urlQuery["destinationCountryId"] && {
                destinationCountry: urlQuery["destinationCountryId"],
            }),
            ...(urlQuery["originCountryId"] && {
                originCountry: urlQuery["originCountryId"],
            }),
            ...(urlQuery["originPortId"] && {
                originPort: urlQuery["originPortId"],
            }),
        }));
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openExportDialog = () => {
        setOpenExport(true);
    };

    const resetScheduledDepartureDate = () => {
        setScheduledDepartureDate([null, null]);
    };
    const resetCreatedDate = () => {
        setCreatedDate([null, null]);
    };
    const resetScheduledArrivalDate = () => {
        setScheduledArrivalDate([null, null]);
    };
    const resetActualDepartureDate = () => {
        setActualDepartureDate([null, null]);
    };
    const resetActualArrivalDate = () => {
        setActualArrivalDate([null, null]);
    };
    const resetShipmentDate = () => {
        setShipmentDate([null, null]);
    };
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
        let handledData = {
            code: data.code,
            branchId: data.branchId,
            originAgencyId: data.originAgencyId,
            destinationAgencyId: data.destinationAgencyId,
            shippingMode: data.shippingMode,
            shippingDirection: data.shippingDirection,
            status: data.status,
            loadingMode: data.loadingMode,
            destinationCountryId: data.destinationCountryId,
            destinationPortId: data.destinationPortId,
            originCountryId: data.originCountryId,
            originPortId: data.originPortId,
            ...(scheduledDepartureDate[0] && { fromDateSDD }),
            ...(scheduledDepartureDate[1] && { toDateSDD }),
            ...(createdDate[0] && { createdFromDate }),
            ...(createdDate[1] && { createdToDate }),
            ...(scheduledArrivalDate[0] && { fromDateSAD }),
            ...(scheduledArrivalDate[1] && { toDateSAD }),
            ...(actualDepartureDate[0] && { fromDateADD }),
            ...(actualDepartureDate[1] && { toDateADD }),
            ...(actualArrivalDate[0] && { fromDateAAD }),
            ...(actualArrivalDate[1] && { toDateAAD }),
            ...(shipmentDate[0] && { shipmentFromDate }),
            ...(shipmentDate[1] && { shipmentToDate }),
            page: 0,
        };
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
        if (handledData.fromDateSDD || handledData.toDateSDD) {
            const scheduledDepartureDate = {
                ...(handledData?.fromDateSDD && {
                    fromDate: handledData?.fromDateSDD,
                }),
                ...(handledData?.toDateSDD && {
                    toDate: handledData?.toDateSDD,
                }),
            };
            delete handledData["fromDateSDD"];
            delete handledData["toDateSDD"];
            handledData.scheduledDepartureDate = scheduledDepartureDate;
        }
        if (handledData.createdFromDate || handledData.createdToDate) {
            const createdDate = {
                ...(handledData?.createdFromDate && {
                    fromDate: handledData?.createdFromDate,
                }),
                ...(handledData?.createdToDate && {
                    toDate: handledData?.createdToDate,
                }),
            };
            delete handledData["createdFromDate"];
            delete handledData["createdToDate"];
            handledData.createdDate = createdDate;
        }
        if (handledData.fromDateSAD || handledData.toDateSAD) {
            const scheduledArrivalDate = {
                ...(handledData?.fromDateSAD && {
                    fromDate: handledData?.fromDateSAD,
                }),
                ...(handledData?.toDateSAD && {
                    toDate: handledData?.toDateSAD,
                }),
            };
            delete handledData["fromDateSAD"];
            delete handledData["toDateSAD"];
            handledData.scheduledArrivalDate = scheduledArrivalDate;
        }
        if (handledData.fromDateADD || handledData.toDateADD) {
            const actualDepartureDate = {
                ...(handledData?.fromDateADD && {
                    fromDate: handledData?.fromDateADD,
                }),
                ...(handledData?.toDateADD && {
                    toDate: handledData?.toDateADD,
                }),
            };
            delete handledData["fromDateADD"];
            delete handledData["toDateADD"];
            handledData.actualDepartureDate = actualDepartureDate;
        }
        if (handledData.fromDateAAD || handledData.toDateAAD) {
            const actualArrivalDate = {
                ...(handledData?.fromDateAAD && {
                    fromDate: handledData?.fromDateAAD,
                }),
                ...(handledData?.toDateAAD && {
                    toDate: handledData?.toDateAAD,
                }),
            };
            delete handledData["fromDateAAD"];
            delete handledData["toDateAAD"];
            handledData.actualArrivalDate = actualArrivalDate;
        }
        if (handledData.shipmentFromDate || handledData.shipmentToDate) {
            const shipmentDate = {
                ...(handledData?.shipmentFromDate && {
                    fromDate: handledData?.shipmentFromDate,
                }),
                ...(handledData?.shipmentToDate && {
                    toDate: handledData?.shipmentToDate,
                }),
            };
            delete handledData["shipmentFromDate"];
            delete handledData["shipmentToDate"];
            handledData.shipmentDate = shipmentDate;
        }
        console.log(handledData);

        setSearch((prev) => ({
            ...handledData,
            refetch: !prev.refetch,
        }));
        for (const key in handledData) {
            if (handledData[key] === null) {
                delete handledData[key];
            }
        }
    };

    const parseData = (data) => {
        return data;
    };
    const handleChangePage = (event, newPage) => {
        pushUrlSearch({
            ...urlQuery,
            page: newPage,
            rowsPerPage: rowsPerPage,
        });

        setSearch((prev) => ({ ...prev, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        pushUrlSearch({
            ...urlQuery,
            page: 0,
            rowsPerPage: +event.target.value,
        });

        setRowsPerPage(+event.target.value);
        setSearch((prev) => ({ ...prev, page: 0 }));
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
                            name: "shipmentCode",
                            className: "FH",
                        },
                        {
                            name: "status",
                        },
                        {
                            name: "shipmentDate",
                        },
                        {
                            name: "branch",
                        },
                        {
                            name: "originCountry",
                        },
                        {
                            name: "originPort",
                        },
                        {
                            name: "destinationCountry",
                        },
                        {
                            name: "destinationPort",
                        },
                        {
                            name: "shippingMode",
                        },
                        {
                            name: "shippingDirection",
                        },
                        {
                            name: "loadingMode",
                        },
                        {
                            name: "senderName",
                        },
                        {
                            name: "senderPhone",
                        },
                        {
                            name: "senderAddress",
                        },
                        {
                            name: "senderPostalCode",
                        },
                        {
                            name: "senderState",
                        },
                        {
                            name: "consigneeName",
                        },
                        {
                            name: "recipientPhone",
                        },
                        {
                            name: "recipientAddress",
                        },
                        {
                            name: "recipientPostalCode",
                        },
                        {
                            name: "recipientState",
                        },
                        {
                            name: "scheduledDepartureDate",
                        },
                        {
                            name: "scheduledArrivalDate",
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
                                                {row.shippingMode?.name}
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
