import { styled } from "@mui/material/styles";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FixedTableCell } from "./FixedTableCell";

const StyledLink = styled(CustomLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const CellLink = (props) => {
  const {
    pathname,
    hash,
    key,
    state,
    search,
    onClick,
    staticContext,
    ...restProps
  } = props;

  return (
    <FixedTableCell
      {...restProps}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      className={props.className}
    >
      {props.children ? (
        <StyledLink
          onClick={onClick}
          to={{
            pathname,
            hash,
            key,
            state,
            search,
          }}
        >
          {props.children}
        </StyledLink>
      ) : null}
    </FixedTableCell>
  );
};

export default withRouter(CellLink);

function CustomLink(props) {
  const { onClick, to, className } = props;
  return onClick ? (
    <div className={className}>{props.children}</div>
  ) : (
    <Link to={to} className={className}>
      {props.children}
    </Link>
  );
}
