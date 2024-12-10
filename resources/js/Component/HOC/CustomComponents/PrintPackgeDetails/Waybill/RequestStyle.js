import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";

/* --------------------------------- Style For Request Form --------------------------------- */
const PREFIXREQUESTFORM = "RequestForm";
export const classesRequestForm = {
  track: `${PREFIXREQUESTFORM}-track`,
  typo: `${PREFIXREQUESTFORM}-typo`,
  mainTracking: `${PREFIXREQUESTFORM}-mainTracking`,
  paper: `${PREFIXREQUESTFORM}-paper`,
  appBar: `${PREFIXREQUESTFORM}-appBar`,
  title: `${PREFIXREQUESTFORM}-title`,
  textAlign: `${PREFIXREQUESTFORM}-textAlign`,
  divider: `${PREFIXREQUESTFORM}-divider`,
  table: `${PREFIXREQUESTFORM}-table`,
  filterAnchor: `${PREFIXREQUESTFORM}-filterAnchor`,
  shipmentList: `${PREFIXREQUESTFORM}-shipmentList`,

  button: `${PREFIXREQUESTFORM}-button`,
  glApprovedButton: `${PREFIXREQUESTFORM}-glApprovedButton`,
  toolbar: `${PREFIXREQUESTFORM}-toolbar`,
  selectPadding: `${PREFIXREQUESTFORM}-selectPadding`,
  margin: `${PREFIXREQUESTFORM}-margin`,
  titles: `${PREFIXREQUESTFORM}-titles`,
  root: `${PREFIXREQUESTFORM}-root`,
  addIcon: `${PREFIXREQUESTFORM}-addIcon`,
  errorColor: `${PREFIXREQUESTFORM}-errorColor`,
  overlay: `${PREFIXREQUESTFORM}-overlay`,
  pagination: `${PREFIXREQUESTFORM}-pagination`,
  formBody: `${PREFIXREQUESTFORM}-formBody`,
  main: `${PREFIXREQUESTFORM}-main`,
  customHeight: `${PREFIXREQUESTFORM}-customHeight`,
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const RootRequestForm = styled("div")(({ theme }) => ({
  [`& .${classesRequestForm.track}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classesRequestForm.typo}`]: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 600,
  },

  [`& .${classesRequestForm.mainTracking}`]: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },

  [`& .${classesRequestForm.paper}`]: {
    marginTop: theme.spacing(2),
    position: "relative",
    minHeight: "327px",
    gridAutoRows: "max-content",
  },

  [`& .${classesRequestForm.appBar}`]: {
    position: "relative",
  },

  [`& .${classesRequestForm.title}`]: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  [`& .${classesRequestForm.textAlign}`]: {
    textAlign: "justify",
    padding: theme.spacing(1),
  },

  [`& .${classesRequestForm.divider}`]: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "1px",
    },
  },

  [`& .${classesRequestForm.table}`]: {
    display: "grid",
    width: "100%",
  },

  [`& .${classesRequestForm.filterAnchor}`]: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    // overflow: "scroll",
    "& .MuiDrawer-paper": {
      [theme.breakpoints.up("sm")]: {
        // width: "50%"
      },
      top: "auto",
      width: "25%",
      border: "1px solid #0000001f",
      height: "100%",
      overflow: "hidden",
    },
  },

  [`& .${classesRequestForm.shipmentList}`]: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  [`& .${classesRequestForm.button}`]: {
    margin: theme.spacing(1),
  },

  [`& .${classesRequestForm.glApprovedButton}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },

  [`& .${classesRequestForm.toolbar}`]: {
    backgroundColor: "#fff",
    border: "solid 1px #eee",
    zIndex: "1300",
    justify: "space-between",
  },

  [`& .${classesRequestForm.selectPadding}`]: {
    paddingTop: "6px",
    paddingBottom: "5px",
  },

  [`& .${classesRequestForm.margin}`]: {
    margin: theme.spacing(1, 2),
  },

  [`& .${classesRequestForm.titles}`]: {
    flex: "1 1 100%",
  },

  [`& .${classesRequestForm.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    justifyContent: "flex-end",
  },

  [`& .${classesRequestForm.addIcon}`]: {
    color: theme.palette.success.main,
  },

  [`& .${classesRequestForm.errorColor}`]: {
    color: theme.palette.error.main,
  },

  [`& .${classesRequestForm.overlay}`]: {
    backgroundColor: theme.palette.background.paper,
    opacity: 0.7,
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
  },

  [`& .${classesRequestForm.pagination}`]: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  [`& .${classesRequestForm.formBody}`]: {
    // padding: theme.spacing(1.6),
    // marginTop: theme.spacing(1)
  },
}));
/* --------------------------------- Style For Request View --------------------------------- */
const PREFIXREQUESTVIEW = "RequestView";
export const classesRequestView = {
  mainTracking: `${PREFIXREQUESTVIEW}-mainTracking`,
  paper: `${PREFIXREQUESTVIEW}-paper`,
  viewPaper: `${PREFIXREQUESTVIEW}-viewPaper`,
  title: `${PREFIXREQUESTVIEW}-title`,
  textAlign: `${PREFIXREQUESTVIEW}-textAlign`,
  divider: `${PREFIXREQUESTVIEW}-divider`,
  table: `${PREFIXREQUESTVIEW}-table`,
  filterAnchor: `${PREFIXREQUESTVIEW}-filterAnchor`,
  picker: `${PREFIXREQUESTVIEW}-picker`,
  button: `${PREFIXREQUESTVIEW}-button`,
  toolbar: `${PREFIXREQUESTVIEW}-toolbar`,
  selectPadding: `${PREFIXREQUESTVIEW}-selectPadding`,
  margin: `${PREFIXREQUESTVIEW}-margin`,
  overlay: `${PREFIXREQUESTVIEW}-overlay`,
  field: `${PREFIXREQUESTVIEW}-field`,
  toolbarIcons: `${PREFIXREQUESTVIEW}-toolbarIcons`,
  iconColor: `${PREFIXREQUESTVIEW}-iconColor`,
  main: `${PREFIXREQUESTVIEW}-main`,
  root: `${PREFIXREQUESTVIEW}-root`,
  totalTitle: `${PREFIXREQUESTVIEW}-totalTitle`,
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const RootRequestView = styled("div")(({ theme }) => ({
  [`& .${classesRequestView.root}`]: {
    justifyContent: "flex-end",
  },
  [`& .${classesRequestView.mainTracking}`]: {
    // margin: theme.spacing(1, 0),
    width: "100%",
  },

  [`& .${classesRequestView.paper}`]: {
    marginTop: theme.spacing(2),
    position: "relative",
    minHeight: "327px",
    gridAutoRows: "max-content",
  },

  [`& .${classesRequestView.viewPaper}`]: {
    padding: theme.spacing(3),
  },

  [`& .${classesRequestView.title}`]: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  [`& .${classesRequestView.textAlign}`]: {
    textAlign: "justify",
    padding: theme.spacing(1),
  },

  [`& .${classesRequestView.divider}`]: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "1px",
    },
  },

  [`& .${classesRequestView.table}`]: {
    display: "grid",
    width: "100%",
  },

  [`& .${classesRequestView.filterAnchor}`]: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    // overflow: "scroll",
    "& .MuiDrawer-paper": {
      [theme.breakpoints.up("sm")]: {
        // width: "50%"
      },
      top: "auto",
      width: "25%",
      border: "1px solid #0000001f",
      height: "100%",
      overflow: "hidden",
    },
  },

  [`& .${classesRequestView.picker}`]: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    // overflow: "scroll",
    "& .MuiDrawer-paper": {
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },

      height: "100%",
      overflow: "hidden",
    },
  },

  [`& .${classesRequestView.button}`]: {
    margin: theme.spacing(1),
  },

  [`& .${classesRequestView.toolbar}`]: {
    borderBottom: "1px #ccd1d6 solid",
    backgroundColor: "#f5f7f9",
    width: "100%",
  },

  [`& .${classesRequestView.selectPadding}`]: {
    paddingTop: "6px",
    paddingBottom: "5px",
  },

  [`& .${classesRequestView.margin}`]: {
    margin: theme.spacing(1, 2),
  },

  [`& .${classesRequestView.overlay}`]: {
    backgroundColor: "#ffffffad",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
  },

  [`& .${classesRequestView.field}`]: {
    width: 260,
    [theme.breakpoints.down("sm")]: {
      width: 170,
    },
  },

  [`& .${classesRequestView.toolbarIcons}`]: {
    flex: "1 1 100%",
    textAlign: "end",
  },

  [`& .${classesRequestView.iconColor}`]: {
    color: theme.palette.success.main,
  },
  [`& .${classesRequestView.totalTitle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    // fontSize:
  },
}));
export const RootRequestLoadingStyle = styled(Grid)(({ theme }) => ({
  [`&.${classesRequestView.main}`]: {
    height: "calc(100vh - (48px + 40px + 64px))",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      height: "calc(100dvh - (48px + 40px + 56px))",
    },
  },
  [`&.${classesRequestForm.main}`]: {
    height: "calc(100vh - (48px + 40px + 64px))",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      height: "calc(100dvh - (48px + 40px + 56px))",
    },
  },
  [`&.${classesRequestForm.customHeight}`]: {
    height: "200px !important",
  },
}));
/* --------------------------------- Style For Request List --------------------------------- */
const PREFIXREQUESTLIST = "RequestList";
export const classesRequestList = {
  track: `${PREFIXREQUESTLIST}-track`,
  typo: `${PREFIXREQUESTLIST}-typo`,
  mainTracking: `${PREFIXREQUESTLIST}-mainTracking`,
  appBar: `${PREFIXREQUESTLIST}-appBar`,
  title: `${PREFIXREQUESTLIST}-title`,
  textAlign: `${PREFIXREQUESTLIST}-textAlign`,
  divider: `${PREFIXREQUESTLIST}-divider`,
  paper: `${PREFIXREQUESTLIST}-paper`,
  filterAnchor: `${PREFIXREQUESTLIST}-filterAnchor`,
  picker: `${PREFIXREQUESTLIST}-picker`,
  button: `${PREFIXREQUESTLIST}-button`,
  toolbar: `${PREFIXREQUESTLIST}-toolbar`,
  selectPadding: `${PREFIXREQUESTLIST}-selectPadding`,
  margin: `${PREFIXREQUESTLIST}-margin`,
  titles: `${PREFIXREQUESTLIST}-titles`,
  filterForm: `${PREFIXREQUESTLIST}-filterForm`,
  filterField: `${PREFIXREQUESTLIST}-filterField`,
  tableIcon: `${PREFIXREQUESTLIST}-tableIcon`,
  drawer: `${PREFIXREQUESTLIST}-drawer`,
  drawerPaper: `${PREFIXREQUESTLIST}-drawerPaper`,
  drawerHeader: `${PREFIXREQUESTLIST}-drawerHeader`,
  content: `${PREFIXREQUESTLIST}-content`,
  contentShift: `${PREFIXREQUESTLIST}-contentShift`,
  iconColor: `${PREFIXREQUESTLIST}-iconColor`,
  headerTable: `${PREFIXREQUESTLIST}-headerTable`,
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const RootRequestList = styled("div")(({ theme }) => ({
  [`& .${classesRequestList.headerTable}`]: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classesRequestList.track}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classesRequestList.typo}`]: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 600,
  },

  [`& .${classesRequestList.mainTracking}`]: {
    margin: theme.spacing(0, 0),
    width: "100%",
  },

  [`& .${classesRequestList.appBar}`]: {
    position: "relative",
  },

  [`& .${classesRequestList.title}`]: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  [`& .${classesRequestList.textAlign}`]: {
    textAlign: "justify",
    padding: theme.spacing(1),
  },

  [`& .${classesRequestList.divider}`]: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "1px",
    },
  },

  [`& .${classesRequestList.paper}`]: {
    display: "grid",
    width: "100%",
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },

  [`& .${classesRequestList.filterAnchor}`]: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    // overflowX: "scroll",
    "& .MuiDrawer-paper": {
      [theme.breakpoints.up("sm")]: {
        width: "30%",
      },
    },
  },

  [`& .${classesRequestList.picker}`]: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    // overflow: "scroll",
    "& .MuiDrawer-paper": {
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },

      height: "100%",
      overflow: "hidden",
    },
  },

  [`& .${classesRequestList.button}`]: {
    position: "sticky",
    bottom: 0,
    zIndex: 1,
    // backgroundColor: "#fff",
    marginTop: 10,
    padding: 7,
  },

  [`& .${classesRequestList.toolbar}`]: {
    borderBottom: "solid 1px",
    borderBottomColor: theme.palette.divider,
    // zIndex: "1300",
    // justify: "space-between"
  },

  [`& .${classesRequestList.selectPadding}`]: {
    paddingTop: "6px",
    paddingBottom: "5px",
  },

  [`& .${classesRequestList.margin}`]: {
    margin: theme.spacing(1, 2),
  },

  [`& .${classesRequestList.titles}`]: {
    flex: "1 1 100%",
  },

  [`& .${classesRequestList.filterForm}`]: {
    overflowY: "auto",
    width: "100%",
    margin: 0,
    position: "relative",
    height: "100vh",
    alignContent: "space-between",
  },

  [`& .${classesRequestList.filterField}`]: {
    padding: theme.spacing(1),
    width: "100%",
    margin: 0,
    flexDirection: "column",
  },

  [`& .${classesRequestList.tableIcon}`]: {
    margin: theme.spacing(0, 1),
  },

  /////////Drawer///////////

  [`& .${classesRequestList.drawer}`]: {
    width: drawerWidthRequestList,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // height: "100%",
    },
  },

  [`& .${classesRequestList.drawerPaper}`]: {
    width: drawerWidthRequestList,

    zIndex: "250",

    left: "initial",
    right: "initial",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },

  [`& .${classesRequestList.drawerHeader}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  [`& .${classesRequestList.content}`]: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },

  [`& .${classesRequestList.contentShift}`]: {
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

  [`& .${classesRequestList.iconColor}`]: {
    color: theme.palette.success.main,
  },
}));
const drawerWidthRequestList = 240;
/* --------------------------------- Style For Print Request List --------------------------------- */
const PREFIXPRINTREQUESTLIST = "RequestPrint";
export const classesPrintRequestList = {
  headerCells: `${PREFIXPRINTREQUESTLIST}-headerCells`,
  title: `${PREFIXPRINTREQUESTLIST}-title`,
  notes: `${PREFIXPRINTREQUESTLIST}-notes`,
  noteCell: `${PREFIXPRINTREQUESTLIST}-noteCell`,
  barcodeFont: `${PREFIXPRINTREQUESTLIST}-barcodeFont`,
  cairoFont: `${PREFIXPRINTREQUESTLIST}-cairoFont`,
  barcode: `${PREFIXPRINTREQUESTLIST}-barcode`,
  headerTableCell: `${PREFIXPRINTREQUESTLIST}-headerTableCell`,
  mainCellBorder: `${PREFIXPRINTREQUESTLIST}-mainCellBorder`,
  signature: `${PREFIXPRINTREQUESTLIST}-signature`,
  reportHeader: `${PREFIXPRINTREQUESTLIST}-reportHeader`,
  hiddenFooter: `${PREFIXPRINTREQUESTLIST}-hiddenFooter`,
  pageFooter: `${PREFIXPRINTREQUESTLIST}-pageFooter`,
  logoSection: `${PREFIXPRINTREQUESTLIST}-logoSection`,
  headerDate: `${PREFIXPRINTREQUESTLIST}-headerDate`,
  whiteSpace: `${PREFIXPRINTREQUESTLIST}-whiteSpace`,
  approve: `${PREFIXPRINTREQUESTLIST}-approve`,
  rowWithoutBorder: `${PREFIXPRINTREQUESTLIST}-rowWithoutBorder`,
  mainDetailsCell: `${PREFIXPRINTREQUESTLIST}-mainDetailsCell`,
  tableHeadCell: `${PREFIXPRINTREQUESTLIST}-tableHeadCell`,
  tableWidth: `${PREFIXPRINTREQUESTLIST}-tableWidth`,
  shipmentsTable: `${PREFIXPRINTREQUESTLIST}-shipmentsTable`,
  signatureBlock: `${PREFIXPRINTREQUESTLIST}-signatureBlock`,
  iconColor: `${PREFIXPRINTREQUESTLIST}-iconColor`,
};
export const RootPrintRequestList = styled("div")(({ theme }) => ({
  // fontFamily: ['"Cairo"', "sans-serif"].join(","),
  [`& .${classesPrintRequestList.headerCells}`]: {
    paddingBottom: theme.spacing(1),
  },

  [`& .${classesPrintRequestList.title}`]: {
    color: theme.palette.info.main,
    // whiteS;pace: "break-spaces",
  },

  [`& .${classesPrintRequestList.notes}`]: {
    padding: theme.spacing(1),
    border: "1px solid " + theme.palette.action.disabled,
    wordBreak: "break-all",
    width: "100%",
    minHeight: 80,
  },

  [`& .${classesPrintRequestList.noteCell}`]: {
    width: "30%",
    overflow: "hidden",
  },

  [`& .${classesPrintRequestList.barcodeFont}`]: {
    fontFamily: '"Libre Barcode 39 Text"',
  },

  [`& .${classesPrintRequestList.cairoFont}`]: {
    // fontFamily: ['"Cairo"', "sans-serif"].join(","),
  },

  [`& .${classesPrintRequestList.barcode}`]: {
    fontSize: 40,
    textAlign: "center",
  },

  [`& .${classesPrintRequestList.headerTableCell}`]: {
    border: "none",
    padding: 0,
  },

  [`& .${classesPrintRequestList.mainCellBorder}`]: {
    border: "none",
    padding: 0,
  },

  [`& .${classesPrintRequestList.signature}`]: {
    textAlign: "center",
    padding: theme.spacing(2, 1, 1, 1),
    border: "none",
  },

  [`& .${classesPrintRequestList.reportHeader}`]: {
    whiteSpace: "pre-line",
    padding: theme.spacing(0, 2),
    lineHeight: "120%",
    fontSize: 12,
  },

  [`& .${classesPrintRequestList.hiddenFooter}`]: {
    visibility: "hidden",
  },

  [`& .${classesPrintRequestList.pageFooter}`]: {
    //   "&::after": {
    //    " content:  counter(page)  of  counter(pages)"
    //   },
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid " + theme.palette.text.secondary,
    display: "flex",
    alignItems: "flex-end",
  },

  [`& .${classesPrintRequestList.logoSection}`]: {
    display: "flex",
    alignItems: "center",
  },

  [`& .${classesPrintRequestList.headerDate}`]: {
    textAlign: "end",
  },

  [`& .${classesPrintRequestList.whiteSpace}`]: {
    "& tr": {
      "& td": {
        whiteSpace: "initial",
      },
    },
  },

  [`& .${classesPrintRequestList.approve}`]: {
    textAlign: "end",
  },

  [`& .${classesPrintRequestList.rowWithoutBorder}`]: {
    "& td": {
      border: "none",
      padding: 0,
    },
  },

  [`& .${classesPrintRequestList.mainDetailsCell}`]: {
    "& td": { border: "none", verticalAlign: "top" },
    "& td:first-of-type": { paddingLeft: 0 },
    "& td:last-of-type": { paddingRight: 0 },

    border: "none",
    padding: theme.spacing(1, 0),
  },

  [`& .${classesPrintRequestList.tableHeadCell}`]: {
    padding: 0,
  },

  [`& .${classesPrintRequestList.tableWidth}`]: {
    width: "100vw",
  },

  [`& .${classesPrintRequestList.shipmentsTable}`]: {
    "& tr": {
      "&:hover": {
        backgroundColor: "#ffffff00 !important",
      },
    },
    "& td , & th": {
      padding: theme.spacing(1),
    },
  },

  [`& .${classesPrintRequestList.signatureBlock}`]: {
    breakInside: "avoid",
  },
  [`& .${classesPrintRequestList.iconColor}`]: {
    color: theme.palette.success.main,
  },
}));
