import { Box } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import ProductCard from "./ProductGridView/ProductCard";
import { ProductNotFoundComponent } from "../../misc/NoProductFound.component";

const RelatedProducts = ({ productList = [], productDetailUrl = "" }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 1440, min: 768 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 3,
      slidesToSlide: 3,
    },
    mediumMobile: {
      breakpoint: { max: 425, min: 320 },
      items: 2,
      slidesToSlide: 2,
    },
    smallMobile: {
      breakpoint: { max: 320, min: 0 },
      items: 1,
    },
  };
  return (
    <Box width={"100%"}>
      {productList.length === 0 ? (
        <ProductNotFoundComponent />
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          arrows={true}
          itemClass="px-2 my-3"
        >
          {productList.length > 0 ? (
            productList.map((item, index) => (
              <ProductCard
                key={index}
                productData={item}
                productDetailUrl={productDetailUrl}
              />
            ))
          ) : (
            <></>
          )}
        </Carousel>
      )}
    </Box>
  );
};

export default RelatedProducts;
