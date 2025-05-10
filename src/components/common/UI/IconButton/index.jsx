import React from "react";
import { BookmarkBorderOutlined } from "@mui/icons-material";
import { Badge, IconButton, styled, Tooltip } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme, color, hovercolor }) => ({
  color: color || theme.palette.action.active,
  "&:hover": {
    color:
      hovercolor === "primary"
        ? theme.palette.primary.main
        : hovercolor === "success"
        ? theme.palette.success.main
        : hovercolor === "error"
        ? theme.palette.error.main
        : hovercolor === "warning"
        ? theme.palette.warning.main
        : hovercolor === "action"
        ? theme.palette.action.main
        : hovercolor,
  },
}));

const IconButtonComponent = ({
  color = "inherit",
  hoverColor = "success",
  icon,
  size = "medium",
  tooltipTitle = "",
  hasBadge = false,
  badgeVariant = "standard",
  badgeColor = "default",
  badgeContent = 0,
  showBadgeZero = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <StyledIconButton
          color={color}
          size={size}
          hovercolor={hoverColor}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          <Badge
            color={badgeColor}
            variant={badgeVariant}
            badgeContent={badgeVariant === "standard" ? badgeContent : null}
            invisible={!hasBadge}
            showZero={showBadgeZero}
          >
            {icon ? (
              icon
            ) : (
              <BookmarkBorderOutlined color={color} fontSize={size} />
            )}
          </Badge>
        </StyledIconButton>
      </span>
    </Tooltip>
  );
};
export default IconButtonComponent;
