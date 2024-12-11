import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Divider,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext, useState } from "react";

import { Link } from "@inertiajs/react";
import { ExpandMore } from "@mui/icons-material";
// import GlobalSearch from "../Component/GlobalSearch/GlobalSearch";
import { useTranslation } from "react-i18next";
// import { Globals } from "../Component/HOC/Classes/Globals";
// import ChangePassDialog from "../Component/Profile/ChangePassDialog";
// import { useApolloClient } from "@apollo/client";

// import SpanLink from "../Component/HOC/CustomComponents/SpanLink";


import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ModeContext } from "../Context/ModeContext";
import { LANGUAGES_DETAILS } from "../LanguagesVariables";
import LogoutDialog from "../Component/Profile/LogoutDialog";

const PREFIX = "Menu";

const classes = {
  accordionSummary: `${PREFIX}-accordionSummary`,
  menuItemAccordion: `${PREFIX}-menuItemAccordion`,
  accordion: `${PREFIX}-accordion`,
};

const MenuStyle = styled(Menu)(({ theme }) => ({
  [`& .${classes.accordionSummary}`]: {
    minHeight: "16px !important",
    padding: "0 3px",
    [`& .Mui-expanded`]: {
      margin: 0,
    },
    [`& .MuiAccordionSummary-content`]: {
      margin: "6px 0",
    },
  },

  [`& .${classes.menuItemAccordion}`]: {
    padding: 0,
    margin: "4px 0",
  },
  [`& .${classes.accordion}`]: {
    background: "none",
    width: "100%",
    boxShadow: "none",
  },
}));
const languages = [
  "ar",
  "en",
  "ku"
];

function AvatarComponent(props) {
  const {
    addDashboard,
    addDashboardIcons,
    notificationIcon,
    messageIcon,
    open,
    handleClick,
    handleCloseMenu,
    anchorEl,
  } = props;
  {console.log(props);
  }
  const [openLogout, setOpenLogout] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);

  const { t, i18n } = useTranslation();


  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    document
      .getElementsByTagName("html")[0]
      .setAttribute("dir", i18n.language === "ku" ? "rtl" : i18n.dir());
    // client.reFetchObservableQueries();
    handleCloseMenu();
  };

  const { darkMode, ChangeMode } = useContext(ModeContext);

  return (
    <>
      <LogoutDialog setOpenLogout={setOpenLogout} openLogout={openLogout} />
      {/* <ChangePassDialog setOpen={setOpenChangePass} open={openChangePass} /> */}
      <MenuStyle
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        sx={{ zIndex: 1199 }}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "250px",
            borderRadius: "8px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& ul": {
              px: 3,
              py: 3,
            },
            "& ul li,& ul a": {
              px: "3px",
            },
            "& ul li:hover,& ul a:hover": {
              borderRadius: "8px",
            },
            "p::first-letter, div::first-letter": {
              // textTransform: "capitalize",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {addDashboard && (
          <MenuItem
            component={Link}
            to="/admin"
            onClick={handleCloseMenu}
            sx={{ textTransform: "capitalize" }}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            {t("dashboard")}
          </MenuItem>
        )}
        {!addDashboard && (
          <Stack spacing={2} direction="column" alignItems="center">
            <Avatar
              sx={{
                margin: "0 !important",
                height: "60px !important",
                width: "60px !important",
              }}
            />
            {/* {Globals?.user?.account ? (
              <SpanLink
                pathname="/admin/profile"
                onClick={handleCloseMenu}
                sx={{
                  fontSize: "18px",
                }}
              >
                {Globals?.user?.account?.name ?? Globals?.user?.username}
              </SpanLink>
            ) : (
              <Typography color={"text.primary"} variant="h6" noWrap>
                {Globals?.user?.account?.name ?? Globals?.user?.username}
              </Typography>
            )} */}
          </Stack>
        )}
        {!addDashboard && <Divider sx={{ my: 1 }} />}
        {/* {addDashboardIcons && (
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <GlobalSearch
              props={props.props}
              handleCloseMenu={handleCloseMenu}
            />
            {notificationIcon}
            {messageIcon}
          </Stack>
        )} */}
        {addDashboardIcons && <Divider sx={{ my: 1 }} />}
        {languages.length > 1 && (
          <MenuItem className={classes.menuItemAccordion}>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accordionSummary}
              >
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  color={"text.secondary"}
                >
                  <LanguageIcon />
                  <Typography noWrap color={"text.primary"}>
                    {t("chooseLang")}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={i18n.language}
                  onChange={changeLanguage}
                >
                  {languages.map((lang, index) => {
                    return (
                      <Typography key={index}>
                        <FormControlLabel
                          checked={lang === i18n.language}
                          value={lang}
                          control={<Radio />}
                          label={LANGUAGES_DETAILS[lang].nativeName}
                        />
                      </Typography>
                    );
                  })}
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
          </MenuItem>
        )}
        <MenuItem onClick={ChangeMode}>
          <ListItemIcon>
            {darkMode ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon  />
            )}
          </ListItemIcon>
          {darkMode ? (
            <Typography>{t("lightMode")}</Typography>
          ) : (
            <Typography>{t("darkMode")}</Typography>
          )}
        </MenuItem>
        <MenuItem onClick={() => setOpenChangePass(true)}>
          <ListItemIcon>
            <LockOutlinedIcon />
          </ListItemIcon>
          <Typography>{t("changePassword")}</Typography>
        </MenuItem>
        <MenuItem onClick={() => setOpenLogout(true)}>
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <Typography>{t("logout")}</Typography>
        </MenuItem>
      </MenuStyle>

      <IconButton
        onClick={handleClick}
        size="medium"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {addDashboardIcons ? (
          <Badge
            color="primary"
            variant="dot"
            // invisible={!((badge.message === "false") || (badge.notification === "false"))}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </Badge>
        ) : (
          <Avatar sx={{ width: 32, height: 32 }} />
        )}
      </IconButton>
    </>
  );
}

export default AvatarComponent;
