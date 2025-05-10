import React from "react";
import {
  DividerComponent,
  IconButtonComponent,
} from "../../../components/common/UI";
import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import CartItemBox from "../../../components/ShoppingCart/CartItemBox";
import { RequireLoginComponent } from "../../../components/misc/RequireLogin.component";
import { useCurrentUserApi, useShoppingCartApi } from "../../../hooks/api";

const UserCartDropdown = () => {
  const { currentUserData } = useCurrentUserApi().state;
  const { userCartDataDropdown, totalItemCount } = useShoppingCartApi().state;

  let userShoppingCartURL = "/shopping-cart";
  const [isOpenCart, setOpenCart] = React.useState(null);
  const handleOpenCart = (event) => {
    setOpenCart(event.currentTarget);
  };

  return (
    <React.Fragment>
      <IconButtonComponent
        color="inherit"
        hoverColor="error"
        icon={<ShoppingCart color="inherit" />}
        hasBadge
        showBadgeZero={currentUserData ? true : false}
        badgeColor="error"
        badgeContent={totalItemCount}
        onClick={handleOpenCart}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      />
      <Popover
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={isOpenCart}
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
        open={Boolean(isOpenCart)}
        onClose={() => setOpenCart(null)}
      >
        <Paper square sx={{ minWidth: "250px", maxWidth: "450px" }}>
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{
              p: 2,
              pb: 1,
            }}
            columnGap={1}
          >
            <Typography fontSize={"18px"} sx={{ fontWeight: 600 }}>
              My Cart
            </Typography>
            {totalItemCount > userCartDataDropdown?.length ? (
              <Typography fontSize={"12px"} color={"text.secondary"}>
                {`(${
                  totalItemCount - userCartDataDropdown.length
                } more products in cart)`}
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
          {currentUserData ? (
            <>
              <DividerComponent />
              <CartItemBox
                cartData={userCartDataDropdown}
                productDetailUrl={"/products-alpha/"}
              />
              <AppBar
                position="sticky"
                color="default"
                style={{ top: "auto", bottom: 0 }}
              >
                <Button
                  href={userShoppingCartURL}
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: 0,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <Typography
                    fontSize="14px"
                    sx={{ textTransform: "capitalize" }}
                  >
                    View my shopping cart
                  </Typography>
                </Button>
              </AppBar>
            </>
          ) : (
            <RequireLoginComponent />
          )}
        </Paper>
      </Popover>
    </React.Fragment>
  );
};

export default UserCartDropdown;
