import {
    Box,
    Drawer,
    Paper,
    Table,
    TableHead,
    TableRow,
    Typography,
    Grid,
} from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
// import { TbDeviceDesktopSearch } from "react-icons/tb";
import PropTypes from "prop-types";
import TitleAppBar from "../../../Layout/TitleAppBar";
import LongMenu from "../../../Layout/MenuAppBar";
import FullScreenLoading from "../../HOC/FunctionComponents/LoadingPages/FullScreenLoading";
// import useWidth from "../../../Hooks/useWidth";
import TableFixedHeaderWraper from "../../HOC/CustomComponents/TableWithFixedHeader";
import { FixedTableCell } from "../../HOC/CustomComponents/FixedTableCell";
import useWidth from "../../../useWidth";

const PREFIX = "ListWrappers";

const classes = {
    mainSearch: `${PREFIX}-mainSearch`,
    main: `${PREFIX}-main`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    drawerHeader: `${PREFIX}-drawerHeader`,
    drawerNoHeader: `${PREFIX}-drawerNoHeader`,
    content: `${PREFIX}-content`,
    contentNoheader: `${PREFIX}-contentNoheader`,
    contentShift: `${PREFIX}-contentShift`,
    tablePaper: `${PREFIX}-tablePaper`,
    first_header_item: `${PREFIX}-first_header_item`,
    last_header_item: `${PREFIX}-last_header_item`,
    headerTable: `${PREFIX}-headerTable`,
    backgroundLoading: `${PREFIX}-backgroundLoading`,
    tableHeight: `${PREFIX}-tableHeight`,
    notFound: `${PREFIX}-notFound`,
    backgroundNoResult: `${PREFIX}-backgroundNoResult`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    height: "100%",
    [`& .${classes.mainSearch}`]: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        width: "100%",
    },

    [`& .${classes.main}`]: {
        width: "100%",
        padding: 0,
        margin: 0,
        display: "grid",
        height: "100%",
        alignContent: "space-between",
        backgroundColor: theme.palette.background.paper,
    },
    //////////////////////Drawer///////////////////
    [`& .${classes.drawer}`]: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },

    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth,
        zIndex: "250",
        left: "initial",
        right: "initial",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "100%",
        },
    },
    [`& .${classes.drawerNoHeader}`]: {
        width: drawerWidth,
        zIndex: "250",
        top: "72px",
        left: "initial",
        right: "initial",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "100%",
        },
    },

    [`& .${classes.drawerHeader}`]: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        marginTop: "48px",
    },

    [`& .${classes.content}`]: {
        flexGrow: 1,
        height: "calc(100vh - (48px + 40px + 64px))",
        [theme.breakpoints.down("sm")]: {
            height: "calc(100dvh - (48px + 40px + 56px))",
        },
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    [`& .${classes.contentNoheader}`]: {
        flexGrow: 1,

        height: "calc(100vh - (72px))",
        [theme.breakpoints.down("sm")]: {
            height: "calc(100dvh - (65px))",
        },
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    [`& .${classes.tableHeight}`]: {
        height: "100% !important",
        minHeight: "350px !important",
    },

    [`& .${classes.contentShift}`]: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: "auto",
        width: "calc(100% - 240px)",

        [theme.breakpoints.down("sm")]: {
            margin: "auto",
            width: "auto",
        },
    },

    [`& .${classes.tablePaper}`]: {
        borderRadius: 0,
        width: "100%",
        display: "grid",
        height: "100%",
        alignContent: "space-between",
    },
    [`& .${classes.headerTable}`]: {
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        textTransform: "capitalize",
    },
    [`& .${classes.first_header_item}`]: {
        zIndex: "101",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: "0",
        textTransform: "capitalize",
        [theme.breakpoints.up("sm")]: {
            left: "0",
        },
    },
    [`& .${classes.last_header_item}`]: {
        zIndex: "101",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: "0",
        textTransform: "capitalize",
        [theme.breakpoints.up("sm")]: {
            right: "0",
        },
    },
    [`& .${classes.backgroundLoading}`]: {
        flexGrow: 1,
    },
    [`& .${classes.backgroundNoResult}`]: {
        minHeight: "250px",
    },
    [`& .${classes.notFound}`]: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    },
}));

const drawerWidth = 240;

