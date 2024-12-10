import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import NotFound from "../../Error/NotFound";
import Layout from "../../Layout/Layout";
import LayoutWithDrawer from "../../Layout/LayoutWithDrawer";
import Home from "../Home/Home";
import HomePage from "../HomePage";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
// import Registrations from "../Registrations/Registrations";
import Forgotpassword from "../Forgotpassword/Forgotpassword";
import PackageTypesList from "../PackageTypes/PackageTypesList";
import PackageTypeForm from "../PackageTypes/PackageTypeForm";
import PackageTypeView from "../PackageTypes/PackageTypeView";
import ShippingPortsList from "../ShippingPorts/ShippingPortsList";
import ShippingPortForm from "../ShippingPorts/ShippingPortForm";
import ShippingPortView from "../ShippingPorts/ShippingPortView";
import EmployeesList from "../Employees/EmployeesList";
import EmployeeForm from "../Employees/EmployeeForm";
import EmployeeView from "../Employees/EmployeeView";
import VendorsList from "../Vendors/VendorsList";
import VendorForm from "../Vendors/VendorForm";
import VendorView from "../Vendors/VendorView";
import OrganizationDataForm from "../OrganizationData/UpdateOrganizationData";
import OrganizationDataView from "../OrganizationData/OrganizationDataView";
import ListCountries from "../Countries/ListCountries";
import CountryForm from "../Countries/CountryForm";
import CountryView from "../Countries/CountryView";
import ListPriceLists from "../PriceLists/ListPriceLists";
import PriceListView from "../PriceLists/PriceListView";
import PriceListForm from "../PriceLists/CreatePriceList";
import Settings from "../Setting/Settings";
import CustomAgentsList from "../CustomAgents&Carriers/CustomAgentsList";
// import PriceListForm from "../PriceList/CreatePriceList";
import CustomersList from "../Customers/CustomersList";
import CustomerForm from "../Customers/CustomerForm";
import CustomerView from "../Customers/CustomerView";
import CustomAgentForm from "../CustomAgents&Carriers/CustomerAgentForm";
import CustomAgentView from "../CustomAgents&Carriers/CutomerAgentView";
// import AgenciesList from "../Agencies/AgenciesList";
// import AgencyView from "../Agencies/AgencyView";
// import AgencyForm from "../Agencies/AgencyForm";
import BankList from "../Banks/BankList";
import BranchesList from "../Branches/BranchesList";
import BranchView from "../Branches/BranchView";
import BranchForm from "../Branches/CreateBranch";
import ListRoles from "../Roles/ListRoles";
import RoleForm from "../Roles/RoleForm";
import RoleView from "../Roles/RoleView";
import SubsidiariesList from "../Subsidiary/SubsidiariesList";
import SubsidiaryForm from "../Subsidiary/SubsidiaryForm";
import JournalTypeList from "../JournalType/JournalTypeList";
import LookupsList from "../Lookups/LookupsList";
import LookupView from "../Lookups/LookupView";
import LookupEntriesForm from "../Lookups/LookupEntriesForm";
import GlAccountsTree from "../GlAccountsTree/GlAccountsTree";
import CurrenciesList from "../Currencies/CurrenciesList";
import Sheets from "../Sheets/Sheets";
import ListUsers from "../Users/ListUsers";
import UserView from "../Users/UserView";
import UserForm from "../Users/UserForm";
import ListFinancialSheets from "../FinancialSheets/listFinancialSheets";
import FinancialSheetForm from "../FinancialSheets/CreateFinancialSheet";
import FinancialSheetView from "../FinancialSheets/FinancialSheetView";
import IncoTermsList from "../IncoTerms/IncoTermsList";
import IncoTermForm from "../IncoTerms/IncoTermForm";
import IncoTermView from "../IncoTerms/IncoTermView";
import AccountingSettings from "../AccountingSettings/AccountingSettings";
import ListChargeTypes from "../chargeType/listchargeType";
import ChargeTypeForm from "../chargeType/CreateChargeType";
import ChargeTypeView from "../chargeType/ChargeTypeView";
import CommoditiesList from "../Commodity/CommodityList";
import CommodityView from "../Commodity/CommodityView";
import CommodityForm from "../Commodity/CommodityForm";
import ListTransactionTypes from "../TransactionTypes/ListTransactionTypes";
import TransactionType from "../TransactionTypes/TransactionType";
import TransactionTypeView from "../TransactionTypes/TransactionTypeView";
import TaxList from "../Tax/TaxList";
import TaxForm from "../Tax/TaxForm";
import TaxView from "../Tax/TaxView";
import RequestForm from "../Request/RequestForm";
import RequestList from "../Request/RequestList";
import RequestView from "../Request/RequestView";
import FinancialYearView from "../FinancialYear/FinancialYearView";
import FinancialYearList from "../FinancialYear/ListFinancialYear";
import FinancialYear from "../FinancialYear/FinancialYear";
import WareHouseView from "../WareHouse/WareHouseView";
import WareHouseList from "../WareHouse/WareHouseList";
import WareHouseForm from "../WareHouse/WareHouseForm";
import VoucherView from "../Vouchers/VoucherView";
import VoucherForm from "../Vouchers/VoucherForm";
import ListSafes from "../Safes/ListSafes";
import SafeForm from "../Safes/SafeForm";
import SafeView from "../Safes/SafeView";
import BillView from "../Bill/BillView";
import BillForm from "../Bill/BillForm";
import BillsList from "../Bill/BillsList";
import WarehousePackagesList from "../WarehousePackages/WarehousePackagesList";
import ProductView from "../Product/ProductView";
import ProductForm from "../Product/ProductForm";
import ProductsList from "../Product/ProductsList";
import MainFinanceStatement from "../FinanceStatement/MainFinanceStatement";
import TrialBalance from "../FinanceStatement/TrialBalance";
import FinanceStatement from "../FinanceStatement/FinanceStatement";
import BankBranchesList from "../BankBranches/BankBranchesList";
import BankBranchView from "../BankBranches/BankBranchView";
import BankBranchForm from "../BankBranches/BankBranchForm";
// import BankAccountsList from "../BankAccounts/BankAccountsList";
// import BankAccountForm from "../BankAccounts/BankAccountForm";
// import BankAccountView from "../BankAccounts/BankAccountView";
import AdjustmentList from "../Adjustments/AdjustmentsList";
import AdjustmentForm from "../Adjustments/AdjustmentsForm";
import AdjustmentView from "../Adjustments/AdjustmentView";
import OperationList from "../Oparation/OperationList";
import OperationView from "../Oparation/OperationView";
import OperationForm from "../Oparation/OperationForm";
import VouchersList from "../Vouchers/VouchersList";
import { GetPermissionSlugWithArray } from "../../helpers/getPermissionSlug";
import PackingRequests from "../PackingRequests/PackingRequests";
import RequestPrint from "./CustomComponents/PrintPackgeDetails/RequestPrint";
import StickyPrint from "./CustomComponents/PrintPackgeDetails/Waybill/StickyPrint";
import ShipmentsList from "../Shipments/ShipmentsList";
import ShipmentForm from "../Shipments/ShipmentForm";
import ShipmentView from "../Shipments/ShipmenView";
import ScheduleShipments from "../ScheduleShipments/ScheduleShipments";
import LogList from "../LogList/LogList";
import ManifestPrint from "../Print/ManifestPrint/ManifestPrint";
import VoucherPrint from "../Vouchers/VoucherPrint";
import ListJournalEntry from "../JournalEntry/ListJournalEntry";
import JournalEntryForm from "../JournalEntry/JournalEntryForm";
import JournalEntryView from "../JournalEntry/JournalEntryView";

