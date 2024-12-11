import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  IconButton,
  Collapse
} from "@mui/material";
import {
  Cancel,
} from "@mui/icons-material";
import { Globals } from "../HOC/Classes/Globals";
import { useTranslation } from "react-i18next";
import CustomerView from "../Customers/CustomerView";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import ButtonLoading from "../HOC/FunctionComponents/LoadingPages/ButtonLoading";
import { ChangePassword } from "../ChangePassword/ChangePassword";
import CustomDialog from "../HOC/CustomComponents/CustomDialog";
import { useSnackbar } from "notistack";
import { RiUserUnfollowLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { UserLogout } from "../../helpers/helpersFunction";
import config from "../../config.json";
import { useContext } from "react";
import { ModeContext } from "../../Context/ModeContext";

const PREFIX = "Profile";

const classes = {
  spacing: `${PREFIX}-spacing`,
  mainGrid: `${PREFIX}-mainGrid`,
  icon: `${PREFIX}-icon`,
  paper: `${PREFIX}-paper`,
  Profile: `${PREFIX}-Profile`,
  details: `${PREFIX}-details`,
  bottomList: `${PREFIX}-bottomList`,
  listItemFocus: `${PREFIX}-listItemFocus`,
  navLink: `${PREFIX}-navLink`,
  root: `${PREFIX}-root`,
  color: `${PREFIX}-color`,
  userIcon: `${PREFIX}-userIcon`,
  username: `${PREFIX}-username`,
  fullHeight: `${PREFIX}-fullHeight`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  height: "100%",

  [`& .${classes.mainGrid}`]: {
    width: "100%",
    height: "100%",
    margin: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.action.disabledBackground}`,

    [theme.breakpoints.down("md")]: {
      borderBottom: "none",
    },
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(3),
    fontWeight: "bold",
  },

  [`& .${classes.Profile}`]: {
    borderRight: `1px solid ${theme.palette.action.disabledBackground}`,
    paddingTop: theme.spacing(2),
    height: "100%",
    display: "flex",
    alignContent: "space-between",
    [theme.breakpoints.down("md")]: {
      borderBottom: `1px solid ${theme.palette.action.disabledBackground}`,
      borderRight: 0,
      height: "auto",
    },
  },

  [`& .${classes.details}`]: {
    padding: theme.spacing(2),
  },

  [`& .${classes.bottomList}`]: {
    position: "sticky",
    padding: 0,
    width: "100%",
    backgroundColor: theme.palette.background.default,
    // borderTop: `1px solid ${theme.palette.divider}`,
    "& .MuiListItemIcon-root": {
      minWidth: theme.spacing(4),
    },
    "& .MuiTypography-body1": {
      fontSize: "0.9rem",
    },
    textTransform: "capitalize",
  },

  [`& .${classes.listItemFocus}`]: {
    color: `${theme.palette.primary.main}!important`,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.navLink}`]: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center !important",
    },
    textDecoration: "none",
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },

  [`& .${classes.root}`]: {
    // marginTop: theme.spacing(2),
  },

  [`& .${classes.color}`]: {
    color: "red",
  },

  [`& .${classes.userIcon}`]: {
    [theme.breakpoints.down("md")]: {
      fontSize: "60px",
    },
    color: theme.palette.action.active,
    fontSize: "90px",
    marginBottom: "10px",
  },

  [`& .${classes.username}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.fullHeight}`]: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
  },
}));

const Profile = (props) => {
  const { t } = useTranslation();
  const account = Globals.user;

  const id = account.account?.id;
  const theme = useTheme();
  const dir = theme.direction;

  const { enqueueSnackbar } = useSnackbar();

  const LOGOUT = gql`
    mutation {
      logout
    }
  `;

  const client = useApolloClient();
  const history = useHistory();
  const { setHasMessagesPermission } = useContext(ModeContext)

  const landingPage = config.app.landingPage;
  const afterLogout = () => history.replace(landingPage ? "/" : "/login");
  const [logout, { loading: logoutLoad }] = useMutation(LOGOUT);
  const LogoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data.logout === true) {
          client.stop();
          client.resetStore();
          setHasMessagesPermission(false)
          UserLogout(afterLogout);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [dialog, setDialog] = useState(false);
  const closeDialog = () => {
    setDialog(false);
  };

  const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangePassword = () => {
    handleClose();
    enqueueSnackbar(t("passwordChangedMessage"), {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      TransitionComponent: Collapse,
    });
  };

  return (
    <Root>
      <Dialog
        dir={dir}
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" color={"text.primary"}>{t("logout")}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>{t("confirmLogout")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={logoutLoad} onClick={closeDialog} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={LogoutHandler} color="primary">
            {logoutLoad ? <ButtonLoading /> : t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomDialog
        open={open}
        onClose={handleClose}
        content={<ChangePassword onComplete={onChangePassword} />}
        title={
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              {t("changePassword")}
            </Typography>
            <IconButton
              onClick={handleClose}
              className={classes.color}
              sx={{ alignItems: "flex-end" }}
              size="large"
            >
              <Cancel />
            </IconButton>
          </Grid>
        }
      />

      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        className={clsx(classes.mainGrid)}
      // spacing={2}
      >
        <Grid
          container
          item
          justifyContent="center"
          alignContent="flex-start"
          className={classes.fullHeight}
          md={12}
        >
          {account.account ? (
            <Grid
              container
              item
              justifyContent="center"
              className={classes.root}
            >
              <CustomerView props={props} id={id} />
            </Grid>
          ) : (
            <Grid
              justifyContent="center"
              alignContent="center"
              container
              item
              className={clsx(classes.paper, classes.fullHeight)}
            >
              <Grid justifyContent="center" container item>
                <RiUserUnfollowLine className={classes.userIcon} />
              </Grid>
              <Grid justifyContent="center" container item>
                <Typography variant="h6" color="textSecondary">
                  {t("noLinkedAccount")}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Root>
  );
};

export default Profile;
