import * as React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { windowReplaceUrl } from "../CustomFunctions/pushUrl";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
const StyledBox = styled(Paper)(({ theme }) => ({
  borderBottom: "1px solid " + theme.palette.divider,
  // backgroundColor: "white",
  display: "grid",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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

export default function CustomTabShipment(props) {
  const {
    tapDetails,
    hashKeys,
    queryName,
    tracking,
    setTabsLoading,
    setTabsData,
    TabsData,
  } = props;

  const [value, setValue] = React.useState(0);
  const [refetch, setRefetch] = React.useState(true);
  const history = useHistory();
  const href = document.location.href.split("#");
  const queryNameFun = queryName?.[href[1]]
    ? queryName?.[href[1]]?.query
    : queryName?.description.query;
  const { loading, refetch: refetchTabs } = useQuery(
    gql`
      ${queryNameFun}
    `,
    {
      partialRefetch: refetch,
      variables: {
        ...(tracking?.trackingId && { id: parseInt(tracking?.trackingId) }),
      },
      skip: Boolean(!tracking?.trackingId) || Boolean(TabsData[href[1]]),
      // notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",

      onCompleted: (data) => {
        const objectName = queryName?.[href[1]] ? [href[1]] : "description";
        setTabsData((prev) => ({
          ...prev,
          [objectName]: data,
        }));
      },
    }
  );
  React.useEffect(() => {
    setTabsLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  React.useEffect(() => {
    refetchTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabsData.refetch]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRefetch((prev) => !prev);
    if (hashKeys) {
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
        <TabPanel key={index} value={value} index={index}>
          {i.panel}
        </TabPanel>
      ))}
    </Box>
  );
}
