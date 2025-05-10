import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Stack,
  StepConnector,
} from "@mui/material";

const DotStepIcon = ({ latestItem = false }) => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: latestItem ? "primary.light" : "#bdbdbd",
    }}
  />
);

const CustomStepConnector = () => (
  <StepConnector
    sx={{
      ml: "3px",
      "& .MuiStepConnector-line": {
        borderColor: "#bdbdbd",
        borderWidth: 1,
        minHeight: 16,
      },
    }}
  />
);

const ShippingProgressTimeline = ({ data = [], maxItem = 5 }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const reversedData = [...data].reverse();
  const visibleProgressData = expanded
    ? reversedData
    : reversedData.slice(0, maxItem);

  return (
    <Box>
      <Stepper
        orientation="vertical"
        sx={{ alignItems: "flex-start" }}
        connector={<CustomStepConnector />}
      >
        {visibleProgressData.map((item, index) => (
          <Step key={index} active>
            <StepLabel
              StepIconComponent={() => <DotStepIcon latestItem={index === 0} />}
            >
              <Stack flexDirection="row" columnGap={2}>
                <Typography
                  sx={{
                    fontSize: { xs: "10px", sm: "12px" },
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.createdAt}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "10px", sm: "12px" },
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {reversedData.length > 6 && (
        <Stack
          flexDirection="row"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="text"
            sx={{
              mt: 1,
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: { xs: "10px", sm: "12px" },
            }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See Less" : "See More"}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default ShippingProgressTimeline;
