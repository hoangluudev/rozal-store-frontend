import React from "react";
import { Checkbox, Stack, Typography, Button } from "@mui/material";
import QuantityAdjustToggle from "../Product/ProductDetail/QuantityAdjustToggle";
import { convertToCurrency } from "../../utils/formatting";
import { AvatarComponent, LinkComponent } from "../common/UI";
import { DeleteOneConfirmComponent } from "../common/Dialog/DeleteConfirm/SingleDeleteConfirm";

const CartItemMobile = ({
  cartData = [],
  productDetailUrl,
  onQuantityChange = null,
  onSelectChange = null,
  onDelete = null,
  pending = false,
}) => {
  const handleQuantityChange = (cart, qty) => {
    onQuantityChange(cart, qty);
  };

  return (
    <React.Fragment>
      <Stack flexDirection="column" rowGap={2}>
        {cartData &&
          cartData.map((item) => (
            <Stack
              key={item._id}
              flexDirection="row"
              alignItems="center"
              columnGap={1}
              sx={{
                border: "1px solid #ddd",
                p: { xs: 1, sm: 2 },
              }}
            >
              <Stack direction="row" alignItems="center">
                <Checkbox
                  size="small"
                  checked={item.isSelected}
                  onChange={(e) => onSelectChange(item._id, e.target.checked)}
                  disabled={pending}
                />

                <AvatarComponent
                  src={item.image}
                  sx={{ width: 60, height: 60 }}
                />
              </Stack>
              <Stack
                width="100%"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent={{ xs: "-moz-initial", sm: "space-between" }}
                rowGap={1}
              >
                <Stack flexDirection="column">
                  <LinkComponent to={productDetailUrl + item?.productCode}>
                    <Typography
                      fontSize={{ xs: "12px", sm: "16px" }}
                      fontWeight={600}
                    >
                      {item.name}
                    </Typography>
                  </LinkComponent>
                  {item.variants.length > 0 ? (
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      sx={{
                        minWidth: "auto",
                        width: "max-content",
                        padding: 0,
                      }}
                    >
                      <Typography
                        component={"span"}
                        sx={{
                          textAlign: "left",
                          color: "text.secondary",
                          textTransform: "none",
                        }}
                        fontSize="10px"
                      >
                        {item.variants
                          .map((variant) => variant.value)
                          .join(", ")}
                      </Typography>
                    </Button>
                  ) : (
                    <></>
                  )}
                  {item?.price && item?.comparePrice ? (
                    item.comparePrice !== item.price ? (
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={1}
                      >
                        <Typography
                          fontSize={{ xs: "10px", sm: "14px" }}
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          {convertToCurrency(item.comparePrice)}
                        </Typography>
                        <Typography
                          fontSize={{ xs: "12px", sm: "16x" }}
                          fontWeight={600}
                          color="error"
                        >
                          {convertToCurrency(item.price)}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography
                        fontSize={{ xs: "12px", sm: "16px" }}
                        fontWeight={600}
                        color="error"
                      >
                        {convertToCurrency(item.price)}
                      </Typography>
                    )
                  ) : (
                    0
                  )}
                </Stack>
                <Stack
                  flexDirection={{ xs: "row", sm: "column" }}
                  alignItems="center"
                  columnGap={1}
                >
                  <QuantityAdjustToggle
                    value={item.quantity}
                    onChange={(newQuantity) =>
                      handleQuantityChange(item, newQuantity)
                    }
                    maxStock={item.stock}
                    pending={pending}
                  />
                  <Stack direction="row" alignItems="center">
                    <DeleteOneConfirmComponent
                      handleSubmit={() => onDelete(item._id)}
                      pending={pending}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ))}
      </Stack>
    </React.Fragment>
  );
};

export default CartItemMobile;
