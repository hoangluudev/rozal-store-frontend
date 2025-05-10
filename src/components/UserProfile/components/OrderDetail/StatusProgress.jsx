import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  useTheme,
  StepConnector,
  stepConnectorClasses,
  Stack,
} from "@mui/material";
import { styled, useMediaQuery } from "@mui/system";
import { convertToCurrency } from "../../../../utils/formatting";
import {
  LocalShipping,
  Close,
  Payments,
  ShoppingBag,
  Done,
  Star,
} from "@mui/icons-material";

const stepIcons = {
  "Order Placed": <ShoppingBag />,
  "Payment Info Confirmed": <Payments />,
  "Order Paid": <Payments />,
  "Order Shipped Out": <LocalShipping />,
  "To Received": <Done />,
  "To Rate": <Star />,
  None: <Close />,
};
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: useMediaQuery(theme.breakpoints.up("sm")) ? 20 : 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.success.light} 0%,
       ${theme.palette.success.light} 50%, ${theme.palette.success.light} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.success.light} 0%,
       ${theme.palette.success.light} 50%, ${theme.palette.success.light} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: useMediaQuery(theme.breakpoints.up("sm")) ? 3 : 2,
    border: 0,
    backgroundColor: theme.palette.grey[400],
    borderRadius: 1,
  },
}));
const CustomStepIcon = ({ icon, status, isDesktop }) => {
  const theme = useTheme();
  let borderColor = theme.palette.grey[400];
  let backgroundColor = theme.palette.common.white;
  let iconColor = theme.palette.grey[400];

  if (status === "Active") {
    iconColor = theme.palette.common.white;
    borderColor = theme.palette.success.light;
    backgroundColor = theme.palette.success.light;
  }
  if (status === "Completed") {
    iconColor = theme.palette.success.light;
    borderColor = theme.palette.success.light;
    backgroundColor = theme.palette.common.white;
  }

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        width: isDesktop ? 48 : 36,
        height: isDesktop ? 48 : 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `${isDesktop ? 3 : 2}px solid ${borderColor}`,
        borderRadius: "50%",
        backgroundColor: backgroundColor,
      }}
    >
      {React.cloneElement(icon, {
        style: {
          color: iconColor,
          fontSize: isDesktop ? 24 : 16,
        },
      })}
    </Box>
  );
};

const StatusProgress = ({ options = [], orderAmount = 0 }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Stepper alternativeLabel connector={<ColorlibConnector theme={theme} />}>
        {options.map((step) => (
          <Step key={step._id} active={step.status === "Active"}>
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  icon={stepIcons[step.label] || stepIcons.None}
                  status={step.status}
                  isDesktop={isDesktop}
                />
              )}
            >
              <Stack flexDirection="column">
                <Typography
                  fontSize={{ xs: "10px", sm: "12px" }}
                  sx={{ color: "black", textWrap: "nowrap" }}
                >
                  {step.label}
                  {step.label === "Order Paid" &&
                    ` (${convertToCurrency(orderAmount)})`}
                </Typography>
                {step.updatedAt && (
                  <Typography
                    color="textSecondary"
                    fontSize={{ xs: "9px", sm: "10px" }}
                  >
                    {step.updatedAt}
                  </Typography>
                )}
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StatusProgress;
