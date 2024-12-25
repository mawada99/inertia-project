import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box, Button, Typography } from "@mui/material";
import CustomSpinner from "../Component/HOC/FunctionComponents/CustomSpinner";
import { useTranslation } from "react-i18next";
import { Globals } from "../Component/HOC/Classes/Globals";

import LogoImg from "./LogoImg";
import { usePage } from "@inertiajs/react";
import { User } from "../Component/HOC/Classes/User";

const PREFIX = "withUserDataLoader";

const classes = {
    loadingPage: `${PREFIX}-loadingPage`,
    errorMessage: `${PREFIX}-errorMessage`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.loadingPage}`]: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1000,
        backgroundColor: theme.palette.background.default,
    },

    [`& .${classes.errorMessage}`]: {
        marginTop: theme.spacing(2),
        display: "block",
    },
}));

function withUserDataLoader(Component) {
    const UserDataLoader = (props) => {
        const { t } = useTranslation();
        const { user } = usePage().props;
        console.log(user);
        console.log("user");
        Globals.setUser(new User(user));
        const [loadingFinshed, setLoadingFinshed] = useState(true);
        const [loadingErorr, setLoadingError] = useState(true);
        // const history = useHistory();
        // const { setFirstLoad } = useContext(ModeContext);

        // useEffect(() => {
        //     const token = localStorage.getItem("token");
        //     if (!token) {
        //         history.push({
        //             pathname: "/login",
        //             state: {
        //                 unAuthenticated: true,
        //                 prevUrl: `${history.location.pathname}${window.location.search}`,
        //             },
        //         });
        //         // replaceUrl(props, "/login");
        //         return;
        //     }
        //     return () => {
        //         setLoadingFinshed(false);
        //     };
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, []);
        // const { error } = useQuery(
        //     gql`
        //         ${USER_SETTINGS.query}
        //     `,
        //     {
        //         fetchPolicy: "no-cache",
        //         nextFetchPolicy: "no-cache",
        //         skip: Globals.user || !localStorage.getItem("token"),
        //         variables: {
        //             // input: {
        //             //   main: true,
        //             // },
        //         },
        //         onCompleted: (data) => {
        //             const allData = data.me;
        //             allData.member = data.member;
        //             Globals.setUser(new User(allData));
        //             const start = moment().startOf("day");
        //             const end = moment(
        //                 data.freightSettings.renewalDate,
        //                 "YYYY-MM-DD"
        //             );
        //             const days = moment.duration(end.diff(start)).asDays();
        //             data.freightSettings.timeLeft = days <= 2;
        //             localStorage.setItem(
        //                 "renewalDateMsg",
        //                 data.freightSettings.timeLeft
        //             );
        //             Globals.settings = new SettingsData(data.freightSettings);
        //             // Globals.branch = new branch(data.settings["mainBranch"]);
        //             setLoadingFinshed(true);
        //             setFirstLoad(true);
        //             // setHasMessagesPermission(Globals.user.hasPermission("shipping.shipment_message.list"))
        //         },
        //         onError: (error) => {
        //             const networkError = Object(error.networkError);
        //             const errorExtensions =
        //                 error?.graphQLErrors?.[0]?.extensions;
        //             const category = errorExtensions?.category;
        //             const versionNotSupportedError =
        //                 errorExtensions?.code === "VERSION_NOT_SUPPORTED";

        //             //check ErrorHandler file and change the condation there too
        //             if (
        //                 error?.networkError ||
        //                 (category &&
        //                     !["validation", "custom", "authorization"].includes(
        //                         category
        //                     )) ||
        //                 versionNotSupportedError
        //             ) {
        //                 setLoadingError(true);
        //             } else {
        //                 setLoadingFinshed(true);
        //             }
        //         },
        //     }
        // );

        // const clientNotSupported =
        //     error?.graphQLErrors[0]?.extensions?.code ===
        //     "VERSION_NOT_SUPPORTED";

        return (
            <Root>
                {loadingFinshed || Boolean(Globals.user) ? (
                    <Component {...props} />
                ) : (
                    <Grid
                        container
                        alignContent="center"
                        justifyContent="center"
                        className={classes.loadingPage}
                    >
                        <LogoImg
                            style={{ margin: "40px 100%", height: "42px" }}
                        />
                        <Grid
                            sx={{
                                height: 80,
                                display: "flex",
                            }}
                        >
                            {!loadingErorr ? (
                                <CustomSpinner
                                    name="BarLoader"
                                    height={4}
                                    width={200}
                                />
                            ) : (
                                <Box>
                                    <Typography>
                                        {error.networkError
                                            ? "Network Error"
                                            : clientNotSupported
                                            ? t("pleaseReload")
                                            : t("serverError")}
                                    </Typography>
                                    <Grid
                                        item
                                        container
                                        justifyContent="center"
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                            color="primary"
                                            size="small"
                                            className={classes.errorMessage}
                                        >
                                            {t("tryAgain")}
                                        </Button>
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Root>
        );
    };
    return UserDataLoader;
}
export default withUserDataLoader;
