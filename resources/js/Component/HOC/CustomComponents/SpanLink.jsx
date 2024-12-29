import { Link } from "@inertiajs/react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";

const StyledLink = styled(CustomLink)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: "none",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
}));

const CellLink = (props) => {
    const { pathname, hash, state, search, onClick } = props;
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
                    // key,
                    state,
                    search,
                }}
            >
                {props.children}
            </StyledLink>
        </span>
    );
};

export default CellLink;

function CustomLink(props) {
    const { onClick, to, className } = props;
    return (
        <Link href={to?.pathname} className={className} onClick={onClick}>
            {props.children}
        </Link>
    );
}
