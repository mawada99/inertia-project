import { AppBar, Drawer, Grid2, IconButton, Toolbar } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Menu, Login, SpeedOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { Fragment } from "react";
//   import { FadeIn } from "react-slide-fade-in";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import LanguageIcons from "../../../HOC/CustomComponents/LanguageIcons";
import { styled } from "@mui/material/styles";
import DarkModeIcon from "../../../HOC/CustomComponents/DarkModeIcon";
import LogoImg from "../../../../Layout/LogoImg";

import useWidth, { isWidthUp } from "../../../../useWidth";
import AvatarComponent from "../../../../Layout/Avatar";

const PREFIX = "Header";

const classes = {
    appBar: `${PREFIX}-appBar`,
    stickyHeader: `${PREFIX}-stickyHeader`,
    logo: `${PREFIX}-logo`,
    link: `${PREFIX}-link`,
    trackingPopover: `${PREFIX}-trackingPopover`,
    tracking: `${PREFIX}-tracking`,
    trackTypography: `${PREFIX}-trackTypography`,
    activeLink: `${PREFIX}-activeLink`,
    img: `${PREFIX}-img`,
    loginButton: `${PREFIX}-loginButton`,
    overridesLoginButton: `${PREFIX}-overridesLoginButton`,
    lang: `${PREFIX}-lang`,
    iconsWrapper: `${PREFIX}-iconsWrapper`,
    loginButtonNoPadding: `${PREFIX}-loginButtonNoPadding`,
};

const Root = styled("div")(({ theme }) => ({
    display: "flex",
    [`& .${classes.activeLink}`]: {
        color: theme.palette.primary.main,
    },
    [`& .${classes.appBar}`]: {
        boxShadow: "none",
        backgroundColor: theme.palette.background.paper,
    },

    [`& .${classes.stickyHeader}`]: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        animationName: "$animationFade",
        animationDuration: "1s",
        animationFillMode: "both",
    },

    [`& .${classes.logo}`]: {
        marginLeft: theme.spacing(1),
        display: "flex",
        alignItems: "center",
    },
    [`& .${classes.link}`]: {
        display: "inline-block",
        textDecoration: "none",
        textTransform: "uppercase",
        fontSize: 13,
        fontWeight: 500,
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(0, 1.5),
        },
        color: theme.palette.text.primary,
        "&:hover": {
            color: theme.palette.primary.main,
            cursor: "pointer",
        },
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
            padding: theme.spacing(3, 0),
            borderBottom: `1px solid ${theme.palette.action.hover}`,
            width: "100%",
            color: theme.palette.text.secondary,
        },
    },
    [`& .${classes.trackingPopover}`]: {
        padding: theme.spacing(2),
        maxWidth: 300,
    },
    [`& .${classes.tracking}`]: {
        color: theme.palette.text.primary,
        fontWeight: "600",
        [theme.breakpoints.down("lg")]: {
            color: theme.palette.text.secondary,
        },
    },
    [`& .${classes.trackTypography}`]: {
        fontWeight: "600",
        margin: theme.spacing(2),
    },

    [`& .${classes.img}`]: {
        height: 48,
        "@media (max-width:917px)": {
            height: 35,
        },
        "@media (max-width:344px)": {
            height: 22,
        },
    },

    [`& .${classes.loginButton}`]: {
        borderRadius: 30,
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: theme.spacing(4),
        minWidth: theme.spacing(14),
        color: theme.palette.primary.main,
        "&:hover": {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            cursor: "pointer",
        },
    },
    [`& .${classes.loginButtonNoPadding}`]: {
        padding: theme.spacing(0),
        borderBottom: `none`,
    },
    [`& .${classes.overridesLoginButton}`]: {
        border: "none",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        borderBottom: `1px solid ${theme.palette.action.hover}`,
        "&:hover": {
            borderBottom: `1px solid ${theme.palette.action.hover}`,
            border: "none",
            background: theme.palette.common.white,
            color: theme.palette.primary.main,
            cursor: "pointer",
        },
    },
    [`& .${classes.lang}`]: {
        [theme.breakpoints.up("md")]: {
            marginLeft: theme.spacing(1),
        },
    },

    "@keyframes animationFade": {
        "0%": {
            opacity: 0,
            WebkitTransform: "translate3d(0, -100%, 0)",
            transform: "translate3d(0, -100%, 0)",
        },
        "100%": {
            opacity: 1,
            WebkitTransform: "none",
            transform: "none",
        },
    },
    [`& .${classes.iconsWrapper}`]: {
        display: "flex",
        alignItems: "center",
    },
}));

const linkStyle = ({ theme }) => ({
    display: "inline-block",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: 500,
    [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 1.5),
    },
    color: theme.palette.text.primary,
    "&:hover": {
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
        textAlign: "center",
        padding: theme.spacing(3, 0),
        borderBottom: `1px solid ${theme.palette.action.hover}`,
        width: "100%",
        color: theme.palette.text.secondary,
    },
});

