import {
  Popover,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";


import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles';
import { LANGUAGES_DETAILS } from "../../../LanguagesVariables";

const PREFIX = 'language';

const classes = {
  list: `${PREFIX}-list`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.list}`]: {
    // padding: theme.spacing(1),
  },
}));
const languages= [
  "ar",
  "en",
  "ku"
];

const LanguageIcons = () => {
  const { t, i18n } = useTranslation();


  const changeLanguage = (event) => {
    console.log(i18n);
    
    console.log(i18n.dir());
    
    i18n.changeLanguage(event.target.value)
    document.getElementsByTagName("html")[0].setAttribute("dir", i18n.language === "ku" ? "rtl" : i18n.dir());
    // client.reFetchObservableQueries();
    handleCloseLang()
  };

  const [anchorElLang, setAnchorElLang] = useState(null);
  const openLang = Boolean(anchorElLang);
  const langId = openLang ? "popover" : undefined;

  const handleOpenLang = (event, id) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLang = () => {
    setAnchorElLang(null);
  };

  if (languages.length === 1) {
    return null
  }

  return <Fragment>
    <Tooltip title={t("chooseLang")}>
      <IconButton
        sx={{ p: 1 }}
        aria-label="Language"
        onClick={handleOpenLang}
        aria-describedby={langId}
      // disabled={shipmentsId?.length === 0}
      >
        <LanguageIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
    <Popover
      id={langId}
      open={openLang}
      anchorEl={anchorElLang}
      onClose={handleCloseLang}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <List>
        <Box>
          <Root>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={i18n.language}
              onChange={changeLanguage}
            >
              {languages.map((lang, index) => {
                return (
                  <ListItem className={classes.list} key={index}>
                    <FormControlLabel
                      checked={lang === i18n.language}
                      value={lang}
                      control={<Radio />}
                      label={LANGUAGES_DETAILS[lang].nativeName} />
                  </ListItem>
                )
              })}
            </RadioGroup>
          </Root>
        </Box>
      </List>
    </Popover>
  </Fragment>
};

export default LanguageIcons;
