import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import moment from "moment";
import LayoutWithDrawer from "../LayoutWithDrawo";
import TitleAppBar from "../../Layout/TitleAppBar";
import LongMenu from "../../Layout/MenuAppBar";
import { router, usePage } from "@inertiajs/react";
import { RootStyleForm, classesForm } from "../../GlobalStyles/FormStyle";
import ControlMUItextField from "../../Component/HOC/MUI/ControlMUItextField";
import FullScreenLoading from "../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading";

const ShipmentForm = ({ csrf_token, shipment }) => {
    const { url } = usePage();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

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

    const { handleSubmit, control, formState, setValue, setError } = useForm({
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
    }, [shipment, setValue]);

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
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name="price"
                            label={t("price")}
                            type="number"
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name="type"
                            label={t("type")}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <ControlMUItextField
                            control={control}
                            errors={errors}
                            name="payment_type"
                            label={t("paymentType")}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Button
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

    const DOM = disabled.formEdit ? (
        <FullScreenLoading minHeight="10%" />
    ) : (
        body
    );

    return (
        <LayoutWithDrawer>
            <RootStyleForm>
                <TitleAppBar path={url}>
                    <LongMenu />
                </TitleAppBar>

                {disabled.formEdit && (
                    <Grid item xs={12}>
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
                )}

                <Stack spacing={2} p={2} sx={{ position: "relative" }}>
                    {DOM}
                </Stack>
            </RootStyleForm>
        </LayoutWithDrawer>
    );
};

export default ShipmentForm;
