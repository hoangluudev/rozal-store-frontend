import { Box, Stack } from "@mui/material";
import React from "react";
import CartItemCard from "../ShoppingCart/components/CartItemCard";
import { CartEmpty } from "../misc/EmptyCart.component";
import { LoadingElementSmallComponent } from "../misc/LoadingElementSmall.component";
import { DividerComponent } from "../common/UI";

const CartReview = ({ cartData = [], pending = false }) => {
  return (
    <React.Fragment>
      {pending ? (
        <LoadingElementSmallComponent />
      ) : cartData.length > 0 ? (
        <Stack flexDirection="column" rowGap={2} sx={{ p: 2, width: "100%" }}>
          {cartData &&
            cartData.map((item) => (
              <Box width="100%" key={item._id}>
                <CartItemCard cardItem={item} />
                <DividerComponent
                  flexItem
                  sx={{
                    py: 1,
                  }}
                />
              </Box>
            ))}
        </Stack>
      ) : (
        <CartEmpty />
      )}
    </React.Fragment>
  );
};

export default CartReview;
