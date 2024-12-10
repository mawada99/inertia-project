import * as React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { windowReplaceUrl } from "../CustomFunctions/pushUrl";
import { useHistory } from "react-router";
const StyledBox = styled(Paper)(({ theme }) => ({
  borderBottom: "1px solid " + theme.palette.divider,
  // backgroundColor: "white",
  display: "grid",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
}));

function TabPanel(props) {
  const { children, value, index, settings, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {(value === index || settings) && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTab(props) {
  const {
    valueTab,
    tapDetails,
    hashKeys,
    settings,
    handleHashChange,
    changeHashKeyFun,
  } = props;

  const [value, setValue] = React.useState(valueTab ?? 0);
  const history = useHistory();
  const href = document.location.href.split("#");

  const handleChange = (event, newValue) => {
    handleHashChange && handleHashChange(`#${hashKeys[newValue]}`);
    setValue(newValue);
    if (hashKeys) {
      changeHashKeyFun && changeHashKeyFun(hashKeys[newValue]);
      const url = history.createHref({
        pathname: href[0],
        hash: hashKeys[newValue],
      });
      // windowUrl(url);
      windowReplaceUrl(url);
    }
  };

  const ref = React.useRef();
  React.useEffect(() => {
    if (tapDetails?.length === 1) {
      setValue(0);
    }
  }, [tapDetails]);
  React.useEffect(() => {
    if (href[1] && hashKeys) {
      const tabId = Math.max(hashKeys.indexOf(href[1]), 0);
      setValue(tabId);
    } else if (hashKeys) {
      const url = history.createHref({
        pathname: href[0],
        hash: hashKeys[0],
      });
      // windowUrl(url);
      windowReplaceUrl(url);
    }
    if (ref.current) {
      const timer = setTimeout(() => {
        ref.current.updateIndicator();
      }, 400);
      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <StyledBox>
        <Tabs
          value={tapDetails?.length === 1 ? 0 : value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // centered
          indicatorColor="primary"
          textColor="primary"
          action={ref}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tapDetails.map((tab, index) => {
            return (
              <Tab
                key={index}
                label={tab.tabHead}
                {...a11yProps(index)}
                iconPosition="start"
                sx={{
                  color: tab.panelFields ? "red" : "",
                }}
              />
            );
          })}
        </Tabs>
      </StyledBox>
      {tapDetails.map((i, index) => (
        <TabPanel key={index} value={value} index={index} settings={settings}>
          {i.panel}
        </TabPanel>
      ))}
    </Box>
  );
}
