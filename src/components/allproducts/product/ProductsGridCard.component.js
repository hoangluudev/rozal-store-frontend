import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Link,
  Typography,
  IconButton,
  Stack,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ProductDetailQuickView } from "./ProductDetailQuickView.component";
import { convertToCurrency, getDiscountPercenage } from "../../../utils/formatting";

export const ProductGridCards = ({ ProductData }) => {
  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const handleOpenModalDetail = () => setOpenModalDetail(true);
  const handleCloseModalDetail = () => setOpenModalDetail(false);
  const ProductLists = ProductData || [];

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const cardElementsSizes = {
    cardMediaHeight: isSmUp ? "16rem" : "7rem",
    titleFontSize: isSmUp ? "14px" : "12px",
    promotionPriceFsize: isSmUp ? "16px" : "12px",
    contentFontSize: "15px",
  };

  return (
    <>
      <Grid item xs={6} sm={6} md={4} lg={3}>
        <Card className="card-item h-100">
          <div className="img position-relative">
            <CardMedia
              component="img"
              className=""
              style={{ height: cardElementsSizes.cardMediaHeight }}
              image={ProductLists.imgUrl}
              alt={ProductLists.name}
            />
            <div className="text-overlay position-absolute d-flex top-0 end-0 w-100 h-100 justify-content-end align-items-end flex-column">
              <IconButton
                onClick={handleOpenModalDetail}
                className="p-2 mx-2 mb-2"
              >
                <Search fontSize="medium" />
              </IconButton>
            </div>
          </div>
          <CardContent className="card-content">
            <Typography
              variant="h6"
              fontSize={cardElementsSizes.titleFontSize}
              className="title mb-2"
            >
              <Link
                href={"/products/product-detail/" + ProductLists._id}
                className="text-decoration-none text-uppercase"
              >
                {ProductLists.name}
              </Link>
            </Typography>
            <Box>
              {ProductLists.promotionPrice !== ProductLists.buyPrice ? (
                <Stack flexDirection={"column"}>
                  <Typography
                    className="text-decoration-line-through"
                    fontSize={{ xs: "10px", sm: "12px" }}
                  >
                    {convertToCurrency(ProductLists.buyPrice)}
                  </Typography>
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <Typography
                      className="fw-bold"
                      fontSize={cardElementsSizes.promotionPriceFsize}
                    >
                      {convertToCurrency(ProductLists.promotionPrice)}
                    </Typography>
                    <Chip
                      className="fw-bold ms-2"
                      label={getDiscountPercenage(
                        ProductLists.promotionPrice,
                        ProductLists.buyPrice
                      )}
                      color="error"
                      size="small"
                      style={{
                        borderRadius: "10px",
                        fontSize: cardElementsSizes.promotionPriceFsize,
                      }}
                    />
                  </Stack>
                </Stack>
              ) : (
                <Typography
                  className="fw-bold"
                  fontSize={cardElementsSizes.promotionPriceFsize}
                >
                  {convertToCurrency(ProductLists.buyPrice)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <ProductDetailQuickView
        isOpen={openModalDetail}
        onClose={handleCloseModalDetail}
        ProductDetailData={ProductLists}
      />
    </>
  );
};
