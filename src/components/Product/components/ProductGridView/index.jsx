import { Box, Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { LoadingElementComponent } from "../../../misc/LoadingElement.component";
import { ProductNotFoundComponent } from "../../../misc/NoProductFound.component";

const ProductGridView = ({
  productData = [],
  productDetailUrl = "",
  pending = true,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {pending === true ? (
        <LoadingElementComponent />
      ) : productData.length === 0 ? (
        <ProductNotFoundComponent />
      ) : (
        <Grid container spacing={2}>
          {productData.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              <ProductCard
                productData={item}
                productDetailUrl={productDetailUrl}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductGridView;
