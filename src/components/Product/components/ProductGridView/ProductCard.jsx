import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";
import {
  CardMediaComponent,
  IconButtonComponent,
  LinkComponent,
  TypographyComponent,
} from "../../../common/UI";
import {
  convertToCurrency,
  formatRateScore,
  isEmptyObj,
  numberShorteningFormat,
} from "../../../../utils/formatting";
import { FavoriteBorder, Star } from "@mui/icons-material";
import ProductQuickView from "../ProductQuickView";

const ProductCard = ({ productData, productDetailUrl = "" }) => {
  const [displayOverlay, setDisplayOverlay] = React.useState(false);

  const handleShowOverlay = () => {
    setDisplayOverlay(true);
  };

  const handleHideOverlay = () => {
    setDisplayOverlay(false);
  };

  return (
    <React.Fragment>
      {!isEmptyObj(productData) ? (
        <Card
          sx={{
            maxWidth: 345,
            height: "100%",
            position: "relative",
            "&:hover": {
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            },
          }}
        >
          <Box
            style={{ position: "relative" }}
            onMouseEnter={handleShowOverlay}
            onMouseLeave={handleHideOverlay}
          >
            <CardMediaComponent
              image={productData?.avatarImage}
              title={productData?.name}
              sx={{ height: { xs: 100, sm: 160, md: 180 } }}
            />
            <Box
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: displayOverlay ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                transition: "0.3s ease",
              }}
            >
              <ProductQuickView
                product={productData}
                productDetailUrl={productDetailUrl}
                handleHideOverlay={handleHideOverlay}
              />
            </Box>
            {productData.isOnSale && (
              <Chip
                label={"-" + productData?.prices?.discount + "%"}
                variant="filled"
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  fontWeight: 500,
                }}
              />
            )}
            <IconButtonComponent
              icon={<FavoriteBorder />}
              hoverColor="error"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
          </Box>
          <CardContent
            sx={{
              padding: "8px",
              "&:last-child": {
                paddingBottom: "8px",
              },
            }}
          >
            <LinkComponent
              to={productDetailUrl + productData.productCode}
              underline="hover"
            >
              <TypographyComponent
                xs={"0.9rem"}
                sm={"1rem"}
                sx={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { xs: "180px", sm: "300px" },
                }}
              >
                {productData.name}
              </TypographyComponent>
            </LinkComponent>
            {productData.isOnSale ? (
              <Grid container alignItems={"center"} columnGap={1}>
                <Grid item xs={12} sm={"auto"}>
                  <TypographyComponent
                    style={{ fontWeight: 700 }}
                    xs="0.9rem"
                    sm="1rem"
                  >
                    {convertToCurrency(productData?.prices?.price)}
                  </TypographyComponent>
                </Grid>
                <Grid item xs={12} sm={"auto"}>
                  <TypographyComponent
                    color="text.secondary"
                    style={{ textDecoration: "line-through" }}
                    xs="0.7rem"
                    sm="0.8rem"
                  >
                    {convertToCurrency(productData?.prices?.comparePrice)}
                  </TypographyComponent>
                </Grid>
              </Grid>
            ) : (
              <TypographyComponent
                style={{ fontWeight: 700 }}
                xs="0.8rem"
                sm="0.9rem"
              >
                {convertToCurrency(productData?.prices?.price)}
              </TypographyComponent>
            )}
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Stack flexDirection="row" alignItems="center">
                {productData?.rate?.count !== 0 ? (
                  <Stack flexDirection="row" alignItems="center">
                    <Typography
                      fontSize="12px"
                      fontWeight={700}
                      color="#ff9100"
                    >
                      {formatRateScore(productData?.rate?.score)}
                    </Typography>
                    <Star sx={{ color: "#ff9100", fontSize: "12px" }} />
                  </Stack>
                ) : (
                  <div style={{ width: "60px" }}></div>
                )}
              </Stack>
              {productData?.sale !== 0 ? (
                <TypographyComponent
                  xs="0.6rem"
                  sm="0.7rem"
                  style={{ fontWeight: 600 }}
                >
                  {numberShorteningFormat(productData?.sale) + " sold"}
                </TypographyComponent>
              ) : (
                <div style={{ width: "60px" }}></div>
              )}
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ProductCard;
