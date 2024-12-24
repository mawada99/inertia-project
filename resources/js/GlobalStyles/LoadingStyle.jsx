import styled from "@emotion/styled";
import { Grid } from "@mui/material";

/* --------------------------------- Style For Request Form --------------------------------- */
const PREFIXLOADING = "StyleLoading";
export const classesLoad = {
    main: `${PREFIXLOADING}-main`,
};

export const StyledLoading = styled(Grid)(({ theme }) => ({
    [`&.${classesLoad.main}`]: {
        height: "calc(100vh - (40px + 64px))",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        [theme.breakpoints.down("sm")]: {
            height: "calc(100dvh - (40px + 56px))",
        },
    },
}));
