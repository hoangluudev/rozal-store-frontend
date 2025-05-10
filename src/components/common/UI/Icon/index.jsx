import React from "react";
import { Avatar, styled } from "@mui/material";

const IconFrame = styled(Avatar)(({ theme }) => ({
  width: 45,
  height: 45,
  [theme.breakpoints.up("sm")]: {
    width: 50,
    height: 50,
  },
}));

const ResponsiveIcon = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  [theme.breakpoints.up("sm")]: {
    width: 30,
    height: 30,
  },
}));

const IconComponent = ({ image, iconframeprops, ...props }) => {
  return (
    <IconFrame {...iconframeprops}>
      {image ? (
        <ResponsiveIcon src={image} variant="rounded" {...props} />
      ) : (
        <>N/A</>
      )}
    </IconFrame>
  );
};

export default IconComponent;
