import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import TypographyComponent from "../../../common/UI/Typography";
import { Link, useParams } from "react-router-dom";

import ProductDetailComponent from "./ProductDetail.component";
import ProductVariantComponent from "./ProductVariants.component";
import { useProductManagementApi } from "../../../../hooks/api";

const ViewProductDetail = () => {
  const { productId } = useParams();
  const { fetchProductByID, fetchProductOptions } = useProductManagementApi();
  const { selectedProductData } = useProductManagementApi().state;

  React.useEffect(() => {
    fetchProductByID(productId);
  }, [fetchProductByID, productId]);
  React.useEffect(() => {
    fetchProductOptions();
  }, [fetchProductOptions]);
  return (
    <Box>
      <Stack flexDirection={"row"} alignItems={"center"} mb={3}>
        <IconButton
          component={Link}
          to={"/admin-panel/product-alpha"}
          style={{ border: "1px solid grey", marginRight: "5px" }}
        >
          <ArrowBackIosNew />
        </IconButton>
        <TypographyComponent
          xs={"1rem"}
          lg={"1.2rem"}
          sx={{
            fontWeight: 700,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          maxWidth={{ xs: "180px", sm: "300px" }}
        >
          Product Detail
        </TypographyComponent>
      </Stack>
      <Stack flexDirection={"column"} rowGap={3}>
        <ProductDetailComponent selectedProduct={selectedProductData} />
        <ProductVariantComponent variations={selectedProductData.variations} />
      </Stack>
    </Box>
  );
};

export default ViewProductDetail;
