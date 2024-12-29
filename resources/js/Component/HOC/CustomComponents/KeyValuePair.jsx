import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

const PREFIX = "KeyValuePair";

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`,
    value: `${PREFIX}-value`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        padding: theme.spacing(0.5),
    },
    [`& .${classes.title}`]: {
        "&::first-letter": {
            textTransform: "capitalize",
        },
    },

    [`& .${classes.value}`]: {
        wordBreak: "break-word",
        whiteSpace: "pre-line",
        overflowWrap: "break-word",
        msWordBreak: "break-word",
        msHyphens: "auto",
        mozHyphens: "auto",
        webkitHyphens: "auto",
        hyphens: "auto",
    },
}));

export const KeyValuePair = (props) => {
    const { title, value, xs, sm, md, lg, dir, valueStyle, ...restProps } =
        props;

    return (
        <StyledGrid
            {...restProps}
            xs={xs ?? 12}
            sm={sm ?? 6}
            md={md ?? 3}
            lg={lg}
            item // Add this item prop to ensure it's treated as a grid item
            className={classes.root}
        >
            <Typography
                variant="body2"
                gutterBottom
                color="textSecondary"
                className={classes.title}
            >
                {title}
            </Typography>
            <div className={classes.value} style={valueStyle} dir={dir}>
                {value !== null ? value : null}
            </div>
            {props.children}
        </StyledGrid>
    );
};
