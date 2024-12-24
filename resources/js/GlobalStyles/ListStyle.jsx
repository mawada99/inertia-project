import styled from "@emotion/styled";
import { Grid } from "@mui/material";

/* --------------------------------- Style For Request Form --------------------------------- */
const PREFIXLIST = "StyleList";
export const classes = {
    button: `${PREFIXLIST}-button`,
    filterField: `${PREFIXLIST}-filterField`,
    iconColor: `${PREFIXLIST}-iconColor`,
    filterForm: `${PREFIXLIST}-filterForm`,
    last_header_item: `${PREFIXLIST}-last_header_item`,
    checkboxTable_code: `${PREFIXLIST}-checkboxTable_code`,
    tableRow: `${PREFIXLIST}-tableRow`,
    bodyCheckbox: `${PREFIXLIST}-bodyCheckbox`,
    checkbox: `${PREFIXLIST}-checkbox`,
    checkboxTable_bodyCode: `${PREFIXLIST}-checkboxTable_bodyCode`,
    table_bodyCode: `${PREFIXLIST}-table_bodyCode`,
    table_code: `${PREFIXLIST}-table_code`,
    tableHeadFixed: `${PREFIXLIST}-tableHeadFixed`,
    tableHead: `${PREFIXLIST}-tableHead`,
    headerTable: `${PREFIXLIST}-headerTable`,
};

export const RootStyleList = styled(Grid)(({ theme }) => ({
    [`& .${classes.iconColor}`]: {
        color: theme.palette.success.main,
    },
    [`& .${classes.button}`]: {
        position: "sticky",
        bottom: 0,
        zIndex: 3,
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
        padding: 7,
        width: "100%",
    },
    [`& .${classes.filterField}`]: {
        padding: theme.spacing(1),
        width: "100%",
        margin: 0,
        flexDirection: "column",
    },
    [`& .${classes.filterForm}`]: {
        overflowY: "auto",
        width: "100%",
        margin: 0,
        position: "relative",
        height: "100vh",
        alignContent: "space-between",
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
    [`& .${classes.tableRow}`]: {
        "&:hover": {
            "& .MuiTableCell-root": {
                backgroundColor: theme.palette.background.hover,
            },
        },
    },
    [`& .${classes.checkbox}`]: {
        minWidth: 60,
        zIndex: "101",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: "0",
        [theme.breakpoints.up("sm")]: {
            left: "0",
        },
    },
    [`& .${classes.checkboxTable_code}`]: {
        zIndex: "102",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: "0",
        [theme.breakpoints.up("sm")]: {
            left: "60px",
        },
    },

    [`& .${classes.bodyCheckbox}`]: {
        zIndex: "100",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        minWidth: 60,
        [theme.breakpoints.up("sm")]: {
            left: 0,
        },
    },

    [`& .${classes.checkboxTable_bodyCode}`]: {
        zIndex: "100",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        [theme.breakpoints.up("sm")]: {
            left: "60px",
        },
    },
    [`& .${classes.table_bodyCode}`]: {
        zIndex: "100",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        [theme.breakpoints.up("sm")]: {
            left: "0",
        },
    },
    [`& .${classes.table_code}`]: {
        zIndex: "102",
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: "0",
        [theme.breakpoints.up("sm")]: {
            left: "0px",
        },
    },
    [`& .${classes.tableHeadFixed}`]: {
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
    },
    [`& .${classes.tableHead}`]: {
        "& .MuiTableCell-head": { fontWeight: 600 },
        "& th": { background: theme.palette.background.paper },
    },

    [`& .${classes.headerTable}`]: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.background.paper,
    },
}));
