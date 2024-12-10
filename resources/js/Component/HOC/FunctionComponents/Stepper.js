import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import {
  Done,
  LocalShippingOutlined,
  PriorityHighSharp,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const ColorlibConnector = styled(StepConnector)(({ theme, ownerState }) => ({
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

const StyledStepIcon = styled("div")(({ theme, ownerState }) => ({
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
  const theme = useTheme();
  const { active, completed, error, icon } = props;

  const icons = {
    1: (
      <LocalShippingOutlined
        sx={{ ...(theme.direction === "rtl" && { transform: "scaleX(-1)" }) }}
      />
    ),
    3: <PriorityHighSharp />,
    4: <Done sx={{ fontSize: "1.9rem" }} />,
  };

  return (
    <StyledStepIcon ownerState={{ active, completed, error }}>
      {error
        ? icons[String(3)]
        : icon === 4 && active
        ? icons[String(4)]
        : active
        ? icons[String(1)]
        : completed
        ? icons[String(4)]
        : icon}
    </StyledStepIcon>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,

  completed: PropTypes.bool,

  icon: PropTypes.node,
};

const PREFIX = "CustomizedSteppers";

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
  instructions: `${PREFIX}-instructions`,
};

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  // "& .MuiStepLabel-label.Mui-active": {
  //   paddingTop: "30px",
  // },
  [`& .${classes.button}`]: {
    marginRight: theme.spacing(1),
  },
  [`& .${classes.instructions}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CustomizedSteppers(props) {
  const { statusCode, step1, type } = props;
  const [activeStep, setActiveStep] = React.useState(-1);
  const { t } = useTranslation();

  const steps = useRef(step1.current);

  const stepRequest = (code) => {
    switch (code) {
      case "RQST": // Booking request
        setActiveStep(0);
        break;
      case "RCVD": // Received
        setActiveStep(1);
        break;
      case "PCKD": // Packed
        setActiveStep(2);
        break;
      case "LOADING": // Loading
        setActiveStep(3);
        break;
      case "TRANSPORTING":
        // Arrived (assuming this status)
        setActiveStep(4);
        break;
      case "ARRIVED": // Unloaded (assuming this status)
        setActiveStep(5);
        break;
      case "UNLOADED": // Delivered (assuming this status)
        setActiveStep(6);
        break;
      case "DELIVERED": // Delivered (assuming this status)
        setActiveStep(7);
        break;
      default:
    }
  };
  const stepShipment = (code) => {
    switch (code) {
      case "BOOKING":
        setActiveStep(0);
        break;
      case "SCHEDULED":
        setActiveStep(1);
        break;
      case "LOADING": // Packed
        setActiveStep(2);
        break;
      case "TRANSPORTING": // Packed
        setActiveStep(3);
        break;
      case "ARRIVED":
        // Arrived (assuming this status)
        setActiveStep(4);
        break;
      case "UNLOADED": // Unloaded (assuming this status)
        setActiveStep(5);
        break;
      case "DELIVERED": // Delivered (assuming this status)
        setActiveStep(6);
        break;
      default:
    }
  };
  useEffect(() => {
    if (type === "request") {
      stepRequest(statusCode);
    } else if (type === "shipment") {
      stepShipment(statusCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode]);

  return (
    <Root>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.current?.map((label, index) => {
          const rejectedShip =
            label === t("rejected") || label === t("cancelled");
          const stepProps = {};
          const labelProps = {};
          if (rejectedShip) {
            labelProps.error = true;
            stepProps.completed = true;
            // stepProps.active = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>
                <Typography>{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Root>
  );
}
