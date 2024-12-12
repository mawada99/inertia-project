import { styled } from "@mui/material/styles";
import React, { Fragment, memo, useEffect } from "react";

// import { Menu } from "@mui/icons-material";
import clsx from "clsx";
// import Header from "./Header";
// import NavDrawer from "./NavDrawer";
// import withErrorHandler from "../Error/withErrorHandler";
// import useWidth, { isWidthDown } from "../Hooks/useWidth";
// import Footer from "./Footer";
// import NotificationsContainer from "./Notifications/NotificationsContainer";

// import MessageContainer from "./Message/MessagesContainer";
import { LANGUAGES_DETAILS } from "../LanguagesVariables";
import { useContext } from "react";
import { ModeContext } from "../Context/ModeContext";
import useWidth, { isWidthDown } from "../useWidth";
import Footer from "../Layout/Footer";
import NavDrawer from "../Layout/NavDrawer";
import { useTranslation } from "react-i18next";
import WebsiteHeader from "../Layout/WebsiteHeader";
import moment from "moment";

const PREFIX = "LayoutWithDrawer";

const classes = {
    root: `${PREFIX}-root`,
    appBar: `${PREFIX}-appBar`,
    drawerHeader: `${PREFIX}-drawerHeader`,
    lang: `${PREFIX}-lang`,
    contentWrapper: `${PREFIX}-contentWrapper`,
    content: `${PREFIX}-content`,
    contentShift: `${PREFIX}-contentShift`,
    renewalContainer: `${PREFIX}-renewalContainer`,
};

const drawerWidth = 248;

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.root}`]: {
        display: "flex",
        position: "relative",
        // transition: "all 1s",
    },

    [`& .${classes.appBar}`]: {
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },

    [`& .${classes.drawerHeader}`]: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },

    [`& .${classes.lang}`]: {
        marginLeft: theme.spacing(1),
    },

    [`& .${classes.contentWrapper}`]: {
        flexGrow: 1,
    },

    [`& .${classes.content}`]: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("sm")]: {
            marginLeft: -drawerWidth,
        },
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
    },

    [`& .${classes.contentShift}`]: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up("sm")]: {
            marginLeft: 0,
        },
    },
    [`& .${classes.renewalContainer}`]: {
        width: "100%",
        position: "fixed",
        zIndex: 1068,
    },
}));
const languages = ["ar", "en", "ku"];
const LayoutWithDrawer = (props) => {
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
    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("xs", screenWidth);
    const drawerAnchor = isScreenSmall ? "bottom" : "left";
    const { navDrawer, setNavDrawer } = useContext(ModeContext);

    useEffect(() => {
        if (!localStorage.getItem("firstOpen")) {
            localStorage.setItem("firstOpen", new Date());
        }
        return () => {};
    }, []);

    const toggleDrawer = (anchor, open) => {
        setNavDrawer((prev) => ({ ...prev, [anchor]: open }));
    };

    const handleDrawerClose = () => {
        toggleDrawer(drawerAnchor, false);
    };
    return (
        <Root>
            <header>
                {" "}
                <Fragment>
                    {console.log("wwwwwwwwwwwwwwwww")}
                    {/* Conditionally render WebsiteHeader */}
                    {document.location.pathname.startsWith("/admin") ? (
                        firstLoad && <WebsiteHeader />
                    ) : (
                        <WebsiteHeader />
                    )}
                    {/* Render the main app */}
                </Fragment>
            </header>
            <div className={classes.root}>
                {/* <Header top={open ? 48 : 0} MenuButton={MenuButton} Message={MessageContainer} Notification={NotificationsContainer} props={props} /> */}
                <NavDrawer
                    // top={open ? 48 : 0}
                    navDrawer={navDrawer}
                    drawerAnchor={drawerAnchor}
                    handleDrawerClose={handleDrawerClose}
                />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: navDrawer[drawerAnchor],
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div className={classes.contentWrapper}>
                        {props.children}
                    </div>
                    <Footer />
                </main>
            </div>
        </Root>
    );
};

export default memo(LayoutWithDrawer);
