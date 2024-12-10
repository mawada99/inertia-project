import React, { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { Can } from "./Secured";
import { useTranslation } from "react-i18next";
import { gql, useMutation } from "@apollo/client";
import CustomDialog from "./CustomDialog";
import ButtonLoading from "../FunctionComponents/LoadingPages/ButtonLoading";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { KeyValuePair } from "./KeyValuePair";
import ControlMUItextField from "../MUI/ControlMUItextField";
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

const MutationDialogWithTextField = (props) => {
  const {
    mutaion,
    id,
    dialogTitle,
    onCompleteMessage,
    viewPermission,
    updatePermission,
    onCompleted,
    onError,
    dialogProps,
    mutaionProps,
    fieldName,
    fieldLabel,
    title,
    value,
  } = props;
  const [dialog, setDialog] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, reset, setValue } = useForm();

  const closeDialog = () => {
    reset();
    setDialog(false);
  };
  const openDialog = () => {
    setValue(fieldName, value ?? "");

    setDialog(true);
  };

  const [fireMutation, { loading }] = useMutation(
    gql`
      ${mutaion}
    `,
    {
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      onCompleted: (data) => {
        closeDialog();
        enqueueSnackbar(t(onCompleteMessage), {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          TransitionComponent: Collapse,
        });
        onCompleted && onCompleted(data);
      },
      onError: (error) => {
        console.log(error);
        closeDialog();
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          TransitionComponent: Collapse,
        });

        onError && onError(error);
      },
      ...mutaionProps,
    }
  );

  const submit = (data) => {
    fireMutation({
      variables: {
        input: {
          id,
          ...data,
        },
      },
    });
  };
  return (
    <Fragment>
      <CustomDialog
        title={t(dialogTitle)}
        fullWidth
        maxWidth="xs"
        onClose={closeDialog}
        open={dialog}
        {...dialogProps}
      >
        <form onSubmit={handleSubmit(submit)}>
          <DialogContent sx={{ pt: 0 }}>
            <ControlMUItextField
              control={control}
              name={fieldName}
              label={t(fieldLabel)}
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={closeDialog}>
              {t("cancel")}
            </Button>
            <Button color="primary" disabled={loading} type="submit">
              {loading ? <ButtonLoading /> : t("confirm")}
            </Button>
          </DialogActions>
        </form>
      </CustomDialog>
      <Can showException permission={viewPermission}>
        <Grid sx={{ display: "flex", p: 0.5 }} xs={12} sm={6} md={3}>
          <KeyValuePair
            sx={{ p: "0px !important", width: "auto !important", mr: 2 }}
            xs={12}
            valuesx={{ whiteSpace: "pre-line" }}
            title={t(title)}
            value={value ?? "--"}
          />
          {updatePermission && (
            <IconButton onClick={openDialog} color="primary">
              <Edit />
            </IconButton>
          )}
        </Grid>
      </Can>
    </Fragment>
  );
};

MutationDialogWithTextField.propTypes = {
  mutaion: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  dialogTitle: PropTypes.any.isRequired,
  onCompleteMessage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  viewPermission: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  updatePermission: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  dialogProps: PropTypes.object,
  mutaionProps: PropTypes.object,
};

export default MutationDialogWithTextField;
