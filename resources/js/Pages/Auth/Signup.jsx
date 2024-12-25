import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Grid,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    Container,
    CssBaseline,
    Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import MUItextField from "../../Component/HOC/MUI/MUItextField";
import {
    AccountCircleOutlined,
    AddCircleOutline,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, router } from "@inertiajs/react";
import Layout from "../Layout";

const PREFIX = "Registration";

const classes = {
    main: `${PREFIX}-main`,
    paper: `${PREFIX}-paper`,
    avatar: `${PREFIX}-avatar`,
    form: `${PREFIX}-form`,
    submit: `${PREFIX}-submit`,
    button: `${PREFIX}-button`,
    margin: `${PREFIX}-margin`,
    appBar: `${PREFIX}-appBar`,
    title: `${PREFIX}-title`,
    login: `${PREFIX}-loginSpan`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
    [`& .${classes.main}`]: {
        margin: "2.7% 0",
        zIndex: "1",
        "& .MuiFilledInput-adornedEnd": {
            padding: "0px !important",
        },
    },

    [`& .${classes.paper}`]: {
        marginTop: theme.spacing(5),
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

    [`& .${classes.submit}`]: {
        margin: theme.spacing(3, 0, 2),
    },

    [`& .${classes.button}`]: {
        margin: theme.spacing(2, 0),
    },

    [`& .${classes.margin}`]: {
        padding: theme.spacing(0, 1),
    },

    [`& .${classes.appBar}`]: {
        position: "relative",
    },

    [`& .${classes.title}`]: {
        color: theme.palette.text.primary,
    },
    [`& .${classes.login}`]: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
        textTransform: "capitalize",
    },
}));

///////////graphql/////////////

const SignUp = ({ csrf_token }) => {
    const { t } = useTranslation();

    ////////THEMES//////////

    const [showPassword, setShowPassword] = useState(false);
    const [ConShowPassword, ConSetShowPassword] = useState(false);
    const { handleSubmit, register, setError, formState } = useForm({
        defaultValues: {
            _token: csrf_token,
        },
    });

    ////////VLAIDATION FORM/////////
    const { errors } = formState;
    // const multiCountry = config.app.multiCountry;

    //////////////////// graphql Function ///////////////////

    ////////SERVER VALIDATION/////////

    /////////DIALOG HANDLER//////////

    /////////SUBMIT HANDLER////////////

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickConShowPassword = () => {
        ConSetShowPassword(!ConShowPassword);
    };
    const onSubmit = (data) => {
        router.post("/signup", data, {
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, value]) => {
                    setError(key, { type: "server", message: value });
                });
            },
        });
    };
    return (
        <Layout>
            <StyledContainer maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleOutlined />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        color={"text.primary"}
                    >
                        {t("createNewAccount")}
                    </Typography>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={classes.form}
                    >
                        <Grid
                            container
                            item
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid
                                item
                                className={classes.margin}
                                sm={12}
                                xs={12}
                            >
                                <MUItextField
                                    margin="dense"
                                    name={"name"}
                                    label={t("name")}
                                    register={register}
                                    formType={"requireFalse"}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid
                                item
                                className={classes.margin}
                                sm={12}
                                xs={12}
                            >
                                <MUItextField
                                    margin="dense"
                                    name={"email"}
                                    label={t("email")}
                                    register={register}
                                    errors={errors}
                                    formType={"pattern"}
                                    formVal={{
                                        value: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: t("emailIsInvalid"),
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                className={classes.margin}
                                sm={12}
                                xs={12}
                            >
                                <MUItextField
                                    margin="dense"
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
                            </Grid>

                            <Grid
                                item
                                className={classes.margin}
                                sm={12}
                                xs={12}
                            >
                                <MUItextField
                                    margin="dense"
                                    name={"password_confirmation"}
                                    type={ConShowPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickConShowPassword
                                                    }
                                                    size="large"
                                                >
                                                    {ConShowPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    label={t("password_confirmation")}
                                    register={register}
                                    errors={errors}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                className={classes.button}
                                size="large"
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<AddCircleOutline />}
                                type="submit"
                            >
                                {t("createNewAccount")}
                            </Button>
                        </Grid>

                        {/* <Divider /> */}
                    </form>

                    <Grid
                        item
                        container
                        justifyContent="start"
                        fontSize={16}
                        className={classes.title}
                    >
                        {t("alreadyhaveaccount")}
                        {/* <SpanLink className={classes.login} pathname={`/login`}>
                        {t("login")}
                    </SpanLink> */}

                        <Link className={classes.login} href="/login">
                            {t("login")}
                        </Link>
                    </Grid>
                </div>
            </StyledContainer>
        </Layout>
    );
};
export default SignUp;
