import React from "react";
// import Header from "./Header";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

import { ModeContext } from "../Context/ModeContext";
import useWidth, { isWidthDown } from "../useWidth";
import HomePageHeader from "../Component/HomePage/Navbar/header/HomePageHeader";
import Header from "./Header";


export default function WebsiteHeader(props) {
    
    const dashboard = document.location.pathname.startsWith("/home");
    const notLandingPage =
        document.location.pathname.endsWith("login") ||
        document.location.pathname.endsWith("register") ||
        document.location.pathname.endsWith("Forgotpassword");

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
        console.log("dd");
        
        header = <Header MenuButton={MenuButton} props={props} />
    } else if (
        (document.location.pathname === "/") ||
        notLandingPage
    ) {
        console.log("ddsssss");
        header =  <HomePageHeader closeDrawer />;
    }
    return  header;
}
