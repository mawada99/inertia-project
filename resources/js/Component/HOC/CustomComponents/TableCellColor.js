import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import clsx from "clsx";
import * as colors from "@mui/material/colors";
import { FixedTableCell } from "./FixedTableCell";
import { useTranslation } from "react-i18next";
import { Globals } from "../Classes/Globals";

export const StyledFixedTableCell = styled(Chip)(({ theme, colorcode }) => ({
  color: theme.palette.getContrastText(colorcode),
  backgroundColor: colorcode + "!important",
}));

export const getStatusName = (
  {
    status,
    deliveryType,
    inWarehouse,
    customReturnStatus = Globals?.settings?.customReturnStatus,
  },
  t
) => {
  switch (status.code) {
    case "DTR":
      if (deliveryType) {
        return deliveryType?.name;
      }
      return status.name;
    case "RTS":
      if (customReturnStatus && inWarehouse !== undefined) {
        if (inWarehouse) {
          return t("ReturnInCompany");
        }
        return t("ReturnWithAgent");
      } else {
        return status.name;
      }
    default:
      return status.name;
  }
};

export const TableCellColor = memo((props) => {
  const { status, print, customReturnStatus } = props;
  const color = {
    PKR: colors["blueGrey"]["500"],
    PKM: colors["lightBlue"]["500"],
    PKD: colors["blue"]["500"],
    RJCT: colors["red"]["500"],
    RITS: colors["grey"]["500"],
    RTRN: colors["brown"]["500"],
    OTD: colors["teal"]["500"],
    OTR: colors["purple"]["500"],
    DTR: colors["green"]["500"],
    DEX: colors["orange"]["500"],
    HTR: colors["amber"]["500"],
    PKH: colors["amber"]["500"],
    RTS: colors["pink"]["500"],
    BMT: colors["indigo"]["500"],
    BMR: colors["deepPurple"]["500"],
    PRP: colors["grey"]["500"],
    PRPD: colors["cyan"]["500"],
    STD: colors["teal"]["500"],
    RCVD: colors["orange"]["200"],
    PCKD: colors["blue"]["500"],
    LOAD: colors["red"]["500"],
    RQST: colors["grey"]["500"],
    BOOKING: colors["grey"]["500"], // Neutral, calm blue-grey for initial state
    SCHEDULED: colors["blueGrey"]["500"], // Standard grey for a planned status
    LOADING: colors["orange"]["400"], // Warm orange for active loading
    TRANSPORTING: colors["pink"]["100"], // Darker grey for in-progress transportation
    ARRIVED: colors["lime"]["400"], // Soft green to signal arrival
    UNLOADED: colors["lightBlue"]["200"], // Light green for unloading step
    DELIVERED: colors["green"]["500"], // Deeper blue-grey for final deliver
  };

  const { t } = useTranslation();

  return (
    <FixedTableCell sx={props.style} className={clsx(props.className)}>
      {print ? (
        getStatusName(
          {
            status: status?.status ?? status?.shipmentStatus,
            deliveryType: status.deliveryType,
            inWarehouse: status?.inWarehouse,
            customReturnStatus: customReturnStatus,
          },
          t
        )
      ) : (
        <StyledFixedTableCell
          colorcode={
            color.hasOwnProperty(status?.code)
              ? color[status?.code]
              : colors["brown"]["500"]
          }
          size="small"
          label={getStatusName(
            {
              status: status,
              deliveryType: status.deliveryType,
              inWarehouse: status?.inWarehouse,
            },
            t
          )}
        />
      )}
    </FixedTableCell>
  );
});
