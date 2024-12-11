import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ModeContext } from "../Context/ModeContext";

// Define image imports statically for simplicity
import logoLight from "../Image/logo-light.png";
import logoDark from "../Image/logo-dark.png";

const LogoImg = ({ forceLight, className, style, height }) => {
    const { darkMode } = useContext(ModeContext);

    // Determine the appropriate logo based on the mode
    const logo = forceLight || !darkMode ? logoLight : logoDark;

    return (
        <img
            src={logo}
            alt="Logo"
            className={className || ""}
            style={style || {}}
            height={height || "auto"}
        />
    );
};

LogoImg.propTypes = {
    forceLight: PropTypes.bool,
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
};

export default LogoImg;
