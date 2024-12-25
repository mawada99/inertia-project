import { Link } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/ku";
import { useTranslation } from "react-i18next";
import WebsiteHeader from "../Layout/WebsiteHeader";
import { ModeContext } from "../Context/ModeContext";
import { LANGUAGES_DETAILS } from "../LanguagesVariables";
import { Fragment, useContext, useEffect } from "react";

import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Footer from "../Layout/Footer";
const PREFIX = "Layout";

const classes = {
    drawerHeader: `${PREFIX}-drawerHeader`,
    mainContainer: `${PREFIX}-mainContainer`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.drawerHeader}`]: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        justifyContent: "space-between",
    },

    [`& .${classes.mainContainer}`]: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
}));

const languages = ["ar", "en", "ku"];
export default function Layout({ children }) {
    const { i18n } = useTranslation();

    document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", i18n.language === "ku" ? "rtl" : i18n.dir());
    const Languages = languages;

    const { firstLoad } = useContext(ModeContext);

    useEffect(() => {
        const lang = LANGUAGES_DETAILS[i18n.language];
        document.body.style.fontFamily = `${lang.fontFamily}, sans-serif !important`;

        return () => {
            document.body.style.fontFamily = "";
        };
    }, [i18n.language]);

    moment.locale(
        localStorage.getItem("i18nextLng")
            ? localStorage.getItem("i18nextLng")
            : Languages[0]
    );
    return (
        <Root>
            <CssBaseline />
            <header>
                {" "}
                <Fragment>
                    {/* Conditionally render WebsiteHeader */}
                    {document.location.pathname.startsWith("/admin") ? (
                        firstLoad && <WebsiteHeader />
                    ) : (
                        <WebsiteHeader />
                    )}
                    {/* Render the main app */}
                </Fragment>
            </header>

            <main className={classes.mainContainer}>
                <div className={classes.drawerHeader} />
                <article>{children}</article>
                <Footer />
            </main>
        </Root>
    );
}
