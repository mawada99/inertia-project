import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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
    MsWordBreak: "break-word",
    MsHyphens: "auto",
    MozHyphens: "auto",
    WebkitHyphens: "auto",
    hyphens: "auto",
  },
}));

export const KeyValuePair = (props) => {
  const { title, value, xs, sm, md, lg, dir, valueStyle, ...restProps } = props;

  return (
    <StyledGrid
      {...restProps}
      xs={xs ?? 12}
      sm={sm ?? 6}
      md={md ?? 3}
      lg={lg}
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
      {/* <Typography
        className={classes.value}
        sx={valueStyle}
        variant="body1"
        dir={dir}
      >
        {value !== null ? value : null}
      </Typography> */}
      {
        <div className={classes.value} sx={valueStyle} dir={dir}>
          {value !== null ? value : null}
        </div>
      }
      {props.children}
    </StyledGrid>
  );
};
