import React from "react";

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import { Globals } from "../Classes/Globals";

export const StateNavLink = withRouter((props) => {
  const { to, staticContext, ...restProps } = props;
  return (
    <NavLink
      {...restProps}
      to={{
        ...to,
        state: {
          prevUrl: `${props?.match.url}${window.location.search}`,
          ...to?.state,
        },
      }}
    >
      {props.children}
    </NavLink>
  );
});

export const SecuredNavLink = (props) => {
  const { permission, hideLink, show, ...restProps } = props;

  if (
    (permission !== undefined && !Globals.user.hasPermission(permission)) ||
    (show !== undefined && !show)
  ) {
    return null;
  }

  return hideLink ? (
    <Fragment>{props.children}</Fragment>
  ) : (
    <StateNavLink {...restProps}>{props.children}</StateNavLink>
  );
};

SecuredNavLink.propTypes = {
  permission: PropTypes.string,
  show: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  activeClassName: PropTypes.any,
  className: PropTypes.any,
  exact: PropTypes.bool,
};

export const Can = (props) => {
  const { permission, showException } = props;
  const { t } = useTranslation();
  if (
    ((typeof permission === "string" || Array.isArray(permission)) &&
      Globals.user.hasPermission(permission)) ||
    (typeof permission === "boolean" && permission) ||
    (typeof permission === "function" && permission()) ||
    permission === undefined
  ) {
    return props.children;
  } else {
    return (
      !showException && (
        <Fragment>
          <Box
            sx={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              position: "absolute",
              textAlign: "center",
            }}
          >
            <LockOutlined color="action" sx={{ fontSize: 72 }} />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {t("permissionMessage")}
            </Typography>
          </Box>
        </Fragment>
      )
    );
  }
};

Can.propTypes = {
  permission: PropTypes.any,
  showException: PropTypes.bool,
};