const ListWrapper = (props) => {
    const {
        icons,
        empty,
        loading,
        path,
        drawerState,
        pagination,
        tableBody,
        tableHeaders,
        type,
        filters,
        height,
        addCustomFilter,
        customFilters,
        noHeader,
    } = props;

    const { t } = useTranslation();

    const screenWidth = useWidth();

    const filterAnchor = screenWidth === "xs" ? "bottom" : "left";
    return (
        <Root>
            {(path || icons) && (
                <TitleAppBar path={path} type={type}>
                    {icons && <LongMenu icons={icons} />}
                </TitleAppBar>
            )}
            {filters && (
                <Drawer
                    className={clsx(classes.drawer)}
                    variant="persistent"
                    classes={{
                        paper: noHeader
                            ? classes.drawerNoHeader
                            : classes.drawerPaper,
                    }}
                    anchor={filterAnchor}
                    open={drawerState}
                    onClose={() => false}
                >
                    {!noHeader && <div className={classes.drawerHeader} />}
                    {filters}
                </Drawer>
            )}
            <Grid
                container
                justifyContent="center"
                spacing={3}
                className={clsx(
                    { [classes.tableHeight]: height },
                    classes.mainSearch,
                    {
                        [classes.contentShift]: drawerState,
                    },
                    noHeader ? classes.contentNoheader : classes.content
                )}
            >
                {loading || empty ? (
                    <Box
                        sx={{
                            gridTemplateRows: customFilters
                                ? "auto 1fr"
                                : "1fr",
                        }}
                        className={classes.main}
                    >
                        {customFilters && customFilters}
                        {loading ? (
                            <FullScreenLoading
                                height={customFilters ? "auto" : "100%"}
                                className={classes.backgroundLoading}
                            />
                        ) : (
                            <Box
                                height={"100%"}
                                textAlign="center"
                                sx={{ flexGrow: 1 }}
                                className={classes.notFound}
                            >
                                {/* <TbDeviceDesktopSearch
                                    size={100}
                                    color="gray"
                                /> */}
                                {/* <img width="50%" src={emptyList} alt={"delivery box"} style={{ filter: "invert(0.30)" }} /> */}
                                <Box
                                    component={Typography}
                                    variant="h6"
                                    sx={{ color: "gray" }}
                                    marginTop={2}
                                >
                                    {t("noResult")}
                                </Box>
                                {addCustomFilter && addCustomFilter}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Paper
                        className={classes.tablePaper}
                        sx={{
                            gridTemplateRows: customFilters
                                ? "auto 1fr auto"
                                : "1fr auto",
                        }}
                    >
                        {customFilters && customFilters}
                        <TableFixedHeaderWraper>
                            <Table
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                            >
                                {Array.isArray(tableHeaders) ? (
                                    <TableHead>
                                        <TableRow>
                                            {tableHeaders.map((ele, i) => {
                                                if (ele.className === "FH") {
                                                    return (
                                                        <FixedTableCell
                                                            key={i}
                                                            className={
                                                                classes.first_header_item
                                                            }
                                                        >
                                                            {t(ele.name)}
                                                        </FixedTableCell>
                                                    );
                                                } else if (
                                                    ele.className === "LH"
                                                ) {
                                                    return (
                                                        <FixedTableCell
                                                            key={i}
                                                            className={
                                                                classes.last_header_item
                                                            }
                                                        >
                                                            {t(ele.name)}
                                                        </FixedTableCell>
                                                    );
                                                } else {
                                                    return ele.name ? (
                                                        <FixedTableCell
                                                            key={i}
                                                            className={
                                                                classes.headerTable
                                                            }
                                                        >
                                                            {t(ele.name)}
                                                        </FixedTableCell>
                                                    ) : (
                                                        <FixedTableCell
                                                            key={i}
                                                            className={
                                                                classes.headerTable
                                                            }
                                                        />
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    </TableHead>
                                ) : (
                                    tableHeaders
                                )}
                                {tableBody}
                            </Table>
                        </TableFixedHeaderWraper>
                        {pagination && pagination}
                    </Paper>
                )}
            </Grid>
        </Root>
    );
};

ListWrapper.propTypes = {
    icons: PropTypes.any,
    empty: PropTypes.any.isRequired,
    loading: PropTypes.any.isRequired,
    path: PropTypes.any,
    filters: PropTypes.any,
    drawerState: PropTypes.any,
    pagination: PropTypes.any.isRequired,
    tableBody: PropTypes.any.isRequired,
    tableHeaders: PropTypes.any.isRequired,
    type: PropTypes.any,
};

export default ListWrapper;
