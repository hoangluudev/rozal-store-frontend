import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ProductDetailQuickView } from "./ProductDetailQuickView.component";
import {
  convertToCurrency,
  getDiscountPercenage,
} from "../../../utils/formatting";
import { Link } from "react-router-dom";

export const ProductListView = ({ ProductData }) => {
  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const handleOpenModalDetail = () => setOpenModalDetail(true);
  const handleCloseModalDetail = () => setOpenModalDetail(false);
  const ProductLists = ProductData || [];

  return (
    <>
      <Grid item xs={12}>
        <Card
          className="card-item h-100"
          style={{ display: "flex", flexDirection: "row", padding: "1rem" }}
        >
          <div className="img position-relative" style={{ flex: "0 0 80px" }}>
            <CardMedia
              component="img"
              style={{ height: "80px", width: "80px" }}
              image={ProductLists.imgUrl}
              alt={ProductLists.name}
            />
            <div className="text-overlay position-absolute d-flex top-0 end-0 w-100 h-100 justify-content-center align-items-center flex-column">
              <IconButton
                onClick={handleOpenModalDetail}
                className="p-2 mx-2 mb-2"
              >
                <Search fontSize="medium" />
              </IconButton>
            </div>
          </div>
          <CardContent
            className="card-content"
            style={{
              flex: "1",
              padding: "0 1rem",
            }}
          >
            <Typography variant="h6" fontSize={"14px"} className="title mb-2">
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
                    <Typography className="fw-bold">
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
                      style={{ borderRadius: "10px" }}
                    />
                  </Stack>
                </Stack>
              ) : (
                <Typography className="fw-bold">
                  {convertToCurrency(ProductLists.buyPrice)}
                </Typography>
              )}
            </Box>
            <Stack direction="row" flexWrap={"wrap"} gap={1} mt={1}>
              {ProductLists.size &&
                ProductLists.size.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    size="small"
                    sx={{ fontSize: "10px" }}
                  />
                ))}
            </Stack>
            <Stack direction="row" flexWrap={"wrap"} gap={1} mt={1}>
              {ProductLists.color &&
                ProductLists.color.map((color) => (
                  <Chip
                    key={color}
                    label={
                      color.length > 20 ? color.substring(0, 20) + "..." : color
                    }
                    size="small"
                    sx={{ fontSize: "10px" }}
                  />
                ))}
            </Stack>
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
