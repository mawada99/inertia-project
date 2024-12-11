import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import config from "../../config.json";

import { RiMessengerLine } from "react-icons/ri";
const PREFIX = "Messenger";

const classes = {
  icon: `${PREFIX}-icon`,
  wi: `${PREFIX}-mi`,
};

const StyledIconButton = styled("div")(({ theme }) => ({
  [`&.${classes.icon}`]: {
    position: "fixed",
    right: 27,
    bottom: 135,
  },
  [`& .${classes.wi}`]: {
    backgroundColor: "#0695FF",
    color: "#FFF",
    fontSize: "28px",
    cursor: "pointer",
    [`&:hover`]: {
      backgroundColor: "#0b7acc",
    },
  },
}));

const IconWhatsapp = () => {
  return (
    <StyledIconButton
      component="span"
      className={clsx(classes.icon)}
      // size="small"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={config.socialLinks.messenger}
      >
        <Fab className={classes.wi} aria-label="add">
          <RiMessengerLine />
        </Fab>
      </a>
    </StyledIconButton>
  );
};

export default IconWhatsapp;
