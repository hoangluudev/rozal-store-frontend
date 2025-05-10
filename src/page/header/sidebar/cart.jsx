import * as React from "react";
import {
  Box,
  IconButton,
  Paper,
  Badge,
  Typography,
  AppBar,
  Toolbar,
  Popover,
  Stack,
  Button,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { ShoppingCartTable } from "../../../components/ShoppingCart/CartTable.component";
import { CartBillsComponent } from "../../../components/ShoppingCart/CartBilling.component";
import { useCurrentUserApi, useShoppingCartApi } from "../../../hooks/api";

const getTotalProducts = (products) => {
  let totalQuantity = 0;
  products.forEach((product) => {
    totalQuantity += product.quantity;
  });
  return totalQuantity;
};

const ProductCart = () => {
  const { currentUserData } = useCurrentUserApi().state;
  const { getShoppingCart } = useShoppingCartApi();
  const { userCartItems, addToCartPending } = useShoppingCartApi().state;

  const [anchorCart, setAnchorCart] = React.useState(null);
  const handleOpenCart = (event) => {
    setAnchorCart(event.currentTarget);
  };

  const cartItemData = userCartItems || [];
  const getTotalItemsCount = getTotalProducts(cartItemData);

  React.useEffect(() => {
    if (currentUserData || addToCartPending) {
      getShoppingCart();
    }
  }, [addToCartPending, currentUserData, getShoppingCart]);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        onClick={handleOpenCart}
        sx={{
          py: "0",
          mx: "0.5rem",
          color: "white",
          ":hover": { color: "#fd4848" },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Badge
          badgeContent={getTotalItemsCount ? getTotalItemsCount : 0}
          max={99}
          color="error"
        >
          <ShoppingCartOutlined fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorCart}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        disableScrollLock={true}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorCart)}
        onClose={() => setAnchorCart(null)}
      >
        <Paper square sx={{ minWidth: "350px", maxWidth: "600px" }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            Cart
          </Typography>
          <ShoppingCartTable cartData={cartItemData} />
          <AppBar
            position="sticky"
            color="default"
            style={{ top: "auto", bottom: 0 }}
          >
            <Toolbar className="px-0">
              <Stack className="w-100" flexDirection={"column"}>
                <CartBillsComponent />
                <Stack flexDirection={"column"}>
                  <Button
                    className="w-100"
                    color={"inherit"}
                    variant="contained"
                    href="/shopping-cart"
                  >
                    Go to Cart
                  </Button>
                  <Button
                    href="/checkout"
                    className="w-100"
                    color={"error"}
                    variant="contained"
                  >
                    Check out
                  </Button>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </Paper>
      </Popover>
    </Box>
  );
};

export default ProductCart;
