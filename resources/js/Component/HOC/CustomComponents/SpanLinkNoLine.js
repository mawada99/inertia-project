import { styled } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const StyledLink = styled(CustomLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    // textDecoration: "underline",
    color: theme.palette.text.primary,
    // cursor: "pointer",
  },
}));

const CellLink = (props) => {
  const { pathname, hash, key, state, search, onClick } = props;

  return (
    <span
      onClick={() => onClick && onClick()}
      className={clsx(props.className)}
    >
      <StyledLink
        {...props}
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
    </span>
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