const Routes = (props) => {
  return (
    <Fragment>
      <Switch>
        {/* --------------------------------- Public --------------------------------- */}
        <Route path="/" exact component={HomePage} />
        {/* --------------------------------- Log --------------------------------- */}
        <RouteWrapper path="/login" component={Login} layout={Layout} />
        <RouteWrapper
          path="/admin/logs"
          component={LogList}
          layout={LayoutWithDrawer}
          permission="core.log.view"
        />
        {/* --------------------------------- Print --------------------------------- */}
        <Route
          path="/waybill/:type/sticky-print/:template/:id/:operation?"
          component={StickyPrint}
        />
        <Route
          exact
          path="/report/print/:type/:id?/:trxType?/:transfer?"
          component={ManifestPrint}
        />
        <Route
          path="/waybill/:type/print/:id/:size/:operation?"
          component={RequestPrint}
        />
        <Route path="/voucher/print/:id" component={VoucherPrint} />
        <RouteWrapper
          path="/register"
          component={Registration}
          layout={Layout}
        />

        <RouteWrapper
          path="/Forgotpassword"
          component={Forgotpassword}
          layout={Layout}
        />

        {/* --------------------------------- Admin --------------------------------- */}
        <RouteWrapper
          path="/admin"
          exact
          component={Home}
          layout={LayoutWithDrawer}
        />
        {/* --------------------------------- PackageTypes --------------------------------- */}
        <RouteWrapper
          path="/admin/package-types"
          key={props.history.location.key}
          exact
          component={PackageTypesList}
          layout={LayoutWithDrawer}
          permission="freight.package_type.list"
        />
        <RouteWrapper
          path="/admin/package-types/create"
          exact
          key={props.history.location.key}
          component={PackageTypeForm}
          layout={LayoutWithDrawer}
          permission="freight.package_type.create"
        />
        <RouteWrapper
          path="/admin/package-types/:id/edit"
          key={props.history.location.key}
          component={PackageTypeForm}
          layout={LayoutWithDrawer}
          permission="freight.package_type.update"
        />
        <RouteWrapper
          path="/admin/package-types/:id"
          key={props.history.location.key}
          component={PackageTypeView}
          layout={LayoutWithDrawer}
          permission="freight.package_type.list"
        />
        {/* --------------------------------- shippingPorts --------------------------------- */}
        <RouteWrapper
          path="/admin/shipping-ports"
          key={props.history.location.key}
          exact
          component={ShippingPortsList}
          layout={LayoutWithDrawer}
          permission="freight.shipping_port.list"
        />
        <RouteWrapper
          path="/admin/shipping-ports/create"
          exact
          key={props.history.location.key}
          component={ShippingPortForm}
          layout={LayoutWithDrawer}
          permission="freight.shipping_port.create"
        />
        <RouteWrapper
          path="/admin/shipping-ports/:id/edit"
          key={props.history.location.key}
          component={ShippingPortForm}
          layout={LayoutWithDrawer}
          permission="freight.shipping_port.update"
        />
        <RouteWrapper
          path="/admin/shipping-ports/:id"
          key={props.history.location.key}
          component={ShippingPortView}
          layout={LayoutWithDrawer}
          permission="freight.shipping_port.list"
        />

        {/* --------------------------------- PriceLists --------------------------------- */}
        <RouteWrapper
          path="/admin/price-lists"
          key={props.history.location.key}
          exact
          component={ListPriceLists}
          layout={LayoutWithDrawer}
          permission="freight.price_list.list"
        />

        <RouteWrapper
          path="/admin/price-lists/create"
          key={props.history.location.key}
          exact
          component={PriceListForm}
          layout={LayoutWithDrawer}
          permission="freight.price_list.create"
        />

        <RouteWrapper
          path="/admin/price-lists/:id"
          key={props.history.location.key}
          exact
          component={PriceListView}
          layout={LayoutWithDrawer}
          permission="freight.price_list.list"
        />

        <RouteWrapper
          path="/admin/price-lists/:id/edit"
          key={props.history.location.key}
          exact
          component={PriceListForm}
          layout={LayoutWithDrawer}
          permission="freight.price_list.update"
        />
        {/* --------------------------------- employees --------------------------------- */}
        <RouteWrapper
          path="/admin/employees"
          key={props.history.location.key}
          exact
          component={EmployeesList}
          layout={LayoutWithDrawer}
          permission="freight.employee.list"
        />
        <RouteWrapper
          path="/admin/employees/create"
          exact
          key={props.history.location.key}
          component={EmployeeForm}
          layout={LayoutWithDrawer}
          permission="freight.employee.create"
        />
        <RouteWrapper
          path="/admin/employees/:id/edit"
          key={props.history.location.key}
          component={EmployeeForm}
          layout={LayoutWithDrawer}
          permission="freight.employee.update"
        />
        <RouteWrapper
          path="/admin/employees/:id"
          key={props.history.location.key}
          component={EmployeeView}
          layout={LayoutWithDrawer}
          permission="freight.employee.list"
        />

        {/* --------------------------------- vendors --------------------------------- */}
        <RouteWrapper
          path="/admin/vendors"
          key={props.history.location.key}
          exact
          component={VendorsList}
          layout={LayoutWithDrawer}
          permission="freight.vendor.list"
        />
        <RouteWrapper
          path="/admin/vendors/create"
          exact
          key={props.history.location.key}
          component={VendorForm}
          layout={LayoutWithDrawer}
          permission="freight.vendor.create"
        />
        <RouteWrapper
          path="/admin/vendors/:id/edit"
          key={props.history.location.key}
          component={VendorForm}
          layout={LayoutWithDrawer}
          permission="freight.vendor.update"
        />
        <RouteWrapper
          path="/admin/vendors/:id"
          key={props.history.location.key}
          component={VendorView}
          layout={LayoutWithDrawer}
          permission="freight.vendor.list"
        />
        {/* --------------------------------- Organization Data --------------------------------- */}
        <RouteWrapper
          path="/admin/organization/edit"
          key={props.history.location.key}
          component={OrganizationDataForm}
          layout={LayoutWithDrawer}
          permission="core.organization.update"
        />
        <RouteWrapper
          path="/admin/organization"
          key={props.history.location.key}
          component={OrganizationDataView}
          layout={LayoutWithDrawer}
          permission="core.organization.view"
        />
        {/* --------------------------------- countries --------------------------------- */}
        <RouteWrapper
          path="/admin/countries"
          key={props.history.location.key}
          exact
          component={ListCountries}
          layout={LayoutWithDrawer}
          permission="core.country.list"
        />
        <RouteWrapper
          path="/admin/countries/create"
          exact
          key={props.history.location.key}
          component={CountryForm}
          layout={LayoutWithDrawer}
          permission="core.country.create"
        />
        <RouteWrapper
          path="/admin/countries/:id/edit"
          key={props.history.location.key}
          component={CountryForm}
          layout={LayoutWithDrawer}
          permission="core.country.update"
        />
        <RouteWrapper
          path="/admin/countries/:id"
          key={props.history.location.key}
          component={CountryView}
          layout={LayoutWithDrawer}
          permission="core.country.list"
        />
        {/* --------------------------------- Customers --------------------------------- */}
        <RouteWrapper
          path="/admin/customers"
          key={props.history.location.key}
          exact
          component={CustomersList}
          layout={LayoutWithDrawer}
          permission="freight.customer.list"
        />
        <RouteWrapper
          path="/admin/customers/create"
          exact
          key={props.history.location.key}
          component={CustomerForm}
          layout={LayoutWithDrawer}
          permission="freight.customer.create"
        />
        <RouteWrapper
          path="/admin/customers/:id/edit"
          key={props.history.location.key}
          component={CustomerForm}
          layout={LayoutWithDrawer}
          permission="freight.customer.update"
        />
        <RouteWrapper
          path="/admin/customers/:id"
          key={props.history.location.key}
          component={CustomerView}
          layout={LayoutWithDrawer}
          permission="freight.customer.list"
        />
        {/* --------------------------------- Tax --------------------------------- */}
        <RouteWrapper
          path="/admin/tax"
          key={props.history.location.key}
          exact
          component={TaxList}
          layout={LayoutWithDrawer}
          permission="freight.tax.list"
        />
        <RouteWrapper
          path="/admin/tax/create"
          exact
          key={props.history.location.key}
          component={TaxForm}
          layout={LayoutWithDrawer}
          permission="freight.tax.create"
        />
        <RouteWrapper
          path="/admin/tax/:id/edit"
          key={props.history.location.key}
          component={TaxForm}
          layout={LayoutWithDrawer}
          permission="freight.tax.update"
        />
        <RouteWrapper
          path="/admin/tax/:id"
          key={props.history.location.key}
          component={TaxView}
          layout={LayoutWithDrawer}
          permission="freight.tax.list"
        />
        {/* ---------------------------------Setting --------------------------------- */}
        <RouteWrapper
          path="/admin/shipping-settings"
          component={Settings}
          layout={LayoutWithDrawer}
          permission="freight.settings.update"
        />
        <RouteWrapper
          path="/admin/accounting-settings"
          component={AccountingSettings}
          layout={LayoutWithDrawer}
          permission="accounting.settings.update"
        />
        {/* --------------------------------- CustomAgents --------------------------------- */}
        <RouteWrapper
          path="/admin/custom-agents"
          key={props.history.location.key}
          exact
          component={CustomAgentsList}
          layout={LayoutWithDrawer}
          permission="freight.custom_agent.list"
        />
        <RouteWrapper
          path="/admin/custom-agents/create"
          exact
          key={props.history.location.key}
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.custom_agent.create"
        />

        <RouteWrapper
          path="/admin/custom-agents/:id/edit"
          exact
          key={props.history.location.key}
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.custom_agent.update"
        />
        <RouteWrapper
          path="/admin/custom-agents/:id"
          key={props.history.location.key}
          exact
          component={CustomAgentView}
          layout={LayoutWithDrawer}
          permission="freight.custom_agent.list"
        />

        {/* --------------------------------- agencies --------------------------------- */}
        <RouteWrapper
          path="/admin/agencies"
          key={props.history.location.key}
          exact
          component={CustomAgentsList}
          layout={LayoutWithDrawer}
          permission="freight.agency.list"
        />

        <RouteWrapper
          path="/admin/agencies/create"
          key={props.history.location.key}
          exact
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.agency.create"
        />
        <RouteWrapper
          path="/admin/agencies/:id/edit"
          exact
          key={props.history.location.key}
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.agency.update"
        />
        <RouteWrapper
          path="/admin/agencies/:id"
          key={props.history.location.key}
          exact
          component={CustomAgentView}
          layout={LayoutWithDrawer}
          permission="freight.agency.list"
        />

        {/* --------------------------------- carriers --------------------------------- */}
        <RouteWrapper
          path="/admin/carriers"
          key={props.history.location.key}
          exact
          component={CustomAgentsList}
          layout={LayoutWithDrawer}
          permission="freight.carrier.list"
        />

        <RouteWrapper
          path="/admin/carriers/create"
          key={props.history.location.key}
          exact
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.carrier.create"
        />
        <RouteWrapper
          path="/admin/carriers/:id/edit"
          exact
          key={props.history.location.key}
          component={CustomAgentForm}
          layout={LayoutWithDrawer}
          permission="freight.carrier.update"
        />
        <RouteWrapper
          path="/admin/carriers/:id"
          key={props.history.location.key}
          exact
          component={CustomAgentView}
          layout={LayoutWithDrawer}
          permission="freight.carrier.list"
        />
        {/* --------------------------------- Product --------------------------------- */}
        <RouteWrapper
          path="/admin/product"
          key={props.history.location.key}
          exact
          component={ProductsList}
          layout={LayoutWithDrawer}
          permission="freight.product.list"
        />

        <RouteWrapper
          path="/admin/product/create"
          key={props.history.location.key}
          exact
          component={ProductForm}
          layout={LayoutWithDrawer}
          permission="freight.product.create"
        />
        <RouteWrapper
          path="/admin/product/:id/edit"
          exact
          key={props.history.location.key}
          component={ProductForm}
          layout={LayoutWithDrawer}
          permission="freight.product.update"
        />
        <RouteWrapper
          path="/admin/product/:id"
          key={props.history.location.key}
          exact
          component={ProductView}
          layout={LayoutWithDrawer}
          permission="freight.product.list"
        />
        {/* --------------------------------- Banks --------------------------------- */}
        <RouteWrapper
          path="/admin/banks"
          exact
          key={props.history.location.key}
          component={BankList}
          layout={LayoutWithDrawer}
          permission="shipping.bank.list"
        />
        {/* --------------------------------- Branches --------------------------------- */}
        <RouteWrapper
          path="/admin/branches"
          key={props.history.location.key}
          exact
          component={BranchesList}
          layout={LayoutWithDrawer}
          permission="core.branch.list"
        />
        <RouteWrapper
          path="/admin/branches/create"
          exact
          key={props.history.location.key}
          component={BranchForm}
          layout={LayoutWithDrawer}
          permission="core.branch.create"
        />
        <RouteWrapper
          path="/admin/branches/:id/edit"
          key={props.history.location.key}
          component={BranchForm}
          layout={LayoutWithDrawer}
          permission="core.branch.update"
        />
        <RouteWrapper
          path="/admin/branches/:id"
          key={props.history.location.key}
          component={BranchView}
          layout={LayoutWithDrawer}
          permission="core.branch.list"
        />
        {/* --------------------------------- roles --------------------------------- */}
        <RouteWrapper
          path="/admin/roles"
          key={props.history.location.key}
          exact
          component={ListRoles}
          layout={LayoutWithDrawer}
          permission="core.role.list"
        />
        <RouteWrapper
          path="/admin/roles/create"
          exact
          key={props.history.location.key}
          component={RoleForm}
          layout={LayoutWithDrawer}
          permission="core.role.create"
        />
        <RouteWrapper
          path="/admin/roles/:copyId/copy"
          key={props.history.location.key}
          component={RoleForm}
          layout={LayoutWithDrawer}
          permission="core.role.create"
        />
        <RouteWrapper
          path="/admin/roles/:id/edit"
          key={props.history.location.key}
          component={RoleForm}
          layout={LayoutWithDrawer}
          permission="core.role.update"
        />
        <RouteWrapper
          path="/admin/roles/:id"
          key={props.history.location.key}
          component={RoleView}
          layout={LayoutWithDrawer}
          permission="core.role.list"
        />
        {/* --------------------------------- Subsidiaries--------------------------------- */}
        <RouteWrapper
          path="/admin/subsidiaries"
          key={props.history.location.key}
          exact
          component={SubsidiariesList}
          layout={LayoutWithDrawer}
          permission="accounting.subsidiary.list"
        />
        <RouteWrapper
          path="/admin/subsidiaries/create"
          exact
          key={props.history.location.key}
          component={SubsidiaryForm}
          layout={LayoutWithDrawer}
          permission="accounting.subsidiary.create"
        />
        <RouteWrapper
          path="/admin/subsidiaries/:id/edit"
          key={props.history.location.key}
          component={SubsidiaryForm}
          layout={LayoutWithDrawer}
          permission="accounting.subsidiary.update"
        />
        {/* --------------------------------- JournalType--------------------------------- */}
        <RouteWrapper
          path="/admin/finance/journal-types"
          component={JournalTypeList}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="accounting.journal_type.list"
        />
        {/* --------------------------------- Lookups --------------------------------- */}
        <RouteWrapper
          path="/admin/lookups"
          key={props.history.location.key}
          exact
          component={LookupsList}
          layout={LayoutWithDrawer}
          permission="core.lookup.list"
        />
        <RouteWrapper
          path="/admin/lookups/:id/edit"
          key={props.history.location.key}
          component={LookupEntriesForm}
          layout={LayoutWithDrawer}
          permission="core.lookup_entry.update"
        />
        <RouteWrapper
          path="/admin/lookups/:id"
          key={props.history.location.key}
          component={LookupView}
          layout={LayoutWithDrawer}
          permission="core.lookup.list"
        />
        {/* --------------------------------- GL Accounts--------------------------------- */}
        <RouteWrapper
          path="/admin/finance/gl-accounts"
          exact
          key={props.history.location.key}
          component={GlAccountsTree}
          layout={LayoutWithDrawer}
          permission="accounting.gl_account.list"
        />
        {/* --------------------------------- Journal Entry --------------------------------- */}
        <RouteWrapper
          path="/admin/finance/journal-entries"
          exact
          key={props.history.location.key}
          component={ListJournalEntry}
          layout={LayoutWithDrawer}
          permission="accounting.journal_entry.list"
        />
        <RouteWrapper
          path="/admin/finance/journal-entries/create"
          component={JournalEntryForm}
          layout={LayoutWithDrawer}
          permission="accounting.journal_entry.create"
        />
        <RouteWrapper
          path="/admin/finance/journal-entries/:id/edit"
          component={JournalEntryForm}
          layout={LayoutWithDrawer}
          permission="accounting.journal_entry.update"
        />
        <RouteWrapper
          path="/admin/finance/journal-entries/:id"
          exact
          key={props.history.location.key}
          component={JournalEntryView}
          layout={LayoutWithDrawer}
          permission="accounting.journal_entry.list"
        />
        {/* --------------------------------- Currencies--------------------------------- */}
        <RouteWrapper
          path="/admin/finance/currencies"
          component={CurrenciesList}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="cash.currency.list"
        />
        {/* --------------------------------- Sheets --------------------------------- */}
        <RouteWrapper
          path="/admin/create-sheets"
          key={props.history.location.key}
          component={Sheets}
          layout={LayoutWithDrawer}
          permission="accounting.sheet.create"
        />
        {/* --------------------------------- schedule Shipments --------------------------------- */}
        <RouteWrapper
          path="/admin/status-shipments/:type"
          key={props.history.location.key}
          component={ScheduleShipments}
          layout={LayoutWithDrawer}
          permission={GetPermissionSlugWithArray("freight", "shipment", [
            "transporting",
            "scheduling",
            "arrival",
          ])}
        />

        {/* --------------------------------- users --------------------------------- */}
        <RouteWrapper
          path="/admin/users"
          key={props.history.location.key}
          exact
          component={ListUsers}
          layout={LayoutWithDrawer}
          permission="core.user.list"
        />
        <RouteWrapper
          path="/admin/users/create"
          exact
          key={props.history.location.key}
          component={UserForm}
          layout={LayoutWithDrawer}
          permission="core.user.create"
        />
        <RouteWrapper
          path="/admin/users/:id/edit"
          key={props.history.location.key}
          component={UserForm}
          layout={LayoutWithDrawer}
          permission="core.user.update"
        />
        <RouteWrapper
          path="/admin/users/:id"
          key={props.history.location.key}
          component={UserView}
          layout={LayoutWithDrawer}
          permission="core.user.list"
        />
        {/* --------------------------------- FinancialSheets --------------------------------- */}
        <RouteWrapper
          path="/admin/financial-sheets"
          key={props.history.location.key}
          exact
          component={ListFinancialSheets}
          layout={LayoutWithDrawer}
          permission="accounting.financial_sheet.list"
        />
        <RouteWrapper
          path="/admin/financial-sheets/create"
          key={props.history.location.key}
          exact
          component={FinancialSheetForm}
          layout={LayoutWithDrawer}
          permission="accounting.financial_sheet.create"
        />
        <RouteWrapper
          path="/admin/financial-sheets/:id/edit"
          key={props.history.location.key}
          exact
          component={FinancialSheetForm}
          layout={LayoutWithDrawer}
          permission="accounting.financial_sheet.update"
        />

        <RouteWrapper
          path="/admin/financial-sheets/:id"
          key={props.history.location.key}
          exact
          component={FinancialSheetView}
          layout={LayoutWithDrawer}
          permission="accounting.financial_sheet.list"
        />
        {/* --------------------------------- FinanceStatement --------------------------------- */}
        <RouteWrapper
          path="/admin/finance/statement/sub/:id?"
          component={FinanceStatement}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="accounting.journal_entry_record.list"
        />
        <RouteWrapper
          path="/admin/finance/statement/main/:id?"
          component={MainFinanceStatement}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="accounting.gl_account.list"
        />
        <RouteWrapper
          path="/admin/finance/statement/trial-balance/:id?"
          component={TrialBalance}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="accounting.gl_account.list"
        />
        {/* --------------------------------- Safes --------------------------------- */}
        <RouteWrapper
          path="/admin/safes"
          key={props.history.location.key}
          exact
          component={ListSafes}
          layout={LayoutWithDrawer}
          permission="cash.safe.list"
        />
        <RouteWrapper
          path="/admin/safes/create"
          exact
          key={props.history.location.key}
          component={SafeForm}
          layout={LayoutWithDrawer}
          permission="cash.safe.create"
        />
        <RouteWrapper
          path="/admin/safes/:id/edit"
          key={props.history.location.key}
          component={SafeForm}
          layout={LayoutWithDrawer}
          permission="cash.safe.update"
        />
        <RouteWrapper
          path="/admin/safes/:id"
          key={props.history.location.key}
          component={SafeView}
          layout={LayoutWithDrawer}
          permission="cash.safe.list"
        />
        {/* --------------------------------- Vouchers --------------------------------- */}
        <RouteWrapper
          path="/admin/vouchers/:id/edit"
          key={props.history.location.key}
          component={VoucherForm}
          layout={LayoutWithDrawer}
          permission="cash.voucher.update"
        />
        <RouteWrapper
          path="/admin/vouchers/:id(\d+)"
          key={props.history.location.key}
          component={VoucherView}
          layout={LayoutWithDrawer}
          permission="cash.voucher.list"
        />

        <RouteWrapper
          path="/admin/vouchers/:type"
          exact
          key={props.history.location.key}
          component={VouchersList}
          layout={LayoutWithDrawer}
          permission="cash.voucher.list"
        />
        <RouteWrapper
          path="/admin/vouchers/create/:type"
          key={props.history.location.key}
          component={VoucherForm}
          layout={LayoutWithDrawer}
          permission="cash.voucher.create"
        />
        {/* --------------------------------- IncoTerms --------------------------------- */}
        <RouteWrapper
          path="/admin/inco-terms"
          key={props.history.location.key}
          exact
          component={IncoTermsList}
          layout={LayoutWithDrawer}
          permission="freight.inco_term.list"
        />
        <RouteWrapper
          path="/admin/inco-terms/create"
          key={props.history.location.key}
          exact
          component={IncoTermForm}
          layout={LayoutWithDrawer}
          permission="freight.inco_term.create"
        />
        <RouteWrapper
          path="/admin/inco-terms/:id/edit"
          key={props.history.location.key}
          exact
          component={IncoTermForm}
          layout={LayoutWithDrawer}
          permission="freight.inco_term.update"
        />

        <RouteWrapper
          path="/admin/inco-terms/:id"
          key={props.history.location.key}
          exact
          component={IncoTermView}
          layout={LayoutWithDrawer}
          permission="freight.inco_term.list"
        />
        {/* --------------------------------- ChargeTypes --------------------------------- */}
        <RouteWrapper
          path="/admin/charge-types"
          key={props.history.location.key}
          exact
          component={ListChargeTypes}
          layout={LayoutWithDrawer}
          permission="freight.charge_type.list"
        />
        <RouteWrapper
          path="/admin/charge-types/create"
          key={props.history.location.key}
          exact
          component={ChargeTypeForm}
          layout={LayoutWithDrawer}
          permission="freight.charge_type.create"
        />
        <RouteWrapper
          path="/admin/charge-types/:id/edit"
          key={props.history.location.key}
          exact
          component={ChargeTypeForm}
          layout={LayoutWithDrawer}
          permission="freight.charge_type.update"
        />

        <RouteWrapper
          path="/admin/charge-types/:id"
          key={props.history.location.key}
          exact
          component={ChargeTypeView}
          layout={LayoutWithDrawer}
          permission="freight.charge_type.list"
        />
        {/* --------------------------------- ChargeTypes --------------------------------- */}
        <RouteWrapper
          path="/admin/commodities"
          key={props.history.location.key}
          exact
          component={CommoditiesList}
          layout={LayoutWithDrawer}
          permission="freight.commodity.list"
        />
        <RouteWrapper
          path="/admin/commodities/create"
          key={props.history.location.key}
          exact
          component={CommodityForm}
          layout={LayoutWithDrawer}
          permission="freight.commodity.create"
        />
        <RouteWrapper
          path="/admin/commodities/:id/edit"
          key={props.history.location.key}
          exact
          component={CommodityForm}
          layout={LayoutWithDrawer}
          permission="freight.commodity.update"
        />

        <RouteWrapper
          path="/admin/commodities/:id"
          key={props.history.location.key}
          exact
          component={CommodityView}
          layout={LayoutWithDrawer}
          permission="freight.commodity.list"
        />
        {/* --------------------------------- TransactionTypes --------------------------------- */}
        <RouteWrapper
          path="/admin/transaction-types"
          key={props.history.location.key}
          exact
          component={ListTransactionTypes}
          layout={LayoutWithDrawer}
          permission="freight.transaction_type.list"
        />
        <RouteWrapper
          path="/admin/transaction-types/create"
          exact
          key={props.history.location.key}
          component={TransactionType}
          layout={LayoutWithDrawer}
          permission="freight.transaction_type.create"
        />
        <RouteWrapper
          path="/admin/transaction-types/:id/edit"
          key={props.history.location.key}
          component={TransactionType}
          layout={LayoutWithDrawer}
          permission="freight.transaction_type.update"
        />
        <RouteWrapper
          path="/admin/transaction-types/:id"
          key={props.history.location.key}
          component={TransactionTypeView}
          layout={LayoutWithDrawer}
          permission="freight.transaction_type.list"
        />
        {/* ---------------------------------Request --------------------------------- */}
        <RouteWrapper
          path="/admin/requests"
          key={props.history.location.key}
          exact
          component={RequestList}
          layout={LayoutWithDrawer}
          permission="freight.request.list"
        />
        <RouteWrapper
          path="/admin/requests/create"
          key={props.history.location.key}
          exact
          component={RequestForm}
          layout={LayoutWithDrawer}
          permission="freight.request.create"
        />
        <RouteWrapper
          path="/admin/requests/:id/edit"
          key={props.history.location.key}
          exact
          component={RequestForm}
          layout={LayoutWithDrawer}
          permission="freight.request.update"
        />

        <RouteWrapper
          path="/admin/requests/:id"
          key={props.history.location.key}
          exact
          component={RequestView}
          layout={LayoutWithDrawer}
          permission="freight.request.list"
        />
        {/* --------------------------------- financial-year --------------------------------- */}
        <RouteWrapper
          path="/admin/finance/financial-year"
          component={FinancialYearList}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          exact
          permission="cash.financial_year.list"
        />
        <RouteWrapper
          path="/admin/finance/financial-year/create"
          component={FinancialYear}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="cash.financial_year.create"
        />
        <RouteWrapper
          path="/admin/finance/financial-year/:id/edit"
          component={FinancialYear}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          exact
          permission="cash.financial_year.update"
        />
        <RouteWrapper
          path="/admin/finance/financial-year/:id"
          component={FinancialYearView}
          layout={LayoutWithDrawer}
          key={props.history.location.key}
          permission="cash.financial_year.list"
        />
        {/* --------------------------------- WareHouse --------------------------------- */}
        <RouteWrapper
          path="/admin/warehouse"
          key={props.history.location.key}
          exact
          component={WareHouseList}
          layout={LayoutWithDrawer}
          permission="freight.warehouse.list"
        />
        <RouteWrapper
          path="/admin/warehouse/create"
          exact
          key={props.history.location.key}
          component={WareHouseForm}
          layout={LayoutWithDrawer}
          permission="freight.warehouse.create"
        />
        <RouteWrapper
          path="/admin/warehouse/:id/edit"
          key={props.history.location.key}
          component={WareHouseForm}
          layout={LayoutWithDrawer}
          permission="freight.warehouse.update"
        />
        <RouteWrapper
          path="/admin/warehouse/:id"
          key={props.history.location.key}
          component={WareHouseView}
          layout={LayoutWithDrawer}
          permission="freight.warehouse.list"
        />

        {/* --------------------------------- Bills --------------------------------- */}
        <RouteWrapper
          path="/admin/bills"
          key={props.history.location.key}
          exact
          component={BillsList}
          layout={LayoutWithDrawer}
          permission="freight.bill.list"
        />

        <RouteWrapper
          path="/admin/bills/create"
          key={props.history.location.key}
          exact
          component={BillForm}
          layout={LayoutWithDrawer}
          permission="freight.bill.create"
        />
        <RouteWrapper
          path="/admin/bills/:id/edit"
          exact
          key={props.history.location.key}
          component={BillForm}
          layout={LayoutWithDrawer}
          permission="freight.bill.update"
        />
        <RouteWrapper
          path="/admin/bills/:id"
          key={props.history.location.key}
          exact
          component={BillView}
          layout={LayoutWithDrawer}
          permission="freight.bill.list"
        />
        {/* --------------------------------- invoices --------------------------------- */}
        <RouteWrapper
          path="/admin/invoices"
          key={props.history.location.key}
          exact
          component={BillsList}
          layout={LayoutWithDrawer}
          permission="freight.invoice.list"
        />

        <RouteWrapper
          path="/admin/invoices/create"
          key={props.history.location.key}
          exact
          component={BillForm}
          layout={LayoutWithDrawer}
          permission="freight.invoice.create"
        />
        <RouteWrapper
          path="/admin/invoices/:id/edit"
          exact
          key={props.history.location.key}
          component={BillForm}
          layout={LayoutWithDrawer}
          permission="freight.invoice.update"
        />
        <RouteWrapper
          path="/admin/invoices/:id"
          key={props.history.location.key}
          exact
          component={BillView}
          layout={LayoutWithDrawer}
          permission="freight.invoice.list"
        />

        {/* --------------------------------- bank-branches --------------------------------- */}
        <RouteWrapper
          path="/admin/bank-branches"
          key={props.history.location.key}
          exact
          component={BankBranchesList}
          layout={LayoutWithDrawer}
          permission="cash.bank_branch.list"
        />

        <RouteWrapper
          path="/admin/bank-branches/create"
          key={props.history.location.key}
          exact
          component={BankBranchForm}
          layout={LayoutWithDrawer}
          permission="cash.bank_branch.create"
        />
        <RouteWrapper
          path="/admin/bank-branches/:id/edit"
          exact
          key={props.history.location.key}
          component={BankBranchForm}
          layout={LayoutWithDrawer}
          permission="cash.bank_branch.update"
        />
        <RouteWrapper
          path="/admin/bank-branches/:id"
          key={props.history.location.key}
          exact
          component={BankBranchView}
          layout={LayoutWithDrawer}
          permission="cash.bank_branch.list"
        />

        {/* --------------------------------- listWarehousePackages --------------------------------- */}
        <RouteWrapper
          path="/admin/warehouse-packages"
          key={props.history.location.key}
          exact
          component={WarehousePackagesList}
          layout={LayoutWithDrawer}
          permission="freight.warehouse.list_packages"
        />
        {/* --------------------------------- Adjustments --------------------------------- */}

        <RouteWrapper
          path="/admin/adjustments"
          exact
          key={props.history.location.key}
          component={AdjustmentList}
          layout={LayoutWithDrawer}
          permission="freight.adjustment.list"
        />

        <RouteWrapper
          path="/admin/adjustments/create"
          exact
          key={props.history.location.key}
          component={AdjustmentForm}
          layout={LayoutWithDrawer}
          permission="freight.adjustment.create"
        />
        <RouteWrapper
          path="/admin/adjustments/:id/edit"
          exact
          key={props.history.location.key}
          component={AdjustmentForm}
          layout={LayoutWithDrawer}
          permission="freight.adjustment.update"
        />
        <RouteWrapper
          path="/admin/adjustments/:id"
          exact
          key={props.history.location.key}
          component={AdjustmentView}
          layout={LayoutWithDrawer}
          permission="freight.adjustment.list"
        />
        {/* ---------------------------------Operations --------------------------------- */}
        <RouteWrapper
          path="/admin/operations/:id/edit"
          key={props.history.location.key}
          // exact
          component={OperationForm}
          layout={LayoutWithDrawer}
          permission={GetPermissionSlugWithArray(
            "freight",
            "operation",
            ["rcvd", "delivered", "unloaded", "loading"],
            "update"
          )}
        />

        <RouteWrapper
          path="/admin/operations/:id(\d+)"
          key={props.history.location.key}
          // exact
          component={OperationView}
          layout={LayoutWithDrawer}
          permission={GetPermissionSlugWithArray(
            "freight",
            "operation",
            ["rcvd", "delivered", "unloaded", "loading"],
            "list"
          )}
        />
        <RouteWrapper
          path="/admin/operations/:type"
          key={props.history.location.key}
          exact
          component={OperationList}
          layout={LayoutWithDrawer}
          permission={GetPermissionSlugWithArray(
            "freight",
            "operation",
            ["rcvd", "delivered", "unloaded", "loading"],
            "list"
          )}
        />
        <RouteWrapper
          path="/admin/operations/create/:type"
          key={props.history.location.key}
          exact
          component={OperationForm}
          layout={LayoutWithDrawer}
          permission={GetPermissionSlugWithArray(
            "freight",
            "operation",
            ["rcvd", "delivered", "unloaded", "loading"],
            "create"
          )}
        />
        <RouteWrapper
          path="/admin/packing-requests"
          key={props.history.location.key}
          exact
          component={PackingRequests}
          layout={LayoutWithDrawer}
          permission="freight.request.packing"
        />

        {/* ---------------------------------Request --------------------------------- */}
        <RouteWrapper
          path="/admin/shipments"
          key={props.history.location.key}
          exact
          component={ShipmentsList}
          layout={LayoutWithDrawer}
          permission="freight.shipment.list"
        />
        <RouteWrapper
          path="/admin/shipments/create"
          key={props.history.location.key}
          exact
          component={ShipmentForm}
          layout={LayoutWithDrawer}
          permission="freight.shipment.create"
        />
        <RouteWrapper
          path="/admin/shipments/:id/edit"
          key={props.history.location.key}
          exact
          component={ShipmentForm}
          layout={LayoutWithDrawer}
          permission="freight.shipment.update"
        />

        <RouteWrapper
          path="/admin/shipments/:id"
          key={props.history.location.key}
          exact
          component={ShipmentView}
          layout={LayoutWithDrawer}
          permission="freight.shipment.list"
        />
        {/* --------------------------------- 404 --------------------------------- */}

        <RouteWrapper component={NotFound} layout={LayoutWithDrawer} />
      </Switch>
    </Fragment>
  );
};

export default Routes;

function RouteWrapper({
  component: Component,
  layout: Layout,
  permission,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout permission={permission} {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  permission: PropTypes.any,
};
