import { styled } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import React from "react";

const CustomizedLink = styled(MuiLink)(
  ({ theme, color, hovercolor, underline }) => ({
    textDecoration: "none",
    color:
      color === "primary"
        ? theme.palette.primary.main
        : color === "success"
        ? theme.palette.success.main
        : color === "error"
        ? theme.palette.error.main
        : "inherit",
    "&:hover": {
      textDecoration: underline === "hover" ? "underline" : "none",
      color:
        hovercolor === "primary"
          ? theme.palette.primary.main
          : hovercolor === "success"
          ? theme.palette.success.main
          : hovercolor === "error"
          ? theme.palette.error.main
          : "inherit",
    },
    fontWeight: 700,
    display: "inline-block",
  })
);

const LinkComponent = ({
  children,
  to,
  color,
  hoverColor,
  underline = "none",
  ...props
}) => {
  return (
    <CustomizedLink
      href={to}
      color={color}
      hovercolor={hoverColor}
      underline={underline}
      {...props}
    >
      {children ? children : "N/A"}
    </CustomizedLink>
  );
};
export default LinkComponent;
