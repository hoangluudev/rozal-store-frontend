import React from "react";
import { Stack } from "@mui/material";
import { CartEmpty } from "../misc/EmptyCart.component";
import CartItemCard from "./components/CartItemCard";

const CartItemBox = ({ cartData = [], productDetailUrl }) => {
  return (
    <React.Fragment>
      {cartData.length > 0 ? (
        <Stack flexDirection="column" rowGap={2} sx={{ p: 2 }}>
          {cartData &&
            cartData.map((item) => (
              <CartItemCard
                key={item._id}
                cardItem={item}
                productDetailUrl={productDetailUrl}
              />
            ))}
        </Stack>
      ) : (
        <CartEmpty />
      )}
    </React.Fragment>
  );
};

export default CartItemBox;
