import React from "react";
import { Grid, Skeleton, Typography, Box } from "@mui/material";
import NoProductImage from "../../assets/images/Item_not_found.png";

const ProductNotFound = () => {
  return (
    <Grid container sx={{ position: "relative", overflow: "hidden" }}>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          animation="wave"
        />
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={NoProductImage}
            alt="No Product Found"
            style={{
              width: 150,
              height: 150,
              objectFit: "contain",
            }}
          />
          <Typography
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={{ xs: "20px", sm: "24px" }}
          >
            No product found
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductNotFound;
