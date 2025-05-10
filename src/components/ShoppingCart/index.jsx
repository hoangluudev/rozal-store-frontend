import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CartItemTable from "./CartItemTable";
import CartItemMobile from "./CartItemMobile";
import { DeleteMultipleConfirmComponent } from "../common/Dialog/DeleteConfirm/MultipleDeleteConfirm";
import { LoadingElementComponent } from "../misc/LoadingElement.component";
import { CartEmpty } from "../misc/EmptyCart.component";
import { useShoppingCartApi } from "../../hooks/api";

const ShoppingCartSection = ({
  cartData = [],
  totalItemCount = 0,
  selectedCount = 0,
  currentPage = 1,
  itemsPerPage = 10,
  onSelectAll = null,
  productDetailUrl = "",
  pending = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { deleteAllSelectedCarts, deleteCartItem, updateCartItem } =
    useShoppingCartApi();

  const handleChangeQuantity = (cart, qty) => {
    let cartId = cart._id;
    if (qty > 0 && qty <= cart.stock && qty !== cart.quantity) {
      updateCartItem({ quantity: qty }, cartId);
    }
  };
  const handleChangeSelect = (cartId, boolean) => {
    updateCartItem({ isSelected: boolean }, cartId);
  };
  const handleDeleteCartItem = (cartId) => {
    deleteCartItem(cartId);
  };
  const handleDeleteAllSelectedCart = () => {
    deleteAllSelectedCarts();
  };
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItemCount);
  return (
    <Box width="100%">
      {!pending && (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">
            {`${startItem}–${endItem} of ${totalItemCount} items`}
          </Typography>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent={"flex-end"}
            sx={{
              display: selectedCount > 0 ? "block" : "none",
            }}
          >
            <Stack direction="row" alignItems="center">
              <DeleteMultipleConfirmComponent
                handleSubmit={handleDeleteAllSelectedCart}
                pending={pending}
                itemLength={selectedCount}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
      {pending ? (
        <LoadingElementComponent />
      ) : cartData.length === 0 ? (
        <CartEmpty />
      ) : isMobile || isTablet ? (
        <CartItemMobile
          cartData={cartData}
          totalItemCount={totalItemCount}
          selectedCount={selectedCount}
          productDetailUrl={productDetailUrl}
          onQuantityChange={handleChangeQuantity}
          onSelectChange={handleChangeSelect}
          onSelectAll={onSelectAll}
          onDelete={handleDeleteCartItem}
          pending={pending}
        />
      ) : (
        <CartItemTable
          cartData={cartData}
          totalItemCount={totalItemCount}
          selectedCount={selectedCount}
          productDetailUrl={productDetailUrl}
          onQuantityChange={handleChangeQuantity}
          onSelectChange={handleChangeSelect}
          onSelectAll={onSelectAll}
          onDelete={handleDeleteCartItem}
          pending={pending}
        />
      )}
    </Box>
  );
};

export default ShoppingCartSection;
