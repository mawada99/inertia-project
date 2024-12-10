import React from "react";
import { Grid, Box, Typography, styled } from "@mui/material";
import FullScreenLoading from "./LoadingPages/FullScreenLoading";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { useTranslation } from "react-i18next";
const PREFIX = "EmptyTableMessage";
const classes = {
  main: `${PREFIX}-main`,
};

const StyledLoading = styled(Grid)(({ theme }) => ({
  [`&.${classes.main}`]: {
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

const EmptyTableMessage = (props) => {
  const { loading, message } = props;
  const { t } = useTranslation();
  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
    // sx={{ minHeight: "25em" }}
    >
      {loading ? (
        <StyledLoading
          container
          item
          justifyContent="center"
          className={classes.main}
        >
          <FullScreenLoading height={"100%"} />
        </StyledLoading>
      ) : (
        <Box textAlign="center" sx={{ padding: "80px" }}>
          <TbDeviceDesktopSearch size={70} color="gray" />
          <Box
            component={Typography}
            variant="h6"
            marginTop="0"
            sx={{ color: "gray" }}
          >
            {message ?? t("noResult")}
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default EmptyTableMessage;
