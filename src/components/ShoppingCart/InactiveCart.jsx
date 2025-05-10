import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InactiveCartTable from "./components/InactiveCartTable";
import InactiveCartItemMobile from "./components/InactiveCartItemMobile";
import { useShoppingCartApi } from "../../hooks/api";

const InactiveCart = ({
  cartData = [],
  productDetailUrl = "",
  pending = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { deleteCartItem } = useShoppingCartApi();

  const handleDeleteCartItem = (cartId) => {
    deleteCartItem(cartId);
  };
  return (
    <Box width="100%">
      {isMobile || isTablet ? (
        <InactiveCartItemMobile
          cartData={cartData}
          productDetailUrl={productDetailUrl}
          onDelete={handleDeleteCartItem}
          pending={pending}
        />
      ) : (
        <InactiveCartTable
          cartData={cartData}
          productDetailUrl={productDetailUrl}
          onDelete={handleDeleteCartItem}
          pending={pending}
        />
      )}
    </Box>
  );
};

export default InactiveCart;
