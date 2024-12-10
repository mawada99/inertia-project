import React from "react";
import { styled } from "@mui/material/styles";
import { Radio, TableRow } from "@mui/material";
import { FixedTableCell } from "../FixedTableCell";
import CellLink from "../CellLink";

const PREFIX = "CustomTableRow";

const classes = {
  commodityTable_checkbox: `${PREFIX}-commodityTable_checkbox`,
  iconColor: `${PREFIX}-iconColor`,
};

const Root = styled(TableRow)(({ theme }) => ({
  [`& .${classes.commodityTable_checkbox}`]: {
    zIndex: "100",
    backgroundColor: theme.palette.background.paper,
    position: "sticky",
    top: 0,
    left: 0,
  },
  [`& .${classes.iconColor}`]: {
    color: theme.palette.success.main,
  },
}));

const CustomTableRow = (props) => {
  const { data, onClick, selected, pathType } = props;
  const details = data?.data;
  // const getEntityInfo = (row) => {
  //   const keys = [
  //     "vendor",
  //     "employee",
  //     "customer",
  //     "agent",
  //     "agency",
  //     "carrier",
  //   ];
  //   const entity = keys.find((key) => row?.[key]); // Find the first non-null entity
  //   // const entity = keys.find((key) => row?.[key]); // Find the first non-null entity
  //   const id = entity ? row[entity]?.id : null; // Get the ID of the entity

  //   // Use "custom-agent" in the path for "agent", but keep the entity name as "agent"
  //   const entityPath = entity === "agent" ? "custom-agents" : entity;

  //   return { entity, entityPath, id };
  // };
  // console.log(pathType);

  return (
    <Root
      hover
      tabIndex={-1}
      selected={selected} // Highlights the row when selected
      onClick={onClick} // Call the parent-provided click handler to toggle selection
    >
      <FixedTableCell>
        {/* Radio button for selecting the row */}
        <Radio
          checked={selected} // Radio is selected if the row is selected
          onChange={onClick} // When radio changes, trigger the onClick function to select the row
          value={details?.code} // Unique value for the radio button (optional, could be bill ID)
        />
      </FixedTableCell>
      <FixedTableCell>{details?.code}</FixedTableCell>
      {pathType === "Request" || pathType === "Shipment" ? (
        <>
          <FixedTableCell>{details?.shippingMode?.name}</FixedTableCell>
          <FixedTableCell>{details?.shippingDirection?.name}</FixedTableCell>
          <FixedTableCell>{details?.shipperName}</FixedTableCell>
          <FixedTableCell>{details?.consigneeName}</FixedTableCell>
        </>
      ) : (
        <>
          <CellLink pathname={`/admin/branches/${details?.branch?.id}`}>
            {details?.branch?.name}
          </CellLink>
          {pathType === "Bill" || pathType === "Invoice" ? (
            <FixedTableCell>{details?.totalAmount}</FixedTableCell>
          ) : (
            <FixedTableCell>{details?.amount}</FixedTableCell>
          )}

          <FixedTableCell>{details?.currency?.name}</FixedTableCell>
          <FixedTableCell>{details?.exchangeRate}</FixedTableCell>
        </>
      )}
    </Root>
  );
};

export default CustomTableRow;
