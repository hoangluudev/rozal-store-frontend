import React from "react";
import { Typography, Link } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import FeaturedProduct from "./products/featuredproducts";

const FeaturedProductSection = () => {
  return (
    <div className="popular-section">
      <div className="container px-md-5 py-5">
        <div className="title mb-5">
          <Typography
            variant="h2"
            fontSize={"2rem"}
            className="fw-bold text-uppercase text-center"
          >
            Featured Product
          </Typography>
          <Typography
            variant="body1"
            className="d-flex justify-content-end mb-0"
          >
            <Link
              href="/products"
              className="d-flex align-items-end text-decoration-none"
            >
              <span>View all</span>
              <KeyboardDoubleArrowRight fontSize="medium" />
            </Link>
          </Typography>
        </div>
        <div className="products">
          <FeaturedProduct />
        </div>
      </div>
    </div>
  );
};
export default FeaturedProductSection;
