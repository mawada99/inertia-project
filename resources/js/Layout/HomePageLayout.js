import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { Fragment } from "react";

import withErrorHandler from "../Error/withErrorHandler";
// import HomePageHeader from "../Component/HomePage/Navbar/header/HomePageHeader";
const PREFIX = "HomePageLayout";

const classes = {
    root: `${PREFIX}-root`,
    drawerHeader: `${PREFIX}-drawerHeader`,
};

const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: "flex",
        justifyContent: "center",
    },

    [`& .${classes.drawerHeader}`]: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
}));

const HomePageLayout = (props) => {
    return (
        <Root className={classes.root}>
            <CssBaseline />

            <Fragment>
                {/* <HomePageHeader closeDrawer /> */}

                <main>
                    <div className={classes.drawerHeader} />
                    {props.children}
                </main>
            </Fragment>
        </Root>
    );
};

export default memo(withErrorHandler(HomePageLayout));
