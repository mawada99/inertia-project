import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaPhone,
  FaYoutube,
  FaSlack,
} from "react-icons/fa";
import Grid from '@mui/material/Unstable_Grid2';

import "./style.css";
import config from "../../../config.json";
import clsx from "clsx";
import { RiMessengerLine } from "react-icons/ri";
import { Container } from "@mui/material";

const PREFIX = "FooterSection";

const classes = {
  background: `${PREFIX}-background`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.background}`]: {
    display: "flex",
    flexWrap: "wrap",
    "& li a": {
      "&:hover": {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  },
}));

const FooterSection = () => {
  const { t } = useTranslation("home");

  return (
    <Root id="footer" className="wpo-footer-area">
      <div className="wpo-footer-top">
        <Container>
          <Grid container spacing={2}>
            <Grid xs={12} >
              <ul className={clsx(classes.background, "social")}>
                {config.socialLinks.phone && (
                  <li>
                    <a
                      rel="noopener noreferrer"
                      href={config.socialLinks.phone}
                    >
                      <FaPhone />
                    </a>
                  </li>
                )}
                {config.socialLinks.facebook && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.facebook}
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                )}
                {config.socialLinks.messenger && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.messenger}
                    >
                      <RiMessengerLine />
                    </a>
                  </li>
                )}
                {config.socialLinks.whatsapp && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.whatsapp}
                    >
                      <FaWhatsapp />
                    </a>
                  </li>
                )}
                {config.socialLinks.linkedIn && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.linkedIn}
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                )}
                {config.socialLinks.instgram && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.instgram}
                    >
                      <FaInstagram />
                    </a>
                  </li>
                )}
                {config.socialLinks.tiktok && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.tiktok}
                    >
                      <FaTiktok />
                    </a>
                  </li>
                )}
                {config.socialLinks.youtube && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.youtube}
                    >
                      <FaYoutube />
                    </a>
                  </li>
                )}
                {config.socialLinks.slack && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={config.socialLinks.slack}
                    >
                      <FaSlack />
                    </a>
                  </li>
                )}
              </ul>
            </Grid>
            <Grid xs={12} className="wpo-footer-bottom-content">
              <div>
                {t("home:footerCopyright")}. {t("home:poweredBy")}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://accuratess.com"
                >
                  {t("home:accurate")}
                </a>
              </div>
            </Grid>
          </Grid>
        </Container>

        {/* <Container>
          <div className="wpo-footer-bottom-content">
            <div className="row">
              <div className="col-12">

              </div>
            </div>
          </div>
        </Container> */}
      </div>
    </Root>
  );
};

export default FooterSection;
