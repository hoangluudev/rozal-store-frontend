import * as React from "react";
import { useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function ScrollHandler(props) {
  const { children, window } = props;
  const currentPath = useLocation().pathname;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger
        ? "#232223"
        : currentPath === "/"
        ? "transparent"
        : "#232223",
      position: currentPath === "/" ? "fixed" : trigger ? "fixed" : "static",
      transition: trigger ? "0.3s" : "0.5s",
      padding: trigger ? "0.3rem 0" : "0",
      boxShadow: "none",
      borderBottom: trigger ? "#2b3439" : "1px solid rgba(87, 101, 106, 0.8)",
    },
  });
}

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const ElevationScroll = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ElevationScroll;
