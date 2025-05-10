import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { convertToCurrency } from "../../utils/formatting";
import { DividerComponent } from "../common/UI";
import { Discount } from "@mui/icons-material";
import useToast from "../../hooks/useNotifications";

const CartToolbar = ({
  totalItemCount = 0,
  cartBillings = {},
  selectedItemsCount = 0,
  onSelectAll = null,
  checkOutUrl = "#",
  pending = false,
}) => {
  const { sendMsgInfo } = useToast();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    if (cartBillings.totalSavedAmount > 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleGoToCheckOut = () => {
    if (selectedItemsCount > 0) {
      window.location.href = checkOutUrl;
    } else {
      sendMsgInfo("You have not selected any items for checkout!");
    }
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      style={{
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}
      component={"section"}
    >
      <Stack
        flexDirection="row"
        justifyContent={{ xs: "space-between", sm: "flex-end" }}
        alignItems="center"
        columnGap={2}
      >
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Discount color="error" fontSize="small" />
          <Typography
            component="span"
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={600}
          >
            Voucher
          </Typography>
        </Stack>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            fontSize: { xs: "12px", sm: "14px" },
          }}
        >
          Select or Enter Code
        </Button>
      </Stack>
      <DividerComponent />
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: { xs: 0, sm: 1 } }}
      >
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Stack flexDirection="row" alignItems="center">
            <Checkbox
              checked={
                totalItemCount > 0 && selectedItemsCount === totalItemCount
              }
              indeterminate={
                selectedItemsCount > 0 && selectedItemsCount < totalItemCount
              }
              onChange={onSelectAll}
              disabled={pending}
            />
            <Typography fontSize={{ xs: "10px", sm: "14px" }}>
              Select All
            </Typography>
          </Stack>
        </Stack>

        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Button
            variant="text"
            color="inherit"
            size="small"
            sx={{
              minWidth: "auto",
              width: "max-content",
              padding: 0,
              borderRadius: 0,
              textTransform: "capitalize",
            }}
            onClick={handlePopoverOpen}
          >
            <Stack flexDirection="column" alignItems="flex-end">
              <Stack flexDirection="row" alignItems="center" columnGap={1}>
                <Typography fontSize={{ xs: "11px", sm: "14px", md: "18px" }}>
                  Total:
                </Typography>
                <Typography
                  fontSize={{ xs: "11px", sm: "14px", md: "18px" }}
                  color="error"
                  sx={{ fontWeight: 600 }}
                >
                  {convertToCurrency(cartBillings?.totalAmount)}
                </Typography>
              </Stack>

              {cartBillings?.totalSavedAmount > 0 && (
                <Stack flexDirection="row" alignItems="center" columnGap={1}>
                  <Typography fontSize={{ xs: "9px", sm: "12px", md: "14px" }}>
                    Saved
                  </Typography>
                  <Typography
                    fontSize={{ xs: "9px", sm: "12px", md: "14px" }}
                    color="error"
                  >
                    {convertToCurrency(cartBillings?.totalSavedAmount)}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Button>

          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            disableScrollLock
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Box minWidth={{ xs: "300px", sm: "500px" }}>
              <Stack spacing={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Discount detail
                </Typography>
                <DividerComponent />
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography fontSize="14px">Subtotal</Typography>
                  <Typography fontSize="14px">
                    {convertToCurrency(cartBillings.subTotalAmount)}
                  </Typography>
                </Stack>
                <DividerComponent />
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography fontSize="14px">Product Discount</Typography>
                  <Typography fontSize="14px" color="text.secondary">
                    {"-" +
                      convertToCurrency(cartBillings.productDiscountAmount)}
                  </Typography>
                </Stack>
                <DividerComponent />
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography fontSize="14px">Saved</Typography>
                  <Typography fontSize="14px" color="text.secondary">
                    {"-" + convertToCurrency(cartBillings.totalSavedAmount)}
                  </Typography>
                </Stack>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography fontSize="14px">Total Amount</Typography>
                  <Typography fontSize="14px" color="error" fontWeight={600}>
                    {convertToCurrency(cartBillings.totalAmount)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Popover>

          <Button
            variant="contained"
            color="error"
            disabled={pending}
            sx={{ py: 2, borderRadius: 0 }}
            onClick={handleGoToCheckOut}
          >
            <Typography
              fontSize={{ xs: "10px", sm: "14px" }}
              sx={{ textTransform: "capitalize", textWrap: "nowrap" }}
            >
              {`Checkout (${selectedItemsCount})`}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default CartToolbar;
