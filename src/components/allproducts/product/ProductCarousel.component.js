import * as React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { LoadingElementComponent } from "../../misc/LoadingElement.component";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductDetailQuickView } from "./ProductDetailQuickView.component";
import {
  convertToCurrency,
  getDiscountPercenage,
} from "../../../utils/formatting";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 1440, min: 768 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobileandtablet: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const MutliProductsCarousel = ({ productData }) => {
  const productLists = productData || [];

  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(false);
  const handleOpenModalDetail = (data) => {
    setSelectedProduct(data);
    setOpenModalDetail(true);
  };
  const handleCloseModalDetail = () => setOpenModalDetail(false);

  return (
    <>
      {productLists.length > 0 ? (
        <Carousel responsive={responsive} itemClass="px-2 my-3">
          {productLists.map((item) => {
            return (
              <Card key={item._id} className="card-item h-100">
                <div className="img position-relative">
                  <CardMedia
                    component="img"
                    style={{ height: "16rem" }}
                    image={item.imgUrl}
                    alt={item.name}
                  />
                  <div className="text-overlay position-absolute d-flex top-0 end-0 w-100 h-100 justify-content-end align-items-end flex-column">
                    <IconButton
                      onClick={() => handleOpenModalDetail(item)}
                      className="p-2 mx-2 mb-2"
                    >
                      <Search fontSize="medium" />
                    </IconButton>
                  </div>
                </div>
                <CardContent className="card-content">
                  <Typography
                    variant="h6"
                    fontSize={{ xs: "12px", lg: "14px" }}
                    className="title mb-2"
                  >
                    <Link
                      to={"/products/product-detail/" + item._id}
                      style={{
                        textDecoration: "none",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Link>
                  </Typography>
                  <Box fontSize={"15px"}>
                    {item.promotionPrice !== item.buyPrice ? (
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Stack flexDirection={"row"} alignItems={"center"}>
                          <Typography className="fw-bold">
                            {convertToCurrency(item.promotionPrice)}
                          </Typography>
                          <Chip
                            className="fw-bold ms-2"
                            label={getDiscountPercenage(
                              item.promotionPrice,
                              item.buyPrice
                            )}
                            color="error"
                            size="small"
                            style={{ borderRadius: "10px" }}
                          />
                        </Stack>

                        <Typography className="text-decoration-line-through">
                          {convertToCurrency(item.buyPrice)}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography className="fw-bold">
                        {convertToCurrency(item.buyPrice)}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Carousel>
      ) : (
        <LoadingElementComponent />
      )}
      <ProductDetailQuickView
        isOpen={openModalDetail}
        onClose={handleCloseModalDetail}
        ProductDetailData={selectedProduct}
      />
    </>
  );
};
