import * as React from "react";
import { useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

function ScrollHandler(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: "#fff",
      color: "black",
      position: trigger ? "fixed" : "static",
      top: trigger ? "70px" : "auto",
      transition: trigger ? "0.3s ease" : "0.5s ease",
      padding: trigger ? "0 1rem" : "0",
      display: trigger ? "grid" : "block",
      overflowX: "auto",
    },
  });
}

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const ProductElevationScroll = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ProductElevationScroll;
