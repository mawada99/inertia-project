import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { FaWhatsapp } from "react-icons/fa";
import config from "../../config.json";
import { RiMessengerLine } from "react-icons/ri";

const PREFIX = "SocialIcons";

const classes = {
  icons: `${PREFIX}-icons`,
  messengerIcon: `${PREFIX}-messengerIcon`,
  whatsappIcon: `${PREFIX}-whatsappIcon`,
};

const StyledIconButton = styled("div")(({ theme }) => ({
  [`&.${classes.icons}`]: {
    position: "fixed",
    right: 27,
    bottom: 70,
    display: "flex",
    flexDirection: "column"
  },
  [`& a`]: {
    margin: theme.spacing(1, 0)
  },
  [`& .${classes.whatsappIcon}`]: {
    backgroundColor: "#25d450",
    color: "#FFF",
    fontSize: "28px",
    cursor: "pointer",
    [`&:hover`]: {
      backgroundColor: "#24ab07",
    },
  },
  [`& .${classes.messengerIcon}`]: {
    backgroundColor: "#0695FF",
    color: "#FFF",
    fontSize: "28px",
    cursor: "pointer",
    [`&:hover`]: {
      backgroundColor: "#0b7acc",
    },
  },
}));

const SocialIcons = () => {
  return (
    <StyledIconButton
      component="span"
      className={clsx(classes.icons)}
    >
      {config.socialLinks.messenger && <a
        target="_blank"
        rel="noopener noreferrer"
        href={config.socialLinks.messenger}
      >
        <Fab className={classes.messengerIcon} aria-label="add">
          <RiMessengerLine />
        </Fab>
      </a>}
      {config.socialLinks.whatsapp && <a
        target="_blank"
        rel="noopener noreferrer"
        href={config.socialLinks.whatsapp}
      >
        <Fab className={classes.whatsappIcon} aria-label="add">
          <FaWhatsapp />
        </Fab>
      </a>}
    </StyledIconButton>
  );
};

export default SocialIcons;
