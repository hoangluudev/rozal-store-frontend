import React from "react";
import { Typography, Skeleton, Grid, Stack } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const OrderNotFound = ({ orderCode = "N/A" }) => {
  return (
    <Grid container item className="position-relative overflow-hidden">
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        className="position-absolute h-100"
      >
        <Stack flexDirection="column" alignItems="center">
          <ShoppingCartOutlinedIcon
            color="disabled"
            sx={{
              fontSize: 80,
            }}
          />
          {orderCode && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              Order ID: <strong>{orderCode}</strong>
            </Typography>
          )}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Order not found
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrderNotFound;
