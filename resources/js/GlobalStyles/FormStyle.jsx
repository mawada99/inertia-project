import styled from "@emotion/styled";

/* --------------------------------- Style For Request Form --------------------------------- */
const PREFIXFORM = "StyleForm";
export const classesForm = {
    spacing: `${PREFIXFORM}-spacing`,
    mainGrid: `${PREFIXFORM}-mainGrid`,
    main: `${PREFIXFORM}-main`,
    addIcon: `${PREFIXFORM}-addIcon`,
    toolbar: `${PREFIXFORM}-toolbar`,
    paperTitle: `${PREFIXFORM}-paperTitle`,
    alertMessage: `${PREFIXFORM}-alertMessage`,
    overlay: `${PREFIXFORM}-overlay`,
    button: `${PREFIXFORM}-button`,
    glApprovedButton: `${PREFIXFORM}-glApprovedButton`,
    box: `${PREFIXFORM}-box`,
    formButton: `${PREFIXFORM}-formButton`,
    table: `${PREFIXFORM}-table`,
};

export const RootStyleForm = styled("div")(({ theme }) => ({
    [`& .${classesForm.spacing}`]: {
        width: "100%",
        margin: theme.spacing(0, 0, 2, 0),
    },
    [`& .${classesForm.box}`]: {
        margin: 0,
        width: "100%",
        padding: theme.spacing(2),
        flexGrow: 1,
    },

    [`& .${classesForm.mainGrid}`]: {
        width: "100%",
        margin: theme.spacing(0),
        padding: theme.spacing(2),
    },
    [`& .${classesForm.alertMessage}`]: {
        flexGrow: 1,
        overflow: "hidden",
        alignItems: "center",
    },

    [`& .${classesForm.addIcon}`]: {
        color: theme.palette.success.main,
    },
    [`& .${classesForm.button}`]: {
        margin: theme.spacing(2),
    },
    [`& .${classesForm.glApprovedButton}`]: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.info.dark,
        },
    },

    [`& .${classesForm.toolbar}`]: {
        justifyContent: "space-between",
        width: "100%",
    },
    [`& .${classesForm.paperTitle}`]: {
        justifyContent: "center",
        background: `${theme.palette.background.appTitle} !important`,
    },
    [`& .${classesForm.overlay}`]: {
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
    [`& .${classesForm.formButton}`]: {
        // paddingRight: theme.spacing(1),
        flexGrow: 1,
    },
    [`& .${classesForm.table}`]: {
        display: "grid",
        minWidth: "100%",
        padding: theme.spacing(2),
    },
}));
