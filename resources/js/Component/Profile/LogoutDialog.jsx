import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import { useTranslation } from "react-i18next";

function LogoutDialog(props) {
    const { openLogout, setOpenLogout } = props;

    const closeDialog = () => {
        setOpenLogout(false);
    };
    const { csrf_token } = usePage().props;

    const { t } = useTranslation();

    const LogoutHandler = () => {
        const data = {
            _token: csrf_token,
        };
        router.post("/logout", data);
    };
    return (
        <Dialog
            open={openLogout}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" color={"text.primary"}>
                {t("logout")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{t("confirmLogout")}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    {t("cancel")}
                </Button>
                <Button onClick={LogoutHandler} color="primary">
                    {t("confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

LogoutDialog.prototype = {
    openLogout: PropTypes.bool.isRequired,
    setOpenLogout: PropTypes.func.isRequired,
};

export default LogoutDialog;
