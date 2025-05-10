import { Button, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import useToast from "../../../../hooks/useNotifications";

const ButtonComponent = ({
  size = "medium",
  variant = "contained",
  color = "primary",
  tooltip = "",
  onClick = null,
  onDisabledClick = null,
  disabled = false,
  hidden = false,
  disabledMessage = "",
  children,
  sx = {},
  ...props
}) => {
  const { sendMsgInfo } = useToast();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleClick = () => {
    if (disabled && onDisabledClick) {
      onDisabledClick();
    }
    if (!isDesktop && disabledMessage && disabled) {
      sendMsgInfo(disabledMessage);
    }
  };

  return (
    <Tooltip title={tooltip} placement="top">
      <span onClick={handleClick}>
        <Button
          size={size}
          variant={variant}
          color={color}
          disabled={disabled}
          onClick={onClick}
          hidden={hidden}
          sx={sx}
          {...props}
        >
          {children ? children : ""}
        </Button>
      </span>
    </Tooltip>
  );
};

export default ButtonComponent;
