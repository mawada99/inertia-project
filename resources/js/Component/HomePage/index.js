import React, { useEffect } from "react";

import SimpleSlider from "./Slider";
import FooterSection from "./Footer";

// import HomePageHeader from "./Navbar/header/HomePageHeader";
import "./css/font-awesome.min.css";
import "./css/responsive.css";
import "./css/flaticon.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import ScrollTop from "./ScrollToTop";
import config from "../../config.json";
import { replaceUrl } from "../HOC/CustomFunctions/pushUrl";
import { useHistory } from "react-router";
import SocialIcons from "./SocialIcons";

export default function Login(props) {
  const history = useHistory();
  const landingPage = !config.app.landingPage
  useEffect(() => {
    if (localStorage.getItem("subscriptionExpired")) {
      history.push({ pathname: "/renewal" });
      return;
    }
    return () => {
      // setLoadingFinshed(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (landingPage && localStorage.getItem("token")) {
      replaceUrl(props, "/admin");
    } else if (landingPage && !localStorage.getItem("token")) {
      replaceUrl(props, "/login");
    }
    return () => { };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !landingPage ? (
    <div>
      {/* <HomePageHeader /> */}

      {config.homeSections?.map((field) => {
        switch (field) {
          case "banner":
            return <SimpleSlider key={field} />;

         

          default:
            return "";
        }
      })}

      <FooterSection />
      {(config.socialLinks.whatsapp || config.socialLinks.messenger) && <SocialIcons />}
      <ScrollTop />
    </div>
  ) : "";
}
