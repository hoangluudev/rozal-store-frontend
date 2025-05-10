import React from "react";
import { Box, Grid } from "@mui/material";
import { ButtonComponent } from "../../common/UI";

const VariantRadioButton = ({ value = "", onChange = null, options = [] }) => {
  const [hoveredOption, setHoveredOption] = React.useState("");

  const handleSelection = (newValue) => {
    if (newValue === value) {
      onChange("");
    } else {
      onChange(newValue);
    }
  };

  const handleButtonHover = (action, optionValue) => {
    if (action === "enter") {
      setHoveredOption(optionValue);
    } else if (action === "leave") {
      setHoveredOption("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Grid container spacing={1}>
        {options.map((option, index) => (
          <Grid item key={index}>
            <ButtonComponent
              size="small"
              variant={value === option.value ? "contained" : "outlined"}
              color={
                value === option.value ||
                (hoveredOption === option.value && value !== option.value)
                  ? "primary"
                  : "inherit"
              }
              onClick={() => handleSelection(option.value)}
              disabled={option.disabled}
              tooltip={option.disabled_reason}
              disabledMessage={option.disabled_reason}
              sx={{
                fontWeight: 600,
              }}
              onMouseEnter={() => handleButtonHover("enter", option.value)}
              onMouseLeave={() => handleButtonHover("leave", option.value)}
            >
              {option.value}
            </ButtonComponent>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VariantRadioButton;
