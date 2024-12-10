import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const CustomDialog = (props) => {
  const { title, content, actions, styleContent, ...restProps } = props;

  return (
    <Dialog {...restProps}>
      {title && <DialogTitle color={"text.primary"}>{title}</DialogTitle>}
      {props.children}
      {content && (
        <DialogContent sx={{ pb: 1, ...styleContent }}>{content}</DialogContent>
      )}
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

CustomDialog.propTypes = {
  title: PropTypes.any,
  content: PropTypes.any,
  actions: PropTypes.any,
};

export default CustomDialog;
