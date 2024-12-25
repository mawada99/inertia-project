import React from "react";
import Header from "./Header";
import HomePageHeader from "../Component/HomePage/Navbar/header/HomePageHeader";
import { ModeContext } from "../Context/ModeContext";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import useWidth, { isWidthDown } from "../useWidth";

export default function WebsiteHeader(props) {
    const dashboard = document.location.pathname.startsWith("/");
    const notLandingPage =
        document.location.pathname.endsWith("login") ||
        document.location.pathname.endsWith("signup") ||
        document.location.pathname.endsWith("renewal") ||
        document.location.pathname.startsWith("/review") ||
        document.location.pathname.startsWith("/track") ||
        document.location.pathname.startsWith("/delivery-info") ||
        document.location.pathname.endsWith("forgot-password");

    const { navDrawer, setNavDrawer } = useContext(ModeContext);
    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("xs", screenWidth);
    const drawerAnchor = isScreenSmall ? "bottom" : "left";

    let header;

    const toggleDrawer = (anchor, open) => {
        setNavDrawer((prev) => ({ ...prev, [anchor]: open }));
    };

    const drawerToggleButton = () => {
        toggleDrawer(drawerAnchor, !navDrawer[drawerAnchor]);
        localStorage.setItem("navDrawerOpen", !navDrawer[drawerAnchor]);
    };

    const MenuButton = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerToggleButton}
                edge="start"
                size={isScreenSmall ? "small" : "medium"}
                sx={{ p: 1 }}
            >
                <Menu
                    fontSize={isScreenSmall ? "small" : "medium"}
                    color="primary"
                />
            </IconButton>
        );
    };

    if (dashboard) {
        header = <Header MenuButton={MenuButton} props={props} />;
    } else if (document.location.pathname === "/" || notLandingPage) {
        header = <HomePageHeader closeDrawer />;
    }
    return header;
}
