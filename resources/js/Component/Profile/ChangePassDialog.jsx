import { Collapse, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { useSnackbar } from 'notistack';
import CustomDialog from '../HOC/CustomComponents/CustomDialog';
import { Cancel } from '@mui/icons-material';

function ChangePassDialog(props) {
    const {
        open,
        setOpen,
    } = props

    const closeDialog = () => {
        setOpen(false);
    };
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const onChangePassword = () => {
        closeDialog();
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
        <CustomDialog
            open={open}
            onClose={closeDialog}
            content={<ChangePassword onComplete={onChangePassword} />}
            title={
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" color="textPrimary">
                        {t("changePassword")}
                    </Typography>
                    <IconButton
                        onClick={closeDialog}
                        sx={{ alignItems: "flex-end" }}
                        size="large"
                    >
                        <Cancel />
                    </IconButton>
                </Grid>
            }
        />
    )
}

ChangePassDialog.prototype = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default ChangePassDialog