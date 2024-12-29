import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
// import { StateNavLink } from "./StateNavLink";
import { Globals } from "../Classes/Globals";
export const StateNavLink = (props) => {
    const { to, className, activeClassName, ...restProps } = props; // Filter 'button'
    const { url } = usePage();

    return (
        <Link
            {...restProps}
            href={to?.pathname}
            className={clsx(
                className,
                url === to?.pathname ? activeClassName : ""
            )}
        >
            {props.children}
        </Link>
    );
};

StateNavLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    children: PropTypes.node,
    // Optional boolean prop
};
export const SecuredNavLink = (props) => {
    const { permission, hideLink, show, button, ...restProps } = props; // Filter 'button'

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
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    hideLink: PropTypes.bool,
};
export const Can = (props) => {
    const { permission, showException } = props;
    const { t } = useTranslation();
    if (
        typeof permission === "string" ||
        Array.isArray(permission) ||
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
