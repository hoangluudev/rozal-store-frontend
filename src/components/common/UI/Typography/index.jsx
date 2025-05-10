import React from "react";
import { Typography, styled } from "@mui/material";

const StyledTypography = styled(Typography)(
  ({ theme, xs, sm, md, lg, xl }) => ({
    fontSize: xs || "0.8rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: sm || xs || "0.925rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: md || sm || xs || "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: lg || md || sm || xs || "1.05rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: xl || lg || md || sm || xs || "1.1rem",
    },
  })
);

const TypographyComponent = ({ xs, sm, md, lg, xl, children, ...props }) => {
  return (
    <StyledTypography xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...props}>
      {children}
    </StyledTypography>
  );
};
export default TypographyComponent;
