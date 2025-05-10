import React from "react";
import { Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { convertToCurrency } from "../../../utils/formatting";

const OrderPlacedSuccess = ({ orderCode, totalAmount }) => (
  <Stack
    flexDirection="column"
    alignItems="center"
    rowGap={1}
    sx={{ width: "100%", textAlign: "center" }}
  >
    <CheckCircle color="success" sx={{ fontSize: 150 }} />
    <Typography fontSize={{ xs: "18px", sm: "20px" }} sx={{ fontWeight: 600 }}>
      Your order was placed successfully!
    </Typography>
    <Stack flexDirection="column">
      <Typography
        fontSize={{ xs: "14px", sm: "16px" }}
        sx={{ color: "text.secondary" }}
      >
        Thank you for shopping with us. You can view your order details or
        continue shopping.
      </Typography>
      <Stack flexDirection="row" justifyContent="center" columnGap={1}>
        <Typography
          fontSize={{ xs: "14px", sm: "16px" }}
          sx={{ color: "text.secondary" }}
        >
          Your order number is
        </Typography>
        <Typography
          fontSize={{ xs: "14px", sm: "16px" }}
          sx={{ fontWeight: 600 }}
        >
          #{orderCode}
        </Typography>
      </Stack>
    </Stack>
    <Stack flexDirection="column" pb={3}>
      <Typography
        fontSize={{ xs: "14px", sm: "16px" }}
        sx={{ fontWeight: 600 }}
      >
        Please prepare this amount on delivery day
      </Typography>
      <Typography sx={{ color: "orange", fontWeight: 600 }}>
        {convertToCurrency(totalAmount)}
      </Typography>
    </Stack>
  </Stack>
);

export default OrderPlacedSuccess;
