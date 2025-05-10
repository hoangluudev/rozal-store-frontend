import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { convertToCurrency } from "../../../../utils/formatting";
import { EditOutlined, HideImageOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductDetailComponent = ({ selectedProduct = {} }) => {
  return (
    <Box
      component={Paper}
      style={{
        padding: "1rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {selectedProduct.avatarImage ? (
            <CardMedia
              component="img"
              image={selectedProduct.avatarImage}
              alt={selectedProduct.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Grid
              container
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#e0e0e0",
              }}
            >
              <HideImageOutlined
                style={{ fontSize: "100px", color: "#9e9e9e" }}
              />
              <Typography variant="body1" color="textSecondary">
                No Image Available
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography
            fontSize={{ xs: "1.2rem", sm: "1.5rem", md: "1.6rem" }}
            className="fw-bold text-uppercase"
            variant="h5"
          >
            {selectedProduct.name}
          </Typography>

          {selectedProduct?.prices?.price ? (
            <>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography
                  fontSize={{ xs: "1.2rem", md: "1.5rem" }}
                  className="fw-bold"
                >
                  {convertToCurrency(selectedProduct.prices.price)}
                </Typography>
                {selectedProduct.isOnSale && (
                  <Chip
                    className="fw-bold ms-2"
                    label={"-" + selectedProduct.prices.discount + "%"}
                    color="error"
                    size={"small"}
                    style={{ borderRadius: "10px", fontSize: "16px" }}
                  />
                )}
              </Stack>

              {selectedProduct.isOnSale && (
                <Typography
                  fontSize={{ xs: "0.7rem", md: "1rem" }}
                  className="text-decoration-line-through text-secondary mb-3"
                >
                  {convertToCurrency(selectedProduct?.prices?.comparePrice)}
                </Typography>
              )}
            </>
          ) : (
            <Typography
              className="fw-bold"
              fontSize={{ xs: "1.2rem", md: "1.5rem" }}
            >
              {convertToCurrency(
                selectedProduct?.prices?.price
                  ? selectedProduct.prices.price
                  : 0
              )}
            </Typography>
          )}
          {selectedProduct.hasVariation === false ? (
            <Typography variant="body2" color="textSecondary" className="mt-3">
              <strong>Inventory:</strong>
              {" " + selectedProduct.stock + " in stock" || "N/A"}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" className="mt-3">
              <strong>Inventory:</strong>
              {selectedProduct.variantStats
                ? " " +
                  selectedProduct.variantStats.totalQuantity +
                  " in stock for " +
                  selectedProduct.variantStats.totalCount +
                  " variants"
                : "N/A"}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            <strong>Brand:</strong> {selectedProduct.brand || "N/A"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Gender:</strong> {selectedProduct.gender || "Unspecified"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Status:</strong> {selectedProduct.status || "Unknown"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Tags:</strong> {selectedProduct.tags?.join(", ") || "None"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Last Updated At:</strong>
            {" " + new Date(selectedProduct.updatedAt).toLocaleString()}
          </Typography>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/admin-panel/product-alpha/edit/id/" + selectedProduct._id}
              startIcon={<EditOutlined />}
            >
              Edit Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailComponent;
