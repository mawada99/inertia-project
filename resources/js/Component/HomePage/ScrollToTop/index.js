import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandLess } from "@mui/icons-material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const PREFIX = "ScrollTop";

const classes = {
  icon: `${PREFIX}-icon`,
  visible: `${PREFIX}-visible`,
  expandLess: `${PREFIX}-expandLess`,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.icon}`]: {
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    right: 30,
    bottom: -100,
    cursor: "pointer",
    transitionDuration: "0.2s",
    transitionTimingFunction: "linear",
    transition: "bottom 1s linear",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  [`&.${classes.visible}`]: {
    bottom: 10,
  },

  [`& .${classes.expandLess}`]: {
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
}));

const ScrollTop = (props) => {
  const [shouldShowHeader, setShouldShowHeader] = useState(false);
  const listenToScroll = () => {
    setShouldShowHeader(window.pageYOffset > 300);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);
  return (
    <StyledIconButton
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      color="primary"
      component="span"
      className={clsx({ [classes.visible]: shouldShowHeader }, classes.icon)}
      size="small"
    >
      <ExpandLess fontSize="large" className={classes.expandLess} />
    </StyledIconButton>
  );
};

export default ScrollTop;
