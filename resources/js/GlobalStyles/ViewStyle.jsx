import styled from "@emotion/styled";
import { Stack } from "@mui/material";

/* --------------------------------- Style For Request Form --------------------------------- */
const PREFIXVIEW = "StyleView";
export const classesView = {
  paper: `${PREFIXVIEW}-paper`,
  iconColor: `${PREFIXVIEW}-iconColor`,
  paperTitle: `${PREFIXVIEW}-paperTitle`,
  alertHover: `${PREFIXVIEW}-alertHover`,
  codeSection: `${PREFIXVIEW}-codeSection`,
  codeTitle: `${PREFIXVIEW}-codeTitle`,
  tabpanel: `${PREFIXVIEW}-tabpanel`,
  table: `${PREFIXVIEW}-table`,
  alertMessage: `${PREFIXVIEW}-alertMessage`,
  toolbarTable: `${PREFIXVIEW}-toolbarTable`,
  barcode: `${PREFIXVIEW}-barcode`,
};

export const RootStyleView = styled(Stack)(({ theme }) => ({
  [`& .${classesView.paper}`]: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  [`& .${classesView.alertMessage}`]: {
    flexGrow: 1,
    overflow: "hidden",
    alignItems: "center",
  },

  [`& .${classesView.table}`]: {
    display: "grid",
    minWidth: "100%",
  },

  [`& .${classesView.tabpanel}`]: {
    margin: theme.spacing(2, 0),
    padding: 0,
  },
  [`& .${classesView.iconColor}`]: {
    color: theme.palette.success.main,
  },
  [`& .${classesView.toolbarTable}`]: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid " + theme.palette.divider,
    borderRight: "1px solid " + theme.palette.divider,
  },
  [`& .${classesView.barcode}`]: {
    fontFamily: "'Libre Barcode 39 Text'",
    fontSize: 30,
  },
}));
