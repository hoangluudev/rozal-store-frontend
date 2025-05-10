import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { DividerComponent } from "../common/UI";
import { convertToCurrency } from "../../utils/formatting";

const BillReview = ({ orderBillings = {} }) => {
  return (
    <Box width="100%">
      <Stack rowGap={1}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography fontSize="14px">Subtotal</Typography>
          <Typography fontSize="14px">
            {convertToCurrency(orderBillings.subTotalAmount)}
          </Typography>
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography fontSize="14px">Shipping Fee</Typography>
          <Typography fontSize="14px">
            {convertToCurrency(orderBillings.shippingFee)}
          </Typography>
        </Stack>
        <DividerComponent />
        {orderBillings?.totalSavedAmount !== 0 ? (
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography fontSize="14px" color="text.secondary">
              Saved
            </Typography>
            <Typography fontSize="14px" color="text.secondary">
              {"-" + convertToCurrency(orderBillings.totalSavedAmount)}
            </Typography>
          </Stack>
        ) : (
          <></>
        )}
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography fontSize="14px">Total Amount</Typography>
          <Typography fontSize="14px" color="error" fontWeight={600}>
            {convertToCurrency(orderBillings.totalAmount)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BillReview;
