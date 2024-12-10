import React from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import * as color from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useContext } from "react";
import { CssBaseline, darkScrollbar } from "@mui/material";
import { LANGUAGES_DETAILS } from "./LanguagesVariables";
// import lightScrollbar from "./lightScrollbar";
import { ModeContext } from "./Context/ModeContext";

export const muiCache = createCache({
    key: "mui",
});
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function withRoot(Component) {
    function WithRoot(props) {
        // const { i18n } = useTranslation();

        const { darkMode } = useContext(ModeContext);
        const primaryColor = darkMode
            ? "#f5696b"
            : "#f74754";
        // const lang = LANGUAGES_DETAILS[i18n.language];

        const dir ="rtl"

        const theme = createTheme({
            direction:  "rtl" ,

            components: {
                MuiCssBaseline: {
                    styleOverrides: (themeParam) => ({
                        body:
                            themeParam.palette.mode === "dark"
                                ? darkScrollbar()
                                : darkScrollbar(),
                    }),
                },
                MuiIcon: {
                    styleOverrides: {
                        root: {
                            fontFamily: "'Material Icons Outlined' !important",
                        },
                    },
                },
                MuiToolbar: {
                    styleOverrides: {
                        root: {
                            textTransform: "capitalize",
                        },
                    },
                },

                MuiTableCell: {
                    styleOverrides: {
                        root: {
                            padding: "0 16px",
                            maxHeight: "45px",
                            height: "45px",
                            whiteSpace: "nowrap",
                        },
                        head: {
                            // fontWeight: 600,
                        },
                    },
                },
                MuiSelect: {
                    defaultProps: {
                        variant: "filled",
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundImage: "none",
                        },
                    },
                },
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            "& label ,& input ,& .MuiSelect-select": {
                                // fontSize: "0.800rem",
                            },
                        },
                    },
                },
                MuiOutlinedInput: {
                    notchedOutline: {
                        "& legend": {
                            float: "none",
                            margin: "initial",
                        },
                    },
                },
            },

            palette: {
                mode: darkMode ? "dark" : "light",
                // mode: "dark",
                primary: {
                    main: primaryColor.startsWith("#")
                        ? primaryColor
                        : color[`${primaryColor}`][500],
                },
                ...(darkMode
                    ? {
                          background: {
                              default: "#18191a",
                              paper: "#2f3031",
                              hover: "rgba(73, 73, 73)",
                              appTitle: "rgba(73, 73, 73)",
                          },
                      }
                    : {
                          background: {
                              default: "#fafafa",
                              paper: "#fff",
                              hover: "#f5f5f5",
                              appTitle: "#f5f7f9",
                          },
                      }),
                // secondary: { main: color.blue[400] }
            },
            typography: {
                fontFamily: ["sans-serif"].join(","),
                fontSize: 12.5,
            },
        });

        // JssProvider allows customizing the JSS styling solution.
        return (
            <CacheProvider value={dir === "rtl" ? cacheRtl : muiCache}>
                {/* <StyledProvider injectFirst> */}
                <ThemeProvider
                    theme={
                        dir === "rtl"
                            ? {
                                  ...theme,

                                  direction: "rtl",
                              }
                            : {
                                  ...theme,

                                  direction: "ltr",
                              }
                    }
                >
                    <CssBaseline />
                    <div>
                        <SnackbarProvider maxSnack={3}>
                            <Component {...props} />
                        </SnackbarProvider>
                    </div>
                </ThemeProvider>
                {/* </StyledProvider> */}
            </CacheProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
