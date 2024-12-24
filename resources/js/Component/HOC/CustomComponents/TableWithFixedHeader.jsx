import React from "react";
import { styled } from "@mui/material/styles";
import { TableContainer } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import clsx from "clsx";
import { useTranslation } from "react-i18next";
// import { ModeContext } from "../../../Context/ModeContext";
// import { useContext } from "react";

const PREFIX = "TableFixedHeaderWraper";

const classes = {
    floatingHeadHidden: `${PREFIX}-floatingHeadHidden`,
    floatingHead: `${PREFIX}-floatingHead`,
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    flexGrow: 1,
    [`& .${classes.floatingHeadHidden}`]: {
        position: "fixed",
        opacity: 0,
        minWidth: "100%",
        "& table": {
            minWidth: "100%",
        },
    },

    [`& .${classes.floatingHead}`]: {
        display: "block",
        position: "absolute",
        opacity: 1,
        transition: "opacity 1s",
        zIndex: 105,
    },
}));

export {};

const TableFixedHeaderWraper = (props) => {
    // const theme = useTheme();
    // const { darkMode } = useContext(ModeContext)

    const { headCells, tableRows, containerScroll, ...restProps } = props;

    // const [shouldShowHeader, setShouldShowHeader] = useState(false);

    // const getHeadCellWidth = (id) => {
    //   return document.getElementById(id).getBoundingClientRect().width;
    // };

    // const getTableWithFloatingClass = (floatingTableHead, mainTableHead) => {
    //   let table = document.createElement("table");
    //   floatingTableHead.appendChild(table);
    //   const cloneThead = mainTableHead.cloneNode(true);
    //   const mainTh = mainTableHead.querySelectorAll("th");
    //   mainTh.forEach((i, index) => {
    //     i.id = index + "-head-cell";
    //     // i.style.color = theme.palette.text.primary;
    //   });

    //   cloneThead.querySelectorAll("th").forEach((i, index) => {
    //     if (index === 0 && i.querySelector("input")) {
    //       i.querySelector("svg").remove();
    //     }

    //     if (!i.classList.contains("MuiTableCell-stickyHeader")) {
    //       i.style.backgroundColor = theme.palette.background.paper;
    //     }
    //     const width = getHeadCellWidth(index + "-head-cell");
    //     i.style.minWidth = width + "px";
    //     // i.style.position = "fixed";
    //   });

    //   floatingTableHead.querySelector("table").appendChild(cloneThead);
    // };

    // useEffect(() => {
    //   const tableContainer = document.getElementById(
    //     "floating-head-table-container"
    //   );
    //   const tableContainerScroll = document.getElementById(
    //     "floating-head-table-container"
    //   );
    //   const floatingTableHead = document.getElementById("floating-tabel-head");
    //   floatingTableHead.parentElement.style.position = "relative";
    //   const mainTableHead = tableContainer.getElementsByTagName("thead")[0];
    //   const headerRect =
    //     document?.querySelector("header")?.getBoundingClientRect() ?? 0;
    //   const headerPage =
    //     document?.getElementById("headerPage--")?.getBoundingClientRect() ?? 0;
    //   const listenToScroll = () => {
    //     if (!floatingTableHead.querySelector("th"))
    //       getTableWithFloatingClass(floatingTableHead, mainTableHead);
    //     // const headerMargin = document
    //     //   .getElementById("header-margin")
    //     //   .getBoundingClientRect();
    //     const mainHeadRect = mainTableHead.getBoundingClientRect();
    //     setShouldShowHeader(mainHeadRect.top < 0);
    //     const mainTableHeadPosition = mainTableHead.getBoundingClientRect().top;
    //     floatingTableHead.style.top =
    //     -mainTableHeadPosition + headerRect.height + headerPage.height + "px";
    //     console.log(-mainTableHeadPosition + headerRect.height + headerPage.height + "px");
    //   };

    //   const elementListener = containerScroll
    //     ? tableContainer.parentElement
    //     : tableContainerScroll;

    //   console.log(elementListener);
    //   elementListener.addEventListener("scroll", listenToScroll, {
    //     passive: true,
    //   });

    //   // document.querySelector("table").onscroll = (e) => {
    //   //   console.log("tabll scroll");
    //   //   floatingTableHead.scrollLeft(this.scrollLeft());
    //   // };
    //   return () => {
    //     elementListener.removeEventListener("scroll", listenToScroll);
    //   };
    // }, []);

    const { i18n } = useTranslation();

    return (
        <StyledTableContainer
            {...restProps}
            sx={{
                position: "relative",
                overflowY: "auto",
            }}
            id="floating-head-table-container"
            key={i18n.language}
        >
            <div
                // className={clsx(
                //   { [classes.floatingHead]: shouldShowHeader },
                //   classes.floatingHeadHidden
                // )}
                id="floating-tabel-head"
            ></div>
            {props.children}
        </StyledTableContainer>
    );
};

export default TableFixedHeaderWraper;
