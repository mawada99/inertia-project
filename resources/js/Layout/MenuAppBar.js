import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, ListItemIcon, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useWidth from "../Hooks/useWidth";
import { Globals } from "../Component/HOC/Classes/Globals";
import {
  FilterList,
  Add,
  Edit,
  DeleteOutline,
  LockOpenOutlined,
  Print,
  TaskAlt,
  // SimCardDownloadOutlinedIcon,
} from "@mui/icons-material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// iconsConfig.js

const iconsConfig = {
  filterList: {
    title: "search",
    icon: FilterList,
  },
  add: {
    title: "createNew",
    icon: Add,
  },
  edit: {
    title: "edit",
    icon: Edit,
  },
  delete: {
    title: "delete",
    icon: DeleteOutline,
  },
  disapprove: {
    title: "disapprove",
    icon: LockOpenOutlined,
  },
  export: {
    title: "export",
    icon: SimCardDownloadOutlinedIcon,
  },
  print: {
    title: "print",
    icon: Print,
  },
  copy: {
    title: "copy",
    icon: ContentCopyIcon,
  },
  receive: {
    title: "receive",
    icon: TaskAlt,
  },
};

export default function LongMenu(props) {
  const { icons } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const screenWidth = useWidth();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Merge icon configurations from iconsConfig with passed actions and permissions
  const mergedIcons =
    icons &&
    icons?.map((icon) => ({
      ...iconsConfig[icon.id],
      ...icon, // override specific properties like action and permission
    }));

  // Filter icons based on permission
  const iconsShow =
    mergedIcons &&
    mergedIcons?.filter(
      (ele) =>
        ((typeof ele?.permission === "string" ||
          Array.isArray(ele?.permission)) &&
          Globals?.user?.hasPermission(ele.permission)) ||
        (typeof ele.permission === "boolean" && ele.permission) ||
        ele.permission === undefined
    );

  const iconsShowLength = iconsShow?.length > 3;
  const iconsDefaultArr = iconsShowLength ? iconsShow.slice(0, 2) : iconsShow;
  const iconsMenuArrInLarge = iconsShowLength ? iconsShow.slice(2) : iconsShow;
  const iconsMenuArr = ["sm", "xs"].includes(screenWidth)
    ? iconsShow
    : iconsMenuArrInLarge;

  const iconsDefault = iconsDefaultArr?.map((option) => (
    <Tooltip title={t(option.title)} key={option.id}>
      <Box component="span">
        <IconButton disabled={option.disabled} onClick={option.action}>
          <option.icon fontSize="inherit" />
        </IconButton>
      </Box>
    </Tooltip>
  ));

  const menuList = iconsMenuArr?.map((option) => (
    <MenuItem
      key={option.id}
      onClick={() => {
        if (!option.disabled) {
          option.action && option.action();
          handleCloseMenu();
        }
      }}
      disabled={option.disabled}
    >
      <ListItemIcon>
        {option.icon && <option.icon fontSize="small" />}
      </ListItemIcon>
      <Typography variant="inherit">{t(option.title)}</Typography>
    </MenuItem>
  ));

  return iconsShow?.length > 0 ? (
    <div>
      {!["sm", "xs"].includes(screenWidth) ? (
        <Box>
          {iconsDefault}
          {iconsShowLength && (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
      ) : (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        {menuList}
      </Menu>
    </div>
  ) : null;
}
