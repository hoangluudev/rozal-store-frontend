import React from "react";
import { Box, Button, Link, Stack } from "@mui/material";
import ChangePaymentMethodDialog from "../../UserProfile/Order/components/ChangePaymentMethod";
import { useOrderApi } from "@/hooks/api";

const NavigateButtons = ({
  paymentStatus,
  orderCode = "",
  orderData,
  orderURL = "#",
  shopURL = "#",
}) => {
  const { createZaloPaymentRetryRequest } = useOrderApi();

  const handleRetryPayment = () => {
    createZaloPaymentRetryRequest(orderCode);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={1}
        sx={{ width: "100%" }}
      >
        {paymentStatus === "Success" ||
        (!orderData?.isOnlinePayment &&
          orderData?.orderStatus === "Pending") ? (
          <>
            <Link href={shopURL} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Button
                variant="contained"
                size="small"
                color="error"
                fullWidth
                sx={{ textTransform: "capitalize" }}
              >
                Continue Shopping
              </Button>
            </Link>
          </>
        ) : paymentStatus === "Pending" ? (
          <>
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                width: { xs: "100%", sm: "auto" },
                textTransform: "capitalize",
              }}
              onClick={handleRetryPayment}
            >
              Pay now
            </Button>
          </>
        ) : paymentStatus === "Failed" ? (
          <>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{
                width: { xs: "100%", sm: "auto" },
                textTransform: "capitalize",
              }}
              onClick={handleRetryPayment}
            >
              Retry Payment
            </Button>
            <ChangePaymentMethodDialog
              orderCode={orderCode}
              currentPaymentMethod={orderData?.paymentMethod}
            />
          </>
        ) : (
          <></>
        )}
        <Link href={orderURL} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            sx={{
              color: "black",
              borderColor: "black",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "black",
              },
            }}
            fullWidth
          >
            View Order
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default NavigateButtons;
