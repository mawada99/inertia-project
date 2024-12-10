import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useStepperContext } from "./StepperContext";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled, useTheme } from "@mui/material";

import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";
import { Done } from "@mui/icons-material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.33929rem",
  border: `2px solid ${
    ownerState.active ? theme.palette.primary.main : theme.palette.grey[400]
  }`,
  boxShadow: ownerState.active ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none",
  backgroundColor: ownerState.completed
    ? theme.palette.success.main
    : theme.palette.background.paper,
  color: ownerState.completed && "#ffff",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, onStepClick, index, icon } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      onClick={() => onStepClick(index)}
      sx={{
        cursor: "pointer",
      }}
    >
      {icon}
    </ColorlibStepIconRoot>
  );
}

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
      {<Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default function HorizontalLinearStepper() {
  const { tapsArray, loading } = useStepperContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{ marginBlock: "16px" }}
      >
        {tapsArray.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label?.tabHead} {...stepProps}>
              <StepLabel
                {...labelProps}
                StepIconComponent={(props) => (
                  <ColorlibStepIcon
                    {...props}
                    index={index}
                    onStepClick={handleStep}
                    icon={label?.icon}
                  />
                )}
              >
                <Typography
                  sx={{
                    color: label.panelFields ? "red" : "",
                  }}
                >
                  {" "}
                  {label?.tabHead}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ mt: 2, mb: 1 }}>
          {tapsArray.map((i, index) => (
            <TabPanel key={index} value={activeStep} index={index}>
              {i.panel}
            </TabPanel>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {activeStep !== 0 && (
            <Button
              // color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="contained"
            >
              {t("back")}
            </Button>
          )}

          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== tapsArray.length - 1 && (
            <CustomButton
              onClick={handleNext}
              disabled={activeStep === tapsArray.length - 1}
              variant="contained"
              customcolor={theme.palette.success.main}
              loading={false}
            >
              {t("next")}
            </CustomButton>
          )}

          {activeStep === tapsArray.length - 1 && (
            <CustomButton
              customcolor={theme.palette.success.main}
              type="submit"
              disabled={loading}
              variant="contained"
              loading={loading}
              startIcon={!loading && <Done />}
            >
              {!loading && t("save")}
            </CustomButton>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
}
