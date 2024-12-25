import React, { useEffect, useState } from "react";
import { Collapse, Stack, Box, Alert, Button, Grid } from "@mui/material";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import { useMutation, gql, useQuery } from "@apollo/client";
// import ButtonLoading from "../HOC/FunctionComponents/LoadingPages/ButtonLoading";
import { useSnackbar } from "notistack";
// import FormButton from "../CustomComponents/Buttons/FormButton";
// import { setValidationError } from "../HOC/CustomFunctions/setValidationError";
// import FullScreenLoading from "../HOC/FunctionComponents/LoadingPages/FullScreenLoading";
// import { pushUrl } from "../HOC/CustomFunctions/pushUrl";
// import Grid from "@mui/material/Unstable_Grid2";
// import TitleAppBar from "../../Layout/TitleAppBar";
// import NotFound from "../../Error/NotFound";

// import { dateFormat } from "../../helpers/dateFunctions";
// import getMobileData, {
//     getFormatNumber,
//     validNumber,
// } from "../../helpers/asYouType";
import moment from "moment";
// import LongMenu from "../../Layout/MenuAppBar";
// import CustomDialog from "../HOC/CustomComponents/CustomDialog";
// import { ContainersProvider } from "./ShipmentContainerContext";
// import ShipmentContainer from "./ShipmentContainer";
// import ShipmentContainerTables from "./ShipmentContainerTable";
// import HorizontalLinearStepper from "../HOC/MUI/Stepper/stepper";
// import { StepperProvider } from "../HOC/MUI/Stepper/StepperContext";
import { StyledLoading, classesLoad } from "../../GlobalStyles/LoadingStyle";
import { RootStyleForm, classesForm } from "../../GlobalStyles/FormStyle";
// import { ShipmentContext } from "./Context/ShipmentContext";
// import { Step1 } from "./Steps/Step1";
// import { Step3 } from "./Steps/Step3";
// import { Step2 } from "./Steps/Step2";
// import { CgNotes } from "react-icons/cg";
// import { GoContainer, GoOrganization } from "react-icons/go";
import FullScreenLoading from "../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading";
import ControlMUItextField from "../../Component/HOC/MUI/ControlMUItextField";
import { AddCircleOutline } from "@mui/icons-material";
import LayoutWithDrawer from "../LayoutWithDrawo";
import { router } from "@inertiajs/react";

const ShipmentForm = ({ csrf_token, shipment }) => {
    // const pathURL = props.match.path;
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    // const [shipmentId, setShipmentId] = useState(
    //     parseInt(props.match.params.id)
    // );
    const [disabled, setDisabled] = useState({
        formEdit: false,
        addContainer: false,
    });

    const initFromDate = moment(new Date())
        .locale("en")
        .subtract("month")
        .add("day")
        .format("YYYY-MM-DD");
    const [dateRange, setDateRange] = useState({
        scheduledDepartureDate: initFromDate,
        scheduledArrivalDate: null,
        shipmentDate: initFromDate,
    });
    const {
        handleSubmit,
        control,
        formState,
        setValue,
        setError,
        watch,
        getValues,
    } = useForm({
        defaultValues: {
            _token: csrf_token,
        },
    });
    const { errors } = formState;
    useEffect(() => {
        if (shipment) {
            setValue("id", shipment.id);

            setValue("price", shipment.price);
            setValue("type", shipment.type);
            setValue("payment_type", shipment.payment_type);
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data) => {
        parseInt(data.price);
        router.post("/shipments/save", data, {
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, value]) => {
                    setError(key, { type: "server", message: value });
                });
            },
        });
    };

    const body = (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack sx={{ position: "relative" }}>
                {disabled.formEdit && (
                    <Box
                        className={classesForm.overlay}
                        sx={{ backgroundColor: "rgb(255 255 255 / 45%)" }}
                    ></Box>
                )}

                <Grid
                    container
                    item
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name={"price"}
                            label={t("price")}
                            type="number"
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name={"type"}
                            label={t("type")}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name={"payment_type"}
                            label={t("payment_type")}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} spacing={2}>
                    <Button
                        // className={classes.button}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        {t("create")}
                    </Button>
                </Grid>
            </Stack>
        </form>
    );
    let DOM;

    if (false) {
        DOM = data ? body : <FullScreenLoading minHeight="10%" />;
    } else {
        DOM = body;
    }

    return false ? (
        <StyledLoading
            container
            item
            justifyContent="center"
            className={classesLoad.main}
        >
            <FullScreenLoading height={"100%"} />
        </StyledLoading>
    ) : false ? (
        // <NotFound />
        <>d</>
    ) : (
        <LayoutWithDrawer>
            <RootStyleForm>
                {/* <TitleAppBar path={pathURL}>
        <LongMenu />
      </TitleAppBar> */}

                {disabled.formEdit ? (
                    <Grid sm={12} xs={12}>
                        <Alert
                            severity="warning"
                            action={
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setDisabled((prev) => ({
                                            ...prev,
                                            formEdit: false,
                                        }));
                                    }}
                                >
                                    {t("update")}
                                </Button>
                            }
                        >
                            {t("updateRecord")}
                        </Alert>
                    </Grid>
                ) : (
                    ""
                )}
                <Stack spacing={2} p={2} sx={{ position: "relative" }}>
                    {/* <ShipmentContext value={shipmentValue}>{DOM}</ShipmentContext> */}
                    {DOM}
                </Stack>
                {false &&
                !["LCL", "LTL"].includes(data?.shipment?.loadingMode?.code) ? (
                    <Grid
                        container
                        spacing={2}
                        mx={2}
                        my={0}
                        className={classesForm.mainForm}
                        sx={{ position: "relative" }}
                    >
                        {(!false || !disabled?.formEdit) && (
                            <Box className={classesForm.overlay}></Box>
                        )}
                        {/* <ShipmentContainerTables /> */}
                    </Grid>
                ) : (
                    ""
                )}
            </RootStyleForm>
        </LayoutWithDrawer>
    );
};

export default ShipmentForm;
