/* eslint-disable no-useless-concat */
import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {
  Icon,
  Stack,
  IconButton,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import config from "../../../../config.json";
import Grid from "@mui/material/Unstable_Grid2";

import { Image } from "@mui/icons-material";
import { useState } from "react";
import CustomDialog from "../CustomDialog";
import { KeyValuePair } from "../KeyValuePair";
import { FixedTableCell } from "../FixedTableCell";
import CellLink from "../CellLink";
import SpanLink from "../SpanLink";

const PREFIX = "PackageView";
const classes = {
  paper: `${PREFIX}-paper`,
  iconColor: `${PREFIX}-iconColor`,
  main: `${PREFIX}-main`,
  paperTitle: `${PREFIX}-paperTitle`,
};

const Root = styled(Stack)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },

  [`& .${classes.iconColor}`]: {
    color: theme.palette.success.main,
  },
  [`& .${classes.paperTitle}`]: {
    justifyContent: "center",
    background: `${theme.palette.background.appTitle} !important`,
  },
}));
const StyledTableRowChild = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const PackageView = (props) => {
  const { packageData } = props;
  const { t } = useTranslation();
  const [dialogDetails, setDialogDetails] = useState({
    state: false,
    function: null,
    confirmAction: true,
    title: "",
    content: "",
  });
  let getBackendUri = (imgPath) => {
    const domain = config.backend.domain
      ? config.backend.domain
      : window.location.hostname;

    return `${config.backend.protocol}://${domain}:${config.backend.port}/${imgPath}`;
  };
  const openSignatureDialog = (imgPath) => {
    setDialogDetails((prev) => ({
      state: true,
      title: null,
      content: (
        <Box
          sx={{ background: "#fff", width: "100%" }}
          component="img"
          alt="signature"
          src={getBackendUri(imgPath.path)}
        />
      ),
      confirmAction: false,
      function: () => {},
    }));
  };
  const closeConfirmationDialog = () => {
    setDialogDetails((prev) => ({
      ...prev,
      state: false,
    }));
  };
  return (
    <Root spacing={2} p={2} justifyContent="center">
      <CustomDialog
        title={dialogDetails.title}
        fullWidth
        maxWidth="xs"
        onClose={closeConfirmationDialog}
        content={dialogDetails.content}
        open={dialogDetails.state}
        actions={
          dialogDetails.function !== null && (
            <>
              <Button color="primary" onClick={closeConfirmationDialog}>
                {dialogDetails.confirmAction ? t("cancel") : t("close")}
              </Button>
              {dialogDetails.confirmAction && (
                <Button color="primary" onClick={dialogDetails.function}>
                  {t("confirm")}
                </Button>
              )}
            </>
          )
        }
      >
        {dialogDetails.function === null && " "}
      </CustomDialog>
      <Grid
        xs={12}
        justifyContent="space-between"
        container
        sx={{ width: "100%", gap: 1 }}
      >
        <KeyValuePair title={t("code")} value={packageData?.code} />
        <KeyValuePair
          title={t("packageType")}
          value={packageData?.packageType?.name}
        />
        <KeyValuePair title={t("count")} value={packageData?.count} />
        <KeyValuePair title={t("pieces")} value={packageData?.pieces} />
        <KeyValuePair
          title={t("priceMode")}
          value={packageData?.priceMode?.name}
        />
        <KeyValuePair title={t("weight")} value={packageData?.weight} />
        <KeyValuePair
          title={t("totalWeight")}
          value={packageData?.totalWeight}
        />
        <KeyValuePair
          title={t("product")}
          value={
            <SpanLink pathname={`/admin/product/${packageData?.product?.id}`}>
              {packageData?.product?.name}
            </SpanLink>
          }
        />
        <KeyValuePair
          title={t("productPrice")}
          value={packageData?.productPrice}
        />
        <KeyValuePair title={t("length")} value={packageData?.length} />
        <KeyValuePair title={t("breadth")} value={packageData?.breadth} />
        <KeyValuePair title={t("height")} value={packageData?.height} />
        <KeyValuePair title={t("volume")} value={packageData?.volume} />
        <KeyValuePair
          title={t("volumetricFactor")}
          value={packageData?.volumetricFactor}
        />
        <KeyValuePair
          title={t("volumetricWeight")}
          value={packageData?.volumetricWeight}
        />
        <KeyValuePair
          title={t("chargeableUnits")}
          value={packageData?.chargeableUnits}
        />
        <KeyValuePair
          title={t("chargePrice")}
          value={packageData?.chargePrice}
        />
        <KeyValuePair
          title={t("chargeAmount")}
          value={packageData?.chargeAmount}
        />
        <KeyValuePair
          title={t("currency")}
          value={packageData?.currency?.name}
        />
        <KeyValuePair
          title={t("exchangeRate")}
          value={packageData?.exchangeRate}
        />

        <KeyValuePair
          title={t("originCountry")}
          value={packageData?.originCountry?.name}
        />
        <KeyValuePair
          title={t("description")}
          value={packageData?.description}
        />
        {packageData?.image ? (
          <KeyValuePair
            title={t("image")}
            value={
              <IconButton
                size="small"
                onClick={() => openSignatureDialog(packageData?.image)}
              >
                <Image fontSize="small" />
              </IconButton>
            }
          />
        ) : (
          <KeyValuePair title={t("image")}></KeyValuePair>
        )}
        <KeyValuePair
          title={t("fragile")}
          value={
            packageData?.fragile ? (
              <Icon className={classes.iconColor}>check_circle_outline</Icon>
            ) : (
              <Icon color="error">highlight_off</Icon>
            )
          }
        />
        {packageData?.commodities && packageData?.commodities?.length !== 0 && (
          <Table aria-labelledby="tableTitle" aria-label="enhanced table">
            <TableHead>
              <StyledTableRowChild>
                <FixedTableCell>#</FixedTableCell>
                <FixedTableCell>{t("name")}</FixedTableCell>

                <FixedTableCell>{t("count")}</FixedTableCell>
              </StyledTableRowChild>
            </TableHead>
            <TableBody>
              {packageData?.commodities &&
                packageData?.commodities?.map((row, index) => (
                  <TableRow hover className={classes.tableRow} key={index}>
                    <FixedTableCell>{row.id}</FixedTableCell>
                    <CellLink
                      pathname={`/admin/commodities/${row.commodity?.id}`}
                    >
                      {row?.commodity?.name}
                    </CellLink>
                    {/* <FixedTableCell>{row.packageType?.name}</FixedTableCell> */}
                    <FixedTableCell>{row.count}</FixedTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Root>
  );
};

export default PackageView;
