import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { styled } from "@mui/material/styles";

import PropTypes from "prop-types";
import BreadcrumbsWidget from './Breadcrumbs';



const Root = styled(Toolbar)(({ theme }) => ({
    // borderBottom: "1px #ccd1d6 solid",
    backgroundColor: theme.palette.background.appTitle,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 251,
    // [theme.breakpoints.down("sm")]: {
    //     position: "fixed",
    //     top: "56px"
    // },
}));

const TitleAppBar = (props) => {
    const { path, type } = props
    return (
        <Root variant="dense" id='headerPage--'>
            <Box>
                <BreadcrumbsWidget path={path} type={type}  />
                {/* {props.title} */}
            </Box>
            {props.children && <Box sx={{ textAlign: "end", display: "flex", alignItems: "center" }}>
                {props.children}
            </Box>}
        </Root>
    )
}

TitleAppBar.propTypes = {
    path: PropTypes.any,
    type: PropTypes.any,
    icons: PropTypes.any,
};

export default TitleAppBar