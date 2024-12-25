import React, { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MUItextField from "../../Component/HOC/MUI/MUItextField";
import { useForm } from "react-hook-form";
import { Collapse, IconButton, InputAdornment } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import Layout from "../Layout";
import { router } from "@inertiajs/react";
import { useSnackbar } from "notistack";

const PREFIX = "Login";

const classes = {
    paper: `${PREFIX}-paper`,
    avatar: `${PREFIX}-avatar`,
    form: `${PREFIX}-form`,
    button: `${PREFIX}-button`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.paper}`]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    [`& .${classes.avatar}`]: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },

    [`& .${classes.form}`]: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    [`& .${classes.button}`]: {
        marginBottom: theme.spacing(2),
    },
}));

export default function Login({ csrf_token }) {
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            _token: csrf_token,
        },
    });

    const onSubmit = (data) => {
        // router.post("/login", data);
        router.post("/login", data, {
            onError: (serverErrors) => {
                enqueueSnackbar(t("loginProhibited"), {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    TransitionComponent: Collapse,
                });
                // Object.entries(serverErrors).forEach(([key, value]) => {
                //     setError(key, { type: "server", message: value });
                // });
            },
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Layout>
            <Root>
                <Container maxWidth="xs">
                    <CssBaseline />

                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography
                            component="h1"
                            variant="h5"
                            color={"text.primary"}
                        >
                            {t("login")}
                        </Typography>

                        <Fragment>
                            <form
                                className={classes.form}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <MUItextField
                                    name={"email"}
                                    label={t("usernameOrEmail")}
                                    register={register}
                                    errors={errors}
                                    margin="normal"
                                />
                                <MUItextField
                                    margin="normal"
                                    name={"password"}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge={"end"}
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    label={t("password")}
                                    register={register}
                                    errors={errors}
                                />

                                <Grid item container justifyContent="center">
                                    <Button
                                        fullWidth
                                        className={classes.button}
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        startIcon={<LockOutlined />}
                                    >
                                        {t("login")}
                                    </Button>
                                </Grid>
                            </form>
                        </Fragment>
                    </div>
                </Container>
            </Root>
        </Layout>
    );
}
