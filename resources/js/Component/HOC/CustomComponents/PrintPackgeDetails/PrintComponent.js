import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@mui/icons-material/Remove";
import { printLink } from "../../../../helpers/defaultPrintList";
import { waybills } from "../../../../utils/waybills";

const PrintComponent = (props) => {
  const {
    requestsId,
    packages,
    filterValue,
    oneRequest,
    batch,
    printType,
    afterSaveFun,
    setOpenPrint,
    openPrint,
    onClosePrintDialog,
    queryName,
    queryId,
    validIds,
    requestId,
  } = props;
  const { t } = useTranslation();

  const [updatedIdArray, setUpdatedIdArray] = useState(requestsId);
  const [filterValues, setFilterValues] = useState(filterValue);
  const icon = !Boolean(setOpenPrint);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const formattedData = useMemo(() => waybills(t), [t]);

  useEffect(() => {
    if (filterValue === "id") {
      let idsSelect = requestsId;
      const updatedIdArray1 = idsSelect.filter((id) => validIds.includes(id));

      if (updatedIdArray1.length <= 0) {
        setFilterValues("requestId");
        setUpdatedIdArray(requestId);
      } else {
        setFilterValues(filterValue);
        setUpdatedIdArray(updatedIdArray1);
      }
    } else {
      setFilterValues(filterValue);
      setUpdatedIdArray(requestsId);
    }

    // Filter the idArray to keep only ids that exist in validIds

    // Extract all 'id' values from the packages details data

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, requestsId, validIds]);

  const handleClosePrint = () => {
    onClosePrintDialog && onClosePrintDialog();
    printType === "R&P" && afterSaveFun();
    icon ? setOpenPrintDialog(false) : setOpenPrint(false);
  };

  return (
    <Fragment>
      {icon && (
        <IconButton
          aria-label="print"
          onClick={() => {
            printLink(
              "13X8",
              batch,
              updatedIdArray ?? queryId,
              filterValues,
              undefined,
              queryName
            );
          }}
          disabled={packages?.length === 0}
        >
          <Print fontSize="inherit" />
        </IconButton>
      )}

      <Dialog
        open={icon ? openPrintDialog : openPrint}
        onClose={handleClosePrint}
      >
        <DialogTitle
          color={"text.primary"}
          sx={{ display: "flex", alignItems: "center", pb: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 35 }}>
            <Print fontSize="medium" />
          </ListItemIcon>
          {t("print")}
        </DialogTitle>
        <DialogContent sx={{ p: 0, pb: 2 }}>
          <List>
            {formattedData.map((type, index) => {
              if (
                oneRequest &&
                ["SHEET_DIFF_2", "SHEET_DIFF_3"].includes(type.printLink)
              ) {
                return null;
              }
              return (
                <ListItem
                  sx={{ px: 5 }}
                  key={index}
                  button
                  onClick={() => {
                    printLink(
                      type.printLink,
                      batch,
                      updatedIdArray ?? queryId,
                      filterValues,
                      undefined,
                      queryName
                    );
                    handleClosePrint();
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <RemoveIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body1">{type.name}</Typography>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default PrintComponent;
