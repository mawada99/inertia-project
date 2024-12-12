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
            pathname: "/admin",
            exact: true,
            icon: "ss",
            primary: t("dashboard"),
        },
    ];
    // const linksList = [
    //   {
    //     pathname: "/admin",
    //     exact: true,
    //     icon: AiOutlineDashboard,
    //     primary: t("dashboard"),
    //   },
    //   {
    //     sectionName: "requests",
    //     icon: CgNotes,
    //     primary: t("request"),
    //     children: [
    //       {
    //         pathname: "/admin/requests",
    //         exact: true,
    //         primary: t("requestList"),
    //         permission: "freight.request.list",
    //       },
    //       {
    //         pathname: "/admin/requests/create",
    //         exact: true,
    //         primary: t("createRequest"),
    //         permission: "freight.request.create",
    //       },
    //       {
    //         pathname: "/admin/warehouse-packages",
    //         exact: true,
    //         primary: t("WareHousePackagesSections"),
    //         permission: "freight.warehouse.list_packages",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "operations",
    //     icon: PiWarehouse,
    //     primary: t("operation"),
    //     children: [
    //       {
    //         pathname: "/admin/operations/rcvd",
    //         exact: true,
    //         primary: t("operationListrcvd"),
    //         permission: "freight.operation_rcvd.list",
    //       },
    //       {
    //         pathname: "/admin/packing-requests",
    //         exact: true,
    //         primary: t("packingRequests"),
    //         permission: "freight.request.packing",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "shipments",
    //     icon: GoContainer,
    //     primary: t("shipments"),
    //     children: [
    //       {
    //         pathname: "/admin/shipments",
    //         exact: true,
    //         primary: t("shipmentList"),
    //         permission: "freight.shipment.list",
    //       },
    //       {
    //         pathname: "/admin/shipments/create",
    //         exact: true,
    //         primary: t("createShipment"),
    //         permission: "freight.shipment.create",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "shipmentsOperations",
    //     icon: TbTruckLoading,
    //     primary: t("dailyOperation"),
    //     children: [
    //       {
    //         pathname: "/admin/status-shipments/schedule",
    //         exact: true,
    //         primary: t("scheduleShipments"),
    //         permission: "freight.shipment.scheduling",
    //       },
    //       {
    //         pathname: "/admin/operations/loading",
    //         exact: true,
    //         primary: t("operationListload"),
    //         permission: "freight.operation_loading.list",
    //       },
    //       {
    //         pathname: "/admin/status-shipments/transport",
    //         exact: true,
    //         primary: t("transportShipments"),
    //         permission: "freight.shipment.transporting",
    //       },
    //       {
    //         pathname: "/admin/status-shipments/arrived",
    //         exact: true,
    //         primary: t("arrivedShipments"),
    //         permission: "freight.shipment.arrival",
    //       },
    //       {
    //         pathname: "/admin/operations/unloaded",
    //         exact: true,
    //         primary: t("operationListUnLoad"),
    //         permission: "freight.operation_unloaded.list",
    //       },
    //       {
    //         pathname: "/admin/operations/delivered",
    //         exact: true,
    //         primary: t("operationListDelivered"),
    //         permission: "freight.operation_delivered.list",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "financialOperations",
    //     icon: RiMoneyDollarCircleLine,
    //     primary: t("financialOperations"),
    //     children: [
    //       {
    //         pathname: "/admin/bills",
    //         exact: true,
    //         primary: t("bill"),
    //         permission: "freight.bill.list",
    //       },
    //       {
    //         pathname: "/admin/invoices",
    //         exact: true,
    //         primary: t("invoice"),
    //         permission: "freight.invoice.list",
    //       },

    //       {
    //         pathname: "/admin/vouchers/receipt",
    //         exact: true,
    //         primary: t("voucherReceipt"),
    //         permission: "cash.voucher.list",
    //       },
    //       {
    //         pathname: "/admin/vouchers/payment",
    //         exact: true,
    //         primary: t("voucherPayment"),
    //         permission: "cash.voucher.list",
    //       },

    //       // {
    //       //   pathname: "/admin/safes-transfer",
    //       //   exact: true,
    //       //   primary: t("safesTransfer"),
    //       //   permission: "cash.cash_voucher.list",
    //       // },
    //       {
    //         pathname: "/admin/adjustments",
    //         exact: true,
    //         primary: t("adjustments"),
    //         permission: "freight.adjustment.list",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "customers",
    //     icon: FiUsers,
    //     primary: t("customersAndVendors"),
    //     children: [
    //       {
    //         pathname: "/admin/customers",
    //         exact: true,
    //         primary: t("customerList"),
    //         permission: "freight.customer.list",
    //       },
    //       {
    //         pathname: "/admin/customers/create",
    //         exact: true,
    //         primary: t("createCustomer"),
    //         permission: "freight.customer.create",
    //       },

    //       {
    //         pathname: "/admin/price-lists",
    //         exact: true,
    //         primary: t("listPriceLists"),
    //         permission: "freight.price_list.list",
    //       },
    //       {
    //         pathname: "/admin/vendors",
    //         exact: true,
    //         primary: t("vendorsList"),
    //         permission: "freight.vendor.list",
    //       },
    //       {
    //         pathname: "/admin/vendors/create",
    //         exact: true,
    //         primary: t("createVendor"),
    //         permission: "freight.vendor.create",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "agencyAndEmployees",
    //     icon: GoOrganization,
    //     primary: t("agencyAndEmployees"),
    //     children: [
    //       {
    //         pathname: "/admin/agencies",
    //         exact: true,
    //         primary: t("agencyList"),
    //         permission: "freight.agency.list",
    //       },
    //       {
    //         pathname: "/admin/agencies/create",
    //         exact: true,
    //         primary: t("createAgency"),
    //         permission: "freight.agency.create",
    //       },
    //       {
    //         pathname: "/admin/employees",
    //         exact: true,
    //         primary: t("employeesList"),
    //         permission: "freight.employee.list",
    //       },
    //       {
    //         pathname: "/admin/employees/create",
    //         exact: true,
    //         primary: t("createEmployee"),
    //         permission: "freight.employee.create",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "agentAndCarrier",
    //     icon: FiUsers,
    //     primary: t("agentAndCarrier"),
    //     children: [
    //       {
    //         pathname: "/admin/custom-agents",
    //         exact: true,
    //         primary: t("customAgentsList"),
    //         permission: "freight.custom_agent.list",
    //       },
    //       {
    //         pathname: "/admin/custom-agents/create",
    //         exact: true,
    //         primary: t("createAgent"),
    //         permission: "freight.custom_agent.create",
    //       },
    //       {
    //         pathname: "/admin/carriers",
    //         exact: true,
    //         primary: t("carriersList"),
    //         permission: "freight.carrier.list",
    //       },
    //       {
    //         pathname: "/admin/carriers/create",
    //         exact: true,
    //         primary: t("createCarrier"),
    //         permission: "freight.carrier.create",
    //       },
    //     ],
    //   },

    //   {
    //     sectionName: "finance",
    //     icon: RiBankLine,
    //     primary: t("finance"),
    //     children: [
    //       {
    //         pathname: "/admin/finance/gl-accounts",
    //         exact: true,
    //         primary: t("accountIndex"),
    //         permission: "accounting.gl_account.list",
    //       },

    //       {
    //         pathname: "/admin/finance/statement/main",
    //         exact: true,
    //         primary: t("mainAccountStatement"),
    //         permission: "accounting.gl_account.list",
    //       },
    //       {
    //         pathname: "/admin/finance/statement/sub",
    //         exact: true,
    //         primary: t("accountStatement"),
    //         permission: "accounting.journal_entry_record.list",
    //       },
    //       {
    //         pathname: "/admin/finance/statement/trial-balance",
    //         exact: true,
    //         primary: t("trialBalance"),
    //         permission: "accounting.gl_account.list",
    //       },
    //       {
    //         pathname: "/admin/finance/journal-entries",
    //         exact: true,
    //         primary: t("journalEntries"),
    //         permission: "accounting.journal_entry.list",
    //       },
    //       {
    //         pathname: "/admin/finance/currencies",
    //         exact: true,
    //         primary: t("currencyList"),
    //         permission: "cash.currency.list",
    //       },
    //       {
    //         pathname: "/admin/finance/financial-year",
    //         exact: true,
    //         primary: t("financialYear"),
    //         permission: "cash.financial_year.list",
    //       },
    //       {
    //         pathname: "/admin/financial-sheets",
    //         exact: true,
    //         primary: t("ListFinancialSheets"),
    //         permission: "accounting.financial_sheet.list",
    //       },

    //       {
    //         pathname: "/admin/create-sheets",
    //         exact: true,
    //         primary: t("createSheets"),
    //         permission: "accounting.sheet.create",
    //       },

    //       {
    //         pathname: "/admin/subsidiaries",
    //         exact: true,
    //         primary: t("subsidiaries"),
    //         permission: "accounting.subsidiary.list",
    //       },
    //       {
    //         pathname: "/admin/finance/journal-types",
    //         exact: true,
    //         primary: t("journalType"),
    //         permission: "accounting.journal_type.list",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "basicConfig",
    //     icon: LuClipboardEdit,
    //     primary: t("basicConfig"),
    //     children: [
    //       {
    //         pathname: "/admin/package-types",
    //         exact: true,
    //         primary: t("packageTypeList"),
    //         permission: "freight.package_type.list",
    //       },
    //       {
    //         pathname: "/admin/shipping-ports",
    //         exact: true,
    //         primary: t("shippingPortList"),
    //         permission: "freight.shipping_port.list",
    //       },

    //       {
    //         pathname: "/admin/organization",
    //         exact: true,
    //         primary: t("organizationData"),
    //         permission: "core.organization.view",
    //       },
    //       {
    //         pathname: "/admin/countries",
    //         exact: true,
    //         primary: t("countryList"),
    //         permission: "core.country.list",
    //       },

    //       {
    //         pathname: "/admin/banks",
    //         exact: true,
    //         primary: t("banks"),
    //         permission: "shipping.bank.list",
    //       },
    //       {
    //         pathname: "/admin/bank-branches",
    //         exact: true,
    //         primary: t("bankBranches"),
    //         permission: "cash.bank_branch.list",
    //       },

    //       {
    //         pathname: "/admin/branches",
    //         exact: true,
    //         primary: t("branches"),
    //         permission: "core.branch.list",
    //       },

    //       {
    //         pathname: "/admin/lookups",
    //         exact: true,
    //         primary: t("lookup"),
    //         permission: "core.lookup.list",
    //       },

    //       {
    //         pathname: "/admin/inco-terms",
    //         exact: true,
    //         primary: t("incoTermList"),
    //         permission: "freight.inco_term.list",
    //       },
    //       {
    //         pathname: "/admin/transaction-types",
    //         exact: true,
    //         primary: t("transactionTypes"),
    //         permission: "freight.transaction_type.list",
    //       },
    //       {
    //         pathname: "/admin/warehouse",
    //         exact: true,
    //         primary: t("WareHouseSections"),
    //         permission: "freight.warehouse.list",
    //       },

    //       {
    //         pathname: "/admin/product",
    //         exact: true,
    //         primary: t("productList"),
    //         permission: "freight.product.list",
    //       },
    //       {
    //         pathname: "/admin/commodities",
    //         exact: true,
    //         primary: t("commoditiesList"),
    //         permission: "freight.commodity.list",
    //       },
    //       {
    //         pathname: "/admin/charge-types",
    //         exact: true,
    //         primary: t("listChargeTypes"),
    //         permission: "freight.charge_type.list",
    //       },
    //       {
    //         pathname: "/admin/tax",
    //         exact: true,
    //         primary: t("tax"),
    //         permission: "freight.tax.list",
    //       },
    //       {
    //         pathname: "/admin/safes",
    //         exact: true,
    //         primary: t("safes"),
    //         permission: "cash.safe.list",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "security",
    //     icon: BiLock,
    //     primary: t("security"),
    //     children: [
    //       {
    //         pathname: "/admin/users",
    //         exact: true,
    //         primary: t("users"),
    //         permission: "core.user.list",
    //       },
    //       {
    //         pathname: "/admin/roles",
    //         exact: true,
    //         primary: t("roles"),
    //         permission: "core.role.list",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "settings",
    //     icon: BsGear,
    //     primary: t("settings"),
    //     children: [
    //       {
    //         pathname: "/admin/shipping-settings",
    //         exact: true,
    //         primary: t("freightSettings"),
    //         permission: "freight.settings.update",
    //       },
    //       {
    //         pathname: "/admin/accounting-settings",
    //         exact: true,
    //         primary: t("accountingSettings"),
    //         permission: "accounting.settings.update",
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "maintenance",
    //     icon: AiOutlineControl,
    //     primary: t("maintenance"),
    //     children: [
    //       {
    //         pathname: "/admin/logs",
    //         exact: true,
    //         primary: t("logs"),
    //         permission: "core.log.view",
    //       },
    //     ],
    //   },
    // ];

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
                                authorized && (
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
                                authorized && (
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
