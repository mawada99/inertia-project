import {
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { memo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import clsx from "clsx";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { SecuredNavLink } from "../Component/HOC/CustomComponents/Secured";
import HFWraper from "./WraperHeaderFooter";
// import { GoContainer } from "react-icons/go";

const PREFIX = "NavDrawer";

const classes = {
    root: `${PREFIX}-root`,
    bottomDrawer: `${PREFIX}-bottomDrawer`,
    dialog: `${PREFIX}-dialog`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    profile: `${PREFIX}-profile`,
    topList: `${PREFIX}-topList`,
    navLink: `${PREFIX}-navLink`,
    listItemFocus: `${PREFIX}-listItemFocus`,
    outline: `${PREFIX}-outline`,
    nestedListItem: `${PREFIX}-nestedListItem`,
    navIcon: `${PREFIX}-navIcon`,
    navSubItem: `${PREFIX}-navSubItem`,
    renewalStyle: `${PREFIX}-renewalStyle`,
    FooterIcons: `${PREFIX}-FooterIcons`,
};

const drawerWidth = 248;

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.root}`]: {
        display: "flex",
    },

    [`& .${classes.bottomDrawer}`]: {
        [theme.breakpoints.down("sm")]: {
            width: "auto !important",
            height: "100%",
        },
    },

    [`& .${classes.dialog}`]: {
        minWidth: "325px",
    },

    [`& .${classes.drawer}`]: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    [`& .${classes.drawerPaper}`]: {
        zIndex: 1090,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
        },
        "& .MuiList-padding": {
            padding: 0,
        },
        // overflow: "hidden"
    },
    [`& .${classes.renewalStyle}`]: {
        top: 48,
        height: "calc(100% - 48px)",
    },

    [`& .${classes.profile}`]: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& a": {
            color: theme.palette.text.secondary + "!important",
            textDecoration: "none",
        },
    },

    [`& .${classes.FooterIcons}`]: {
        borderTop: `1px solid ${theme.palette.divider}`,
    },

    [`& .${classes.topList}`]: {
        "&:hover": {
            overflowY: "auto",
        },
        overflow: "hidden",
        height: "100vh",
        "& .MuiListItemIcon-root": {
            minWidth: theme.spacing(4),
        },

        textTransform: "capitalize",
    },

    [`& .${classes.navLink}`]: {
        textDecoration: "none",
        color: theme.palette.text.primary + "!important",
        "& svg": {
            color: theme.palette.text.primary + "!important",
        },
        "&:hover": {
            color: theme.palette.primary.main + "!important",
        },
        "& :hover svg": {
            color: theme.palette.primary.main + "!important",
        },
    },

    [`& .${classes.listItemFocus}`]: {
        color: `${theme.palette.primary.main}!important`,
        "& svg": {
            color: `${theme.palette.primary.main}!important`,
        },
    },

    [`& .${classes.outline}`]: {
        fontFamily: "Material Icons Outlined",
    },

    [`& .${classes.nestedListItem}`]: {
        paddingLeft: theme.spacing(4),
    },

    [`& .${classes.navIcon}`]: {
        fontSize: 20,
        color: "inherit",
    },

    [`& .${classes.navSubItem}`]: {
        minWidth: "20px !important",
    },
}));

const NavDrawer = (props) => {
    const { navDrawer, handleDrawerClose, drawerAnchor, top } = props;
    let collapseOpened = useRef(true);
    const { t } = useTranslation();
    const theme = useTheme();
    const storeNavLinkIndex = (index) =>
        localStorage.setItem("activeNavLink", index);

    const [nestedList, setNestedList] = useState({});
    const handleNestedNavLink = (type) => {
        storeNavLinkIndex(type);
        setNestedList((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    const linksList = [
        {
            pathname: "/home",
            exact: true,
            icon: "ss",
            primary: t("dashboard"),
        },
        {
            sectionName: "shipments",
            icon: "ss",
            primary: t("shipments"),
            children: [
                {
                    pathname: "/shipments",
                    exact: true,
                    primary: t("shipmentList"),
                    // permission: "freight.shipment.list",
                },
                {
                    pathname: "/shipments/create",
                    exact: true,
                    primary: t("createShipment"),
                    // permission: "freight.shipment.create",
                },
            ],
        },
    ];
    return (
        <Root>
            <Drawer
                // sx={{ visibility: !token ? "hidd/en" : undefined }}
                className={clsx(classes.drawer, {
                    [classes.bottomDrawer]: navDrawer[drawerAnchor],
                })}
                variant="persistent"
                anchor={drawerAnchor}
                open={navDrawer[drawerAnchor]}
                onClose={() => handleDrawerClose()}
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.bottomDrawer]: navDrawer[drawerAnchor],
                        [classes.renewalStyle]: Boolean(top),
                    }),
                }}
            >
                <HFWraper />
                <Divider />

                {/* <div className={classes.profile}>
          <Profile profileData={Globals.user} />
        </div> */}
                <List className={classes.topList}>
                    {linksList.map((link, index) => {
                        console.log(link);

                        if (!link.children) {
                            const authorized = link.permission ? true : true;
                            return (
                                true && (
                                    <SecuredNavLink
                                        key={index}
                                        to={{ pathname: link.pathname }}
                                        activeClassName={classes.listItemFocus}
                                        className={classes.navLink}
                                        exact={link.exact}
                                    >
                                        <ListItem
                                            button
                                            onClick={() => {
                                                drawerAnchor === "bottom" &&
                                                    handleDrawerClose();
                                            }}
                                        >
                                            <ListItemIcon
                                                className={classes.navIcon}
                                            >
                                                <link.icon />
                                            </ListItemIcon>
                                            <ListItemText
                                                disableTypography={true}
                                                primary={link.primary}
                                            />
                                        </ListItem>
                                    </SecuredNavLink>
                                )
                            );
                        } else {
                            if (
                                +localStorage.getItem("activeNavLink") ===
                                    index &&
                                collapseOpened.current
                            ) {
                                nestedList[index] = true;
                                collapseOpened.current = false;
                            }
                            const authorized = link.children.some((child) =>
                                child.show !== undefined ? child.show : true
                            );
                            return (
                                true && (
                                    <Fragment key={index}>
                                        <ListItemButton
                                            onClick={() =>
                                                handleNestedNavLink(index)
                                            }
                                        >
                                            <ListItemIcon>
                                                <link.icon
                                                    className={classes.navIcon}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                disableTypography={true}
                                                primary={link.primary}
                                            />
                                            {nestedList[index] ? (
                                                <ExpandMore />
                                            ) : theme.direction === "ltr" ? (
                                                <ChevronRight />
                                            ) : (
                                                <ChevronLeft />
                                            )}
                                        </ListItemButton>
                                        <Collapse
                                            key={index}
                                            in={nestedList[index] ?? false}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            {link.children.map((child, i) => {
                                                return (
                                                    <SecuredNavLink
                                                        key={i}
                                                        hideLink={
                                                            child?.hideLink
                                                        }
                                                        show={child?.show}
                                                        to={{
                                                            pathname:
                                                                child.pathname,
                                                        }}
                                                        activeClassName={
                                                            classes.listItemFocus
                                                        }
                                                        exact={child.exact}
                                                        className={
                                                            classes.navLink
                                                        }
                                                        permission={
                                                            child.permission
                                                        }
                                                    >
                                                        <ListItem
                                                            className={
                                                                classes.nestedListItem
                                                            }
                                                            button
                                                            onClick={() => {
                                                                child?.action &&
                                                                    child.action();
                                                                storeNavLinkIndex(
                                                                    index
                                                                );
                                                                drawerAnchor ===
                                                                    "bottom" &&
                                                                    handleDrawerClose();
                                                            }}
                                                        >
                                                            <ListItemIcon
                                                                className={
                                                                    classes.navSubItem
                                                                }
                                                            >
                                                                {/* <GoDash /> */}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                disableTypography={
                                                                    true
                                                                }
                                                                primary={
                                                                    child.primary
                                                                }
                                                            />
                                                        </ListItem>
                                                    </SecuredNavLink>
                                                );
                                            })}
                                        </Collapse>
                                    </Fragment>
                                )
                            );
                        }
                    })}
                </List>
                {/* <div className={classes.FooterIcons}>
          <FooterIcons />
        </div> */}
            </Drawer>
        </Root>
    );
};

export default memo(NavDrawer);
