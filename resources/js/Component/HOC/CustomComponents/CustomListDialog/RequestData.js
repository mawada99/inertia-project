import { Alert, Box } from "@mui/material";

import React from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";

export const CustomerPaymentMethod = (props) => {
  const { classes, picked } = props;
  const { t } = useTranslation();

  return (
    <Alert
      severity="info"
      color="warning"
      variant="outlined"
      classes={{
        message: classes.alertMessage,
        root: classes.alertMessage,
      }}
    >
      <Grid container width={"100%"} p={0}>
        <Grid xs={12} md={4} display={"flex"}>
          <Box>
            {picked?.requestDate
              ? t("requestDate") + " :"
              : t("shipmentDate") + " :"}
          </Box>
          <Box mx={1}>
            {picked?.requestDate
              ? picked?.requestDate
              : picked?.shipmentDate ?? "-"}
          </Box>
        </Grid>
        <Grid xs={12} md={4} display={"flex"}>
          <Box>{t("shippingMode") + " :"}</Box>
          <Box mx={1}>{picked?.shippingMode?.name ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={4} display={"flex"}>
          <Box>{t("loadingMode") + " :"}</Box>
          <Box mx={1}>{picked?.loadingMode?.name ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("senderName") + " :"}</Box>
          <Box mx={1}>{picked?.shipperName ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("senderState") + " :"}</Box>
          <Box mx={1}>{picked?.shipperState?.name ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box> {t("senderPhone") + " :"}</Box>
          <Box mx={1} dir="ltr">
            {picked?.shipperMobile ?? "-"}
          </Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("senderAddress") + " :"}</Box>
          <Box mx={1}>{picked?.shipperAddress ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("consigneeName") + " :"}</Box>
          <Box mx={1}>{picked?.consigneeName ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("recipientState") + " :"}</Box>
          <Box mx={1}>{picked?.consigneeState?.name ?? "-"}</Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box> {t("recipientPhone") + " :"}</Box>
          <Box mx={1} dir="ltr">
            {picked?.consigneeMobile ?? "-"}
          </Box>
        </Grid>
        <Grid xs={12} md={3} display={"flex"}>
          <Box>{t("recipientAddress") + " :"}</Box>
          <Box mx={1}>{picked?.consigneeAddress ?? "-"}</Box>
        </Grid>
      </Grid>
    </Alert>
  );
};

CustomerPaymentMethod.propTypes = {
  classes: PropTypes.any,
  picked: PropTypes.any.isRequired,
};