const StyledLink = styled(Link)(linkStyle);
// const StyledLang = styled(LanguageIcons)(linkStyle);

const Header = (props) => {
    const { t } = useTranslation("home");

    const [shouldShowHeader, setShouldShowHeader] = useState(false);
    const listenToScroll = () => {
        setShouldShowHeader(window.pageYOffset > 300);
    };
    useEffect(() => {
        window.addEventListener("scroll", listenToScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        };
    }, []);

    const screenWidth = useWidth();

    const screenIsMedium = isWidthUp("md", screenWidth);
    const [drawerState, setDrawerState] = React.useState(false);

    //################ Drawer ################
    const closeDrawer = (id) => {
        setDrawerState(false);
        if (props.closeDrawer && id) {
            window.location.href = `/#${id}`;
            // pushUrl(props, `/#${id}`);
        }
    };

    const sectionsLinks = (
        [
            "banner",
            "track",
            "about",
            "services",
            "features",
            "statistics",
            "contact",
        ] ?? []
    ).map((field) => {
        switch (field) {
            default:
                return "";
        }
    });

    const links = sectionsLinks.concat(
        localStorage.getItem("token")
            ? []
            : [
                  <StyledLink
                      className={clsx(classes.link, {
                          [classes.loginButton]: screenIsMedium,
                      })}
                      // sx={{ ...style, ...(screenIsMedium && classes.loginButton) }}
                      onClick={closeDrawer}
                      to={localStorage.getItem("token") ? "/admin" : "/login"}
                  >
                      {localStorage.getItem("token")
                          ? t("home:dashboard")
                          : t("home:login")}
                  </StyledLink>,
                  // <StyledLang
                  //   // sx={style}
                  //   className={classes.link}
                  //   onClick={() => {
                  //     closeDrawer();
                  //   }}
                  //   asLink
                  // />,
              ]
    );
    const NavLinks = () => {
        return screenIsMedium ? (
            <Fragment>
                {links.map((l, i) => (
                    <Fragment key={i}>{l}</Fragment>
                ))}
            </Fragment>
        ) : (
            <Drawer
                variant="temporary"
                anchor={"top"}
                open={drawerState}
                onClose={closeDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {links.map((l, i) => (
                    <div key={i} style={{ margin: "10px", opacity: 1 }}>
                        {l}
                    </div>
                    // <>d</>
                ))}
            </Drawer>
        );
    };

    const ifLandingPage = document.location.pathname === "/";

    const loginButton =
        document.location.pathname !== "/" &&
        !document.location.pathname.endsWith("login") &&
        !document.location.pathname.endsWith("register") &&
        !(
            localStorage.getItem("token") &&
            document.location.pathname.endsWith("renewal")
        );

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    return (
        <Root>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, {
                    [classes.stickyHeader]: shouldShowHeader,
                })}
            >
                <Toolbar variant="regular">
                    <Grid2
                        container
                        justifyContent="space-between"
                        wrap="nowrap"
                    >
                        <Grid2 className={classes.logo} size={6}>
                            <Link to="/">
                                {/* <img src={logo} alt="logo" className={classes.img} /> */}
                                <LogoImg className={classes.img} />
                            </Link>
                        </Grid2>
                        <Grid2
                            className={classes.iconsWrapper}
                            size={6}
                            textAlign={"end"}
                        >
                            {ifLandingPage && NavLinks()}
                            {!localStorage.getItem("token") && loginButton && (
                                <StyledLink
                                    className={clsx({
                                        [classes.loginButton]: screenIsMedium,
                                        [classes.loginButtonNoPadding]:
                                            !screenIsMedium,
                                    })}
                                    to={
                                        localStorage.getItem("token")
                                            ? "/admin"
                                            : "/login"
                                    }
                                >
                                    {!screenIsMedium ? (
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                setDrawerState(true);
                                            }}
                                            size="medium"
                                        >
                                            {localStorage.getItem("token") ? (
                                                <SpeedOutlined color="primary" />
                                            ) : (
                                                <Login color="primary" />
                                            )}
                                        </IconButton>
                                    ) : localStorage.getItem("token") ? (
                                        t("home:dashboard")
                                    ) : (
                                        t("home:login")
                                    )}
                                    {/* {localStorage.getItem("token") ? t("home:dashboard") : t("home:login")} */}
                                </StyledLink>
                            )}
                            {!localStorage.getItem("token") && <DarkModeIcon />}
                            {!localStorage.getItem("token") && (
                                <LanguageIcons />
                            )}
                            {localStorage.getItem("token") && (
                                <AvatarComponent
                                    addDashboard={true}
                                    open={open}
                                    handleClick={handleClick}
                                    handleCloseMenu={handleCloseMenu}
                                    anchorEl={anchorEl}
                                />
                            )}
                            {!screenIsMedium && ifLandingPage && (
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        setDrawerState(true);
                                    }}
                                    size="medium"
                                >
                                    <Menu color="primary" />
                                </IconButton>
                            )}
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </AppBar>
        </Root>
    );
};

export default memo(Header);
