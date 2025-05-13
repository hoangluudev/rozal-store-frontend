import React from "react";
import { Typography, Link as LinkMUI } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import LatestProduct from "./products/latestproducts";
import { Link } from "react-router-dom";

const LatestProductSection = () => {
  return (
    <div className="latest-section">
      <div className="container px-md-5 py-5">
        <div className="title mb-5">
          <Typography
            variant="h2"
            fontSize={"2rem"}
            className="fw-bold text-uppercase text-center"
          >
            Latest Product
          </Typography>
          <Typography
            variant="body1"
            className="d-flex justify-content-end mb-0"
          >
            <LinkMUI
              component={Link}
              to="/products"
              sx={{
                display: "flex",
                alignItems: "flex-end",
                textDecoration: "none",
              }}
            >
              <span>View all</span>
              <KeyboardDoubleArrowRight fontSize="medium" />
            </LinkMUI>
          </Typography>
        </div>
        <div className="products">
          <LatestProduct />
        </div>
      </div>
    </div>
  );
};

export default LatestProductSection;
