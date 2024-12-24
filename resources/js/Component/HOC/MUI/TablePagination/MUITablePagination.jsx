import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import TablePaginationActions from "./TablePaginationActions";
import { styled } from "@mui/material/styles";
// import config from "../../../../"";

const language = ["ar", "en", "ku"];
const MUITablePagination = (props) => {
    const {
        count,
        rowsPerPage,
        page,
        onPageChange,
        onRowsPerPageChange,
        rowsPerPageOptions,
        disableLastPage,
    } = props;

    const PREFIX = "ListPickups";

    const classes = {
        background: `${PREFIX}-background`,
    };

    const Root = styled("div")(({ theme }) => ({
        [`& .${classes.background}`]: {
            "& .MuiTablePagination-toolbar": {
                overflowY: "hidden",
                height: "100% !important",
                minHeight: "100% !important",
                "&::-webkit-scrollbar": {
                    height: "8px",
                },
            },
        },
    }));

    const Languages = language;
    const lang = localStorage.getItem("i18nextLng")
        ? localStorage.getItem("i18nextLng")
        : Languages[0];
    return (
        <Root>
            <TablePagination
                className={classes.background}
                sx={{
                    height: "40px",
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                        {
                            margin: 0,
                        },
                }}
                labelDisplayedRows={
                    lang === "en"
                        ? undefined
                        : ({ from, to, count }) =>
                              `${from}-${to} من ${
                                  count !== -1 ? count : ` أكثر من${to}`
                              }`
                }
                // labelRowsPerPage={lang === "en" ? undefined : "عدد الصفوف في الصفحة"}
                labelRowsPerPage={""}
                rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                component="div"
                count={count ? count : 20}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={
                    disableLastPage ? undefined : TablePaginationActions
                }
            />
        </Root>
    );
};

MUITablePagination.propTypes = {
    count: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
};

export default MUITablePagination;
