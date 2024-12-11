import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
// import pjson from "../../package.json";

const PREFIX = "Footer";

const classes = {
    root: `${PREFIX}-root`,
    link: `${PREFIX}-link`,
    margin: `${PREFIX}-margin`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.root}`]: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        flexShrink: 0,
        minHeight: "40px",
        // ...theme.mixins.toolbar,
    },

    [`& .${classes.link}`]: {
        color: theme.palette.primary.main + "!important",
        textDecoration: "none",
        fontWeight: 500,
        "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
        },
    },
    [`& .${classes.margin}`]: {
        margin: theme.spacing(0, 0.5),
    },
}));

const Footer = (props) => {
    const { t } = useTranslation("home");

    return (
        <Root>
            <footer className={classes.root}>
                <Grid container justifyContent="center">
                    <Grid className={classes.margin}>
                        {t("home:footerCopyright")}. {t("home:poweredBy")}{" "}
                        <a
                            className={classes.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://accuratess.com"
                        >
                            {t("home:accurate")}
                        </a>
                    </Grid>
                    <Grid className={classes.margin}>
                        <Typography variant="body2" color="textSecondary">
                            "0.0.1"
                        </Typography>
                    </Grid>
                </Grid>
            </footer>
        </Root>
    );
};

export default Footer;
