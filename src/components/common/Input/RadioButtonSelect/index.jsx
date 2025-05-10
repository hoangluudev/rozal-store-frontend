import React from "react";
import { Box, Grid } from "@mui/material";
import { ButtonComponent } from "../../UI";

const RadioButtonSelect = ({
  value = "",
  onChange = null,
  options = [],
  buttonColor = "primary",
  labelPropName = "label",
  valuePropName = "value",
  isArrayString = false,
  ButtonProps = {},
}) => {
  const [hoveredOption, setHoveredOption] = React.useState("");
  const handleButtonHover = (action, optionValue) => {
    if (action === "enter") {
      setHoveredOption(optionValue);
    } else if (action === "leave") {
      setHoveredOption("");
    }
  };
  const handleSelection = (newValue) => {
    if (newValue === value) {
      onChange("");
    } else {
      onChange(newValue);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Grid container spacing={1}>
        {isArrayString
          ? options.map((option, index) => (
              <Grid item key={index}>
                <ButtonComponent
                  size="small"
                  variant={value === option ? "contained" : "outlined"}
                  color={
                    value === option ||
                    (hoveredOption === option && value !== option)
                      ? buttonColor
                      : "inherit"
                  }
                  onClick={() => handleSelection(option)}
                  onMouseEnter={() => handleButtonHover("enter", option)}
                  onMouseLeave={() => handleButtonHover("leave", option)}
                  sx={{
                    fontWeight: 600,
                    ...ButtonProps,
                  }}
                >
                  {option}
                </ButtonComponent>
              </Grid>
            ))
          : options.map((option, index) => (
              <Grid item key={index}>
                <ButtonComponent
                  size="small"
                  variant={
                    value === option[valuePropName] ? "contained" : "outlined"
                  }
                  color={
                    value === option[valuePropName] ||
                    (hoveredOption === option[valuePropName] &&
                      value !== option[valuePropName])
                      ? buttonColor
                      : "inherit"
                  }
                  onClick={() => handleSelection(option[valuePropName])}
                  onMouseEnter={() =>
                    handleButtonHover("enter", option[valuePropName])
                  }
                  onMouseLeave={() =>
                    handleButtonHover("leave", option[valuePropName])
                  }
                  sx={{
                    fontWeight: 600,
                    ...ButtonProps,
                  }}
                >
                  {option[labelPropName]}
                </ButtonComponent>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default RadioButtonSelect;
