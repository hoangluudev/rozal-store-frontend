import React from "react";
import { Paper, styled } from "@mui/material";

const customLightColors = {
  primary: "#e3f2fd",
  secondary: "#fce4ec",
  error: "#ffebee",
  warning: "#fff3e0",
  info: "#e1f5fe",
  success: "#e8f5e9",
  action: "#f5f5f5",
};

const colorPaletteMapping = (theme, color) => {
  switch (color) {
    case "primary":
      return customLightColors.primary;
    case "secondary":
      return customLightColors.secondary;
    case "error":
      return customLightColors.error;
    case "warning":
      return customLightColors.warning;
    case "info":
      return customLightColors.info;
    case "success":
      return customLightColors.success;
    case "action":
      return customLightColors.action;
    default:
      return color || theme.palette.background.default;
  }
};

const ColoredPaper = styled(Paper)(({ theme, color, spacing }) => ({
  backgroundColor: colorPaletteMapping(theme, color),
  padding: theme.spacing(spacing),
  borderRadius: theme.shape.borderRadius,
}));

const PaperComponent = ({
  color,
  elevation = 0,
  spacing = 0,
  children,
  ...rest
}) => {
  return (
    <ColoredPaper
      color={color}
      elevation={elevation}
      spacing={spacing}
      {...rest}
    >
      {children}
    </ColoredPaper>
  );
};

export default PaperComponent;
