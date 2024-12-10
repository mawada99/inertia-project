import { styled } from '@mui/material/styles';
import clsx from "clsx";
import React from "react";
import { FixedTableCell } from "./FixedTableCell";

const PREFIX = 'ApprovedColor';

const classes = {
  true: `${PREFIX}-true`,
  false: `${PREFIX}-false`
};

const StyledFixedTableCell = styled(FixedTableCell)((
  {
    theme
  }
) => ({
  [`& .${classes.true}`]: {
    color: "red",
  },

  [`& .${classes.false}`]: {
    color: "blue",
  }
}));

const ApprovedColor = (props) => {
  const { condition } = props;

  return (
    <StyledFixedTableCell
      className={clsx(
        props.className,
        condition === true ? classes.true : classes.false
      )}
    >
      {props.children}
    </StyledFixedTableCell>
  );
};

export default ApprovedColor;
