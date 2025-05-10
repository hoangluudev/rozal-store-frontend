import { Box } from "@mui/material";
import React from "react";
import { AccordionComponent } from "../../common/UI";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductSpecifications from "../components/ProductDescription/ProductSpecifications";
import ProductTags from "../components/ProductDescription/ProductTags";

const ProductDescriptionInfo = ({
  product,
  shopUrl = "#",
  browseUrl = "#",
}) => {
  return (
    <Box width={"100%"}>
      <AccordionComponent title="Product Specifications" defaultExpanded={true}>
        <ProductSpecifications
          product={product}
          shopUrl={shopUrl}
          linkTo={browseUrl}
        />
      </AccordionComponent>
      <AccordionComponent title="Product Descriptions" defaultExpanded={true}>
        <ProductDescription product={product} />
      </AccordionComponent>
      <AccordionComponent title="Tags" defaultExpanded={true}>
        <ProductTags product={product} linkTo={browseUrl} />
      </AccordionComponent>
    </Box>
  );
};

export default ProductDescriptionInfo;
