import React from "react";
import { styled } from '@mui/material/styles';
import { Grid, Typography } from "@mui/material";

const PREFIX = 'SystemDown';

const classes = {
  loadingPage: `${PREFIX}-loadingPage`,
  errorMessage: `${PREFIX}-errorMessage`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.loadingPage}`]: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    backgroundColor: "#fff",
  },

  [`& .${classes.errorMessage}`]: {
    marginTop: theme.spacing(2),
    display: "block",
  }
}));

const SystemDown = (props) => {

  const { error } = props;
  return (
    <Root>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        className={classes.loadingPage}
      >
        <Typography variant="h6">
          {error?.networkError?.statusCode} |{" "}
          {error?.networkError?.response?.statusText}
        </Typography>
      </Grid>
    </Root>
  );
};
export default SystemDown;
