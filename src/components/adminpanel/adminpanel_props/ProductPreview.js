import * as React from "react";
import {
  Grid,
  Stack,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,
  Box,
  Tooltip,
  Skeleton,
  Chip,
} from "@mui/material";
import { ProductDetailSize } from "../product_modal/props/modalProps/size.component";
import { ProductDetailColor } from "../product_modal/props/modalProps/color.component";
import {
  ShoppingCartOutlined,
  FavoriteBorder,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { DescriptionNavtabs } from "../../productdetail/DescriptionNavTabs.component";
import { convertToCurrency } from "../../../utils/formatting";

export const ProductPreview = ({ ProductDetailData }) => {
  const gProductDetail = ProductDetailData ? ProductDetailData : {};
  return (
    <Box style={{ background: "#f2f2f2", marginTop: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", textTransform: "uppercase" }}
          >
            Preview
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box style={{ padding: "1rem" }}>
            {gProductDetail.imgUrl ? (
              <CardMedia
                component="img"
                image={gProductDetail.imgUrl}
                alt={gProductDetail.name}
              />
            ) : (
              <Skeleton variant="rectangular" width={"100%"} height={200} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Typography
            fontSize={{ xs: "1.2rem", sm: "1.5rem", md: "2rem", lg: "2.2rem" }}
            className="fw-bold text-uppercase mb-3"
            variant="h5"
          >
            {gProductDetail.name}
          </Typography>
          {gProductDetail.buyPrice ? (
            gProductDetail.promotionPrice &&
            gProductDetail.buyPrice !== gProductDetail.promotionPrice ? (
              <>
                <Typography
                  fontSize={{ xs: "1.2rem", md: "2rem", lg: "2.5rem" }}
                  className="fw-bold"
                >
                  {convertToCurrency(gProductDetail.promotionPrice)}
                </Typography>
                <Typography
                  fontSize={{ xs: "0.7rem", md: "1rem" }}
                  className="text-decoration-line-through text-secondary mb-3"
                >
                  {convertToCurrency(gProductDetail.buyPrice)}
                </Typography>
              </>
            ) : (
              <Typography
                fontSize={{ xs: "1.2rem", md: "2rem", lg: "2.5rem" }}
                className="fw-bold"
              >
                {convertToCurrency(gProductDetail.buyPrice)}
              </Typography>
            )
          ) : (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={30}
              style={{ margin: "0.5rem 0" }}
            />
          )}

          {gProductDetail.size && gProductDetail.size.length > 0 ? (
            <ProductDetailSize ProductSize={gProductDetail.size} />
          ) : (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={30}
              style={{ margin: "0.5rem 0" }}
            />
          )}
          {gProductDetail.color && gProductDetail.color.length > 0 ? (
            <ProductDetailColor ProductColor={gProductDetail.color} />
          ) : (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={30}
              style={{ margin: "0.5rem 0" }}
            />
          )}

          {gProductDetail && gProductDetail.stockQuantity ? (
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography
                className="text-secondary fw-bold me-2"
                style={{ fontSize: "14px" }}
              >
                Stock:
              </Typography>
              <Typography variant="body2" component={"div"}>
                {gProductDetail && gProductDetail.stockStatus ? (
                  gProductDetail.stockStatus === "In Stock" ? (
                    <Chip
                      color={"success"}
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "5px",
                      }}
                      label={gProductDetail.stockStatus || ""}
                    />
                  ) : gProductDetail.stockStatus === "Out Of Stock" ? (
                    <Chip
                      color={"error"}
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "5px",
                      }}
                      label={gProductDetail.stockStatus || ""}
                    />
                  ) : (
                    <Chip
                      color={"warning"}
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "5px",
                      }}
                      label={gProductDetail.stockStatus || ""}
                    />
                  )
                ) : (
                  <></>
                )}
              </Typography>
            </Stack>
          ) : (
            <Skeleton
              variant="rectangular"
              width={60}
              height={30}
              style={{ margin: "0.5rem 0" }}
            />
          )}
          {gProductDetail && gProductDetail.stockStatus === "Low On Stock" ? (
            <Typography fontSize={"12px"} color={"error"}>
              {"*only "}
              <Typography
                fontSize={"16px"}
                fontWeight={600}
                color={"error"}
                component={"span"}
              >
                {gProductDetail.stockQuantity}
              </Typography>

              {" units left in stock"}
            </Typography>
          ) : (
            <></>
          )}
          <Box className="my-3">
            <ButtonGroup
              size="small"
              color="inherit"
              aria-label="Medium-sized button group"
            >
              <Button>
                <RemoveIcon />
              </Button>
              <Tooltip title="Click to reset">
                <Button className="fw-bold">{1}</Button>
              </Tooltip>
              <Button>
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Box>
          <Grid container gap={2} className="mt-3">
            <Grid item xs={12} md={12} lg={12}>
              <Button
                className="w-100 py-2"
                variant="contained"
                color={"primary"}
              >
                <ShoppingCartOutlined /> Add to Cart
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                className="w-100 py-2"
                variant="contained"
                color="primary"
              >
                <FavoriteBorder />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DescriptionNavtabs ProductDetail={gProductDetail} />
        </Grid>
      </Grid>
    </Box>
  );
};
