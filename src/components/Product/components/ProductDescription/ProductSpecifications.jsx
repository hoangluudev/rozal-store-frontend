import { Box, Typography } from "@mui/material";
import React from "react";
import { FormFieldComponent } from "../../../common/Layout";
import { BreadcrumbsComponent } from "../../../common/UI";
import { Link } from "react-router-dom";

const ProductSpecifications = ({ product, shopUrl = "#", linkTo = "#" }) => {
  const breadcrumbsList = [
    {
      title: "Shop",
      path: shopUrl,
      isDisabled: false,
    },
    {
      title: product?.category?.name ? product?.category?.name : "N/A",
      path: linkTo + product?.category?.slug,
      isDisabled: false,
    },
    {
      title: product?.productType?.name ? product?.productType?.name : "N/A",
      path: linkTo + product?.productType?.slug,
      isDisabled: false,
    },
  ];
  return (
    <Box width={"100%"}>
      <FormFieldComponent
        label="Category"
        titleProps={{
          color: "text.secondary",
          fontSize: { xs: "12px", sm: "14px" },
        }}
        isResponsive={false}
      >
        <BreadcrumbsComponent
          breadcrumbList={breadcrumbsList}
          textProps={{
            fontSize: { xs: "12px", sm: "14px" },
          }}
        />
      </FormFieldComponent>
      <FormFieldComponent
        label="Stock"
        titleProps={{
          color: "text.secondary",
          fontSize: { xs: "12px", sm: "14px" },
        }}
        isResponsive={false}
      >
        <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
          {product?.stock}
        </Typography>
      </FormFieldComponent>
      <FormFieldComponent
        label="Brand"
        titleProps={{
          color: "text.secondary",
          fontSize: { xs: "12px", sm: "14px" },
        }}
        isResponsive={false}
      >
        <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
          <Link to={linkTo + product?.brand}>{product?.brand}</Link>
        </Typography>
      </FormFieldComponent>
      <FormFieldComponent
        label="Gender"
        titleProps={{
          color: "text.secondary",
          fontSize: { xs: "12px", sm: "14px" },
        }}
        isResponsive={false}
      >
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "14px" },
            textTransform: "capitalize",
          }}
        >
          {product?.gender}
        </Typography>
      </FormFieldComponent>
    </Box>
  );
};

export default ProductSpecifications;
