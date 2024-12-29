import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Grid } from "@mui/material";
// import FullScreenLoading from "../HOC/FunctionComponents/LoadingPages/FullScreenLoading";
import { StyledLoading, classesLoad } from "../../GlobalStyles/LoadingStyle";
import { RootStyleView, classesView } from "../../GlobalStyles/ViewStyle";
import { KeyValuePair } from "../../Component/HOC/CustomComponents/KeyValuePair";
import TitleAppBar from "../../Layout/TitleAppBar";
import LongMenu from "../../Layout/MenuAppBar";
// import NotFound from "../../Error/NotFound";
import LayoutWithDrawer from "../LayoutWithDrawo";
import { router, usePage } from "@inertiajs/react";

const ShipmentView = ({ shipment }) => {
    const { t } = useTranslation();
    const { url } = usePage();
    const roleId = shipment?.id;
    const loading = !shipment;
    const icons = [
        {
            id: "edit",
            action: () => router.get(`/shipments/save/${roleId}`),
            permission: "shipping.shipment.update",
        },
    ];
    return loading ? (
        <StyledLoading
            container
            item
            justifyContent="center"
            className={classesLoad.main}
        >
            {/* <FullScreenLoading height={"100%"} /> */}
        </StyledLoading>
    ) : !shipment ? (
        // <NotFound />
        <></>
    ) : (
        <LayoutWithDrawer>
            <TitleAppBar path={url}>
                <LongMenu icons={icons} />
            </TitleAppBar>
            <RootStyleView spacing={2} p={2} justifyContent="center">
                <Paper container className={classesView.paper} component={Grid}>
                    <KeyValuePair title={t("price")} value={shipment?.price} />
                    <KeyValuePair title={t("type")} value={shipment?.type} />
                    <KeyValuePair
                        title={t("paymentType")}
                        value={shipment?.payment_type}
                    />
                </Paper>
            </RootStyleView>
        </LayoutWithDrawer>
    );
};

export default ShipmentView;
