import { styled } from "@mui/material/styles";
import React from "react";
import { FixedTableCell } from "./FixedTableCell";
import { Link } from "@inertiajs/react";

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

export default CellLink;

function CustomLink(props) {
    const { onClick, to, className } = props;
    return onClick ? (
        <div className={className}>{props.children}</div>
    ) : (
        <Link href={to?.pathname} className={className}>
            {props.children}
        </Link>
    );
}
