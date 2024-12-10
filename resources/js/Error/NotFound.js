import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbError404 } from 'react-icons/tb';

const PREFIX = 'NotFound';

const classes = {
  root: `${PREFIX}-root`,
  link: `${PREFIX}-link`,
  marginTop: `${PREFIX}-marginTop`,
  marginTopBtn: `${PREFIX}-marginTopBtn`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    position: "absolute",
    textAlign: "center",
  },

  [`& .${classes.link}`]: {
    textDecoration: "none",
  },

  [`& .${classes.marginTop}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${classes.marginTopBtn}`]: {
    marginTop: theme.spacing(5),
  }

}));

const NotFound = (props) => {

  const { t } = useTranslation();

  return (
    <Root>
      <Box className={classes.root}>
        {/* <img src={notFound} height={120} alt="404" /> */}
        <TbError404 size={100} color="gray" />

        <Typography sx={{ color: "gray" }} variant="h6" className={classes.marginTop}>
          {t("pageNotFound")}
        </Typography>
        <Link className={classes.link} to="/admin">
          <Button
            className={classes.marginTopBtn}
            variant="outlined"
            color="primary"
          >
            {t("home")}
          </Button>
        </Link>
      </Box>
    </Root>
  );
};

export default NotFound;
