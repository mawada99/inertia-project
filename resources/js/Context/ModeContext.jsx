import { createContext, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useWidth, { isWidthDown, isWidthUp } from "../useWidth";
export const ModeContext = createContext();

const ModeContextProvider = (props) => {
    const isDarkModeEnabled = useMediaQuery("(prefers-color-scheme: dark)");
    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("xs", screenWidth);
    const isScreenLarge = isWidthUp("lg", screenWidth);
    const navDrawerOpen = localStorage.getItem("navDrawerOpen");

    const [firstLoad, setFirstLoad] = useState(false);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode")
            ? localStorage.getItem("darkMode") === "dark"
                ? true
                : false
            : isDarkModeEnabled
    );

    const ChangeMode = () => {
        darkMode
            ? localStorage.setItem("darkMode", "light")
            : localStorage.setItem("darkMode", "dark");
        setDarkMode(!darkMode);
    };

    // const [renewalMsg, setRenewalMsg] = useState(false)

    const isNavDrawerOpen = isScreenSmall
        ? false
        : navDrawerOpen !== null
        ? navDrawerOpen === "true"
        : isScreenLarge;
    const [navDrawer, setNavDrawer] = useState({
        top: isNavDrawerOpen,
        left: isNavDrawerOpen,
        bottom: isNavDrawerOpen,
        right: isNavDrawerOpen,
    });

    const [hasMessagesPermission, setHasMessagesPermission] = useState(false);

    return (
        <ModeContext.Provider
            value={{
                darkMode,
                ChangeMode,
                navDrawer,
                setNavDrawer,
                hasMessagesPermission,
                setHasMessagesPermission,
                setFirstLoad,
                firstLoad,
            }}
        >
            {props.children}
        </ModeContext.Provider>
    );
};

export default ModeContextProvider;
