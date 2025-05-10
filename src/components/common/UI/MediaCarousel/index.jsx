import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import CarouselCardMedia from "./CardMedia";

const MediaCarousel = ({ images = [], imageProps }) => {
  const [isShowArrow, setIsShowArrow] = React.useState(false);

  const handleShowArrow = (e) => {
    e.preventDefault();
    setIsShowArrow(true);
  };
  const handleHideArrow = (e) => {
    e.preventDefault();
    setIsShowArrow(false);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Box
      onMouseEnter={(e) => handleShowArrow(e)}
      onMouseLeave={(e) => handleHideArrow(e)}
    >
      <Carousel
        responsive={responsive}
        swipeable={true}
        arrows={isShowArrow}
        showDots={images.length > 1 ? true : false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {images.length > 0 ? (
          images.map((item, index) => (
            <CarouselCardMedia key={index} image={item} {...imageProps} />
          ))
        ) : (
          <CarouselCardMedia />
        )}
      </Carousel>
    </Box>
  );
};

export default MediaCarousel;
