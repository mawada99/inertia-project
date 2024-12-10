import React, { Fragment, useState } from "react";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import { Can } from "./Secured";
import { useTranslation } from "react-i18next";
import { gql, useMutation } from "@apollo/client";
import CustomDialog from "./CustomDialog";
import ButtonLoading from "../FunctionComponents/LoadingPages/ButtonLoading";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

const MutationWithDialog = (props) => {
  const {
    mutaion,
    icon: Icon,
    // dialogTitle,
    // dialogContent,
    iconTooltip,
    onCompleteMessage,
    permission,
    onCompleted,
    onError,
    dialogProps,
    iconProps,
    openDelete,
    setOpenDelete,
    mutaionProps,
  } = props;


  const noIcon = !Boolean(setOpenDelete)
  const [dialog, setDialog] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const closeDialog = () => noIcon ? setDialog(false) : setOpenDelete(false);
  const openDialog = () => setDialog(true);

  const [fireMutation, { loading }] = useMutation(
    gql`
      ${mutaion}
    `,
    {
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      onCompleted: (data) => {
        closeDialog();
        enqueueSnackbar(onCompleteMessage, {
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

  return (
    <Fragment>
      <CustomDialog
        title={t("confirmationMessage")}
        fullWidth
        maxWidth="xs"
        onClose={closeDialog}
        content={t("deleteDesc")}
        open={noIcon ? dialog : openDelete}
        actions={
          <Fragment>
            <Button color="primary" onClick={closeDialog}>
              {t("cancel")}
            </Button>
            <Button
              color="primary"
              disabled={loading}
              onClick={() => fireMutation()}
            >
              {loading ? <ButtonLoading /> : t("confirm")}
            </Button>
          </Fragment>
        }
        {...dialogProps}
      />

      {noIcon && <Can showException permission={permission}>
        <Tooltip title={iconTooltip}>
          <IconButton
            {...iconProps}
            onClick={openDialog}
            disabled={loading}
            color={"primary"}
          >
            <Icon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Can>}
    </Fragment>
  );
};

MutationWithDialog.propTypes = {
  mutaion: PropTypes.any.isRequired,
  icon: PropTypes.object,
  dialogTitle: PropTypes.any.isRequired,
  dialogContent: PropTypes.any.isRequired,
  iconTooltip: PropTypes.string,
  onCompleteMessage: PropTypes.string.isRequired,
  permission: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  dialogProps: PropTypes.object,
  iconProps: PropTypes.object,
  mutaionProps: PropTypes.object,
};

export default MutationWithDialog;
