import React from "react";

import { styled } from '@mui/material/styles';

import { Grid, Typography, Hidden, Container } from "@mui/material";
import Ship from "../images/slider.png";
import { withRouter } from "react-router";
import { useTranslation } from "react-i18next";
import AppStoreIcon from "../images/store/apple-app-store.svg";
import GooglePlayIcon from "../images/store/google-play.png";
import config from "../../../config.json";

const PREFIX = 'index';

const classes = {
  root: `${PREFIX}-root`,
  subtitle: `${PREFIX}-subtitle`,
  title: `${PREFIX}-title`,
  body: `${PREFIX}-body`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  topSection: `${PREFIX}-topSection`,
  leftSection: `${PREFIX}-leftSection`,
  rightSection: `${PREFIX}-rightSection`,
  storeLinks: `${PREFIX}-storeLinks`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    background: theme.palette.background.paper,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(4, 2),
      minHeight: "auto",
      textAlign: "center",
    },
  },

  [`& .${classes.subtitle}`]: { fontSize: "1.2rem", color: "#929292" },
  [`& .${classes.title}`]: { marginTop: theme.spacing(2), fontWeight: 500 },

  [`& .${classes.body}`]: {
    marginTop: theme.spacing(5),
    fontSize: "1.4rem",
    lineHeight: 1.9,
    maxWidth: "90%",
  },

  [`& .${classes.drawerHeader}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    width: "100%",
  },

  [`& .${classes.topSection}`]: {},
  [`& .${classes.leftSection}`]: {},

  [`& .${classes.rightSection}`]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  [`& .${classes.storeLinks}`]: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    "& img": { width: "100%" },
    "& a": {
      width: theme.spacing(20),
      maxWidth: "50%",
      padding: theme.spacing(0, 1),
    },
  }
}));

const SimpleSlider = (props) => {
  const { t } = useTranslation("home");


  return (
    <Root id="home" className={classes.root}>
      <Container>
        <div className={classes.drawerHeader} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid container className={classes.topSection}>
            <Hidden mdDown>
              <Grid item md={5} xs={12} className={classes.rightSection}>
                <img alt="" src={Ship} />
              </Grid>
            </Hidden>
            <Grid item md={1} />
            <Grid
              justifyContent="center"
              direction="column"
              container
              item
              md={6}
              xs={12}
              className={classes.leftSection}
            >
              <Typography className={classes.subtitle}>
                {t("home:bannerSubtitle")}
              </Typography>
              <Typography
                color="primary"
                variant="h4"
                className={classes.title}
              >
                {t("home:bannerTitle")}
              </Typography>
              <Typography className={classes.body}>
                {t("home:bannerBody")}
              </Typography>
              <Grid item container className={classes.storeLinks}>
                {config.mobileAppLinks.ios && (
                  <a
                    href={config.mobileAppLinks.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={AppStoreIcon} alt="" />
                  </a>
                )}
                {config.mobileAppLinks.android && (
                  <a
                    href={config.mobileAppLinks.android}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={GooglePlayIcon} alt="" />
                  </a>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default withRouter(SimpleSlider);
