import { IconButton, Toolbar, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import PrintComponent from "../PrintPackgeDetails/PrintComponent";
// import { useTranslation } from "react-i18next";

export const EnhancedTableToolbarView = (props) => {
  const {
    classes,
    requestId,
    openDialog,
    requestData,
    packages,
    selectedId,
    idView,
    operationData,
  } = props;
  const { t } = useTranslation();
  const detailsId = selectedId?.length === 0 ? requestId ?? idView : selectedId;
  const filterValue = selectedId?.length === 0 ? "requestId" : "id";
  let validIds = [];
  selectedId?.length !== 0 &&
    packages.forEach((pkg) => {
      if (pkg?.details?.data) {
        validIds.push(...pkg.details.data.map((detail) => detail.id));
      }
    });
  return (
    <Toolbar className={classes.toolbars} variant="dense">
      <Typography className={classes.title} color="inherit" variant="h6">
        {t("packages")}
      </Typography>
      {requestId && (
        <IconButton
          disabled={
            !requestId ||
            (["FTL", "FCL"].includes(requestData?.loadingMode?.code) &&
              packages?.length >= 1) ||
            operationData?.approved
          }
          onClick={() => openDialog()}
          aria-label="Add packages"
          className={classes.addIcon}
          size="small"
        >
          <AddCircleOutline />
        </IconButton>
      )}
      <PrintComponent
        requestsId={detailsId}
        filterValue={filterValue}
        packages={packages}
        validIds={validIds}
        requestId={requestId ?? idView}
      />
    </Toolbar>
  );
};
