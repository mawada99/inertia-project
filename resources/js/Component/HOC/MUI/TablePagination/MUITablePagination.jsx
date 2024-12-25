import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import TablePaginationActions from "./TablePaginationActions";
import { styled } from "@mui/material/styles";
import { router } from "@inertiajs/react";

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
        shipments, // Pass this as a prop to get pagination URLs
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

    // Handle page change with Inertia
    const handleChangePage = (event, newPage) => {
        if (newPage === 0) {
            // First page button clicked
            shipments?.first_page_url && router.get(shipments.first_page_url);
        } else if (newPage === Math.ceil(count / rowsPerPage) - 1) {
            // Last page button clicked
            shipments?.last_page_url && router.get(shipments.last_page_url);
        } else if (newPage > page) {
            // Next page button clicked
            shipments?.next_page_url && router.get(shipments.next_page_url);
        } else if (newPage < page) {
            // Previous page button clicked
            shipments?.prev_page_url && router.get(shipments.prev_page_url);
        }
    };
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
                labelRowsPerPage={""}
                rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                component="div"
                count={count ?? 20}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} // Use the custom handler
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
    shipments: PropTypes.object, // Expect shipment URLs for pagination
};

export default MUITablePagination;
