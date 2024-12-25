import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
// import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import SpanLink from "../Component/HOC/CustomComponents/SpanLink";

const PREFIX = "WareHouse";

const classes = {
    spanLink: `${PREFIX}-spanLink`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.spanLink}`]: {
        fontSize: "0.9rem",
    },
    [`& .MuiBreadcrumbs-separator`]: {
        fontSize: "1.4rem",
        marginTop: "-4px",
    },
}));

const BreadcrumbsWidget = (props) => {
    const { t } = useTranslation();
    const { path, type } = props;

    const URLArray = path?.split("/");
    URLArray?.shift();

    const URLObj = [];

    const voucherTitles = {
        receipt: "voucherReceipt",
        payment: "voucherPayment",
    };
    const operationTitles = {
        rcvd: "operationListrcvd",
        loading: "operationListload",
        unloaded: "operationListUnLoad",
        pckd: "operationPckd",
        delivered: "operationListDelivered",
    };
    const statusShipments = {
        booking: "scheduleShipments",
        loading: "transportShipments",
        transporting: "arrivedShipments",
    };

    URLArray?.map((el) => {
        switch (el) {
            case "admin":
                URLObj.push({
                    name: "home",
                    path: "/admin",
                });
                break;

            case "package-types":
                URLObj.push({
                    name: "packageTypeList",
                    path: `/admin/package-types`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "shipping-ports":
                URLObj.push({
                    name: "shippingPortList",
                    path: `/admin/shipping-ports`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "employees":
                URLObj.push({
                    name: "employeesList",
                    path: `/admin/employees`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "vendors":
                URLObj.push({
                    name: "vendorsList",
                    path: `/admin/vendors`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "organization":
                URLObj.push({
                    name: "organizationData",
                    path: `/admin/organization`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "countries":
                URLObj.push({
                    name: "countryList",
                    path: `/admin/countries`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "customers":
                URLObj.push({
                    name: "customerList",
                    path: `/admin/customers`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "price-lists":
                URLObj.push({
                    name: "listPriceLists",
                    path: `/admin/price-lists`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "custom-agents":
                URLObj.push({
                    name: "customAgentsList",
                    path: `/admin/custom-agents`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "agencies":
                URLObj.push({
                    name: "agencyList",
                    path: `/admin/agencies`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "carriers":
                URLObj.push({
                    name: "carriersList",
                    path: `/admin/carriers`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "bank-branches":
                URLObj.push({
                    name: "bankBranches",
                    path: `/admin/bank-branches`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;

            case "banks":
                URLObj.push({
                    name: "banks",
                    path: `/admin/banks`,
                });
                break;
            case "warehouse-packages":
                URLObj.push({
                    name: "WareHousePackagesSections",
                    path: `/admin/warehouse-packages`,
                });
                break;
            case "branches":
                URLObj.push({
                    name: "branches",
                    path: `/admin/branches`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "roles":
                URLObj.push({
                    name: "roles",
                    path: `/admin/roles`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "product":
                URLObj.push({
                    name: "productList",
                    path: `/admin/product`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "tax":
                URLObj.push({
                    name: "tax",
                    path: `/admin/tax`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "bills":
                URLObj.push({
                    name: "bill",
                    path: `/admin/bills`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "invoices":
                URLObj.push({
                    name: "invoice",
                    path: `/admin/invoices`,
                });

                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "adjustments":
                URLObj.push({
                    name: "adjustments",
                    path: `/admin/adjustments`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;

            case "requests":
                URLObj.push({
                    name: "requestList",
                    path: `/admin/requests`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "subsidiaries":
                URLObj.push({
                    name: "subsidiaries",
                    path: `/admin/subsidiaries`,
                });
                break;
            case "journal-types":
                URLObj.push({
                    name: "journalType",
                    path: `/admin/journal-types`,
                });
                break;
            case "lookups":
                URLObj.push({
                    name: "lookup",
                    path: `/admin/lookups`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "gl-accounts":
                URLObj.push({
                    name: "accountIndex",
                    path: `/admin/gl-accounts`,
                });
                break;
            case "create-sheets":
                URLObj.push({
                    name: "createSheets",
                    path: `admin/create-sheets`,
                });
                break;
            case "packing-requests":
                URLObj.push({
                    name: "packingRequests",
                    path: `admin/packing-requests`,
                });
                break;
            case "status-shipments":
                URLObj.push({
                    name: statusShipments[type?.toLowerCase()],
                    path: `/admin/status-shipments/${type?.toLowerCase()}`,
                });
                break;
            case "accounting-settings":
                URLObj.push({
                    name: "accountingSettings",
                    path: "/admin/accounting-settings",
                });
                break;
            case "shipping-settings":
                URLObj.push({
                    name: "freightSettings",
                    path: "/admin/shipping-settings",
                });
                break;
            case "finance":
                if (URLArray.some((e) => e.includes("trialBalance"))) {
                    URLObj.push({
                        name: "trialBalance",
                        path: `/admin/finance/statement/trialBalance`,
                    });
                }
                if (URLArray.some((e) => e.includes("main"))) {
                    URLObj.push({
                        name: "mainAccountStatement",
                        path: `/admin/finance/statement/main`,
                    });
                }
                if (URLArray.some((e) => e.includes("sub"))) {
                    URLObj.push({
                        name: "accountStatement",
                        path: `/admin/finance/statement/sub`,
                    });
                }
                if (URLArray.some((e) => e.includes("journal-entries"))) {
                    URLObj.push({
                        name: "journalEntries",
                        path: `/admin/finance/journal-entries`,
                    });
                    if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                        URLObj.push({
                            name: "details",
                        });
                    }
                    if (URLArray.some((e) => e === "create")) {
                        URLObj.push({
                            name: "create",
                        });
                    }
                    if (URLArray.some((e) => e === "edit")) {
                        URLObj.pop();
                        URLObj.push({
                            name: "update",
                        });
                    }
                }
                break;
            case "currency":
                URLObj.push({
                    name: "currencyList",
                });
                break;
            case "users":
                URLObj.push({
                    name: "users",
                    path: `/admin/users`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "financial-sheets":
                URLObj.push({
                    name: "ListFinancialSheets",
                    path: `/admin/financial-sheets`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "inco-terms":
                URLObj.push({
                    name: "incoTermList",
                    path: `/admin/inco-terms`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "charge-types":
                URLObj.push({
                    name: "listChargeTypes",
                    path: `/admin/charge-types`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "commodities":
                URLObj.push({
                    name: "commoditiesList",
                    path: `/admin/commodities`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "transaction-types":
                URLObj.push({
                    name: "transactionTypes",
                    path: `/admin/transaction-types`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "financial-year":
                URLObj.push({
                    name: "financialYear",
                    path: `/admin/finance/financial-year`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "safes":
                URLObj.push({
                    name: "safe",
                    path: `/admin/safes`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "vouchers":
                URLObj.push({
                    name: voucherTitles[type?.toLowerCase()],
                    path: `/admin/vouchers/${type?.toLowerCase()}`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "safes-transfer":
                URLObj.push({
                    name: "safesTransfer",
                    path: `/admin/safes-transfer`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "warehouse":
                URLObj.push({
                    name: "WareHouseSections",
                    path: `/admin/warehouse`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;
            case "operations":
                URLObj.push({
                    name: operationTitles[type?.toLowerCase()],
                    path: `/admin/operations/${type?.toLowerCase()}`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;

            case "shipments":
                URLObj.push({
                    name: "shipmentList",
                    path: `/admin/shipments`,
                });
                if (URLArray.some((e) => e.includes("id") || !isNaN(e))) {
                    URLObj.push({
                        name: "details",
                    });
                }
                if (URLArray.some((e) => e === "create")) {
                    URLObj.push({
                        name: "create",
                    });
                }
                if (URLArray.some((e) => e === "edit")) {
                    URLObj.pop();
                    URLObj.push({
                        name: "update",
                    });
                }
                break;

            default:
                break;
        }
        return {};
    });

    return (
        <Root>
            <Breadcrumbs aria-label="breadcrumb" separator={"»"}>
                {URLObj.map((ele, i) =>
                    i < URLObj.length - 1 ? (
                        <SpanLink
                            className={classes.spanLink}
                            pathname={ele.path}
                            key={`${i}-${ele}`}
                        >
                            {t(ele.name)}
                        </SpanLink>
                    ) : (
                        <Typography
                            variant="body1"
                            key={`${i}-${ele}`}
                            color="text.primary"
                        >
                            {t(ele.name)}
                        </Typography>
                    )
                )}
            </Breadcrumbs>
        </Root>
    );
};

export default BreadcrumbsWidget;
