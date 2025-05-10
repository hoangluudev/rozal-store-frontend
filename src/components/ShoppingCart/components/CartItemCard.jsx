import { Stack, Typography } from "@mui/material";
import React from "react";
import { AvatarComponent, LinkComponent } from "../../common/UI";
import { convertToCurrency } from "../../../utils/formatting";

const CartItemCard = ({ cardItem = {}, productDetailUrl = "" }) => {
  return (
    <Stack flexDirection="row" alignItems="center" columnGap={1}>
      <AvatarComponent src={cardItem?.image} sx={{ width: 50, height: 50 }} />
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        rowGap={1}
      >
        <Stack flexDirection="column">
          {productDetailUrl ? (
            <LinkComponent to={productDetailUrl + cardItem?.productCode}>
              <Typography
                fontSize={{ xs: "12px", sm: "14px" }}
                fontWeight={600}
              >
                {cardItem?.name}
              </Typography>
            </LinkComponent>
          ) : (
            <Typography fontSize={{ xs: "12px", sm: "14px" }} fontWeight={600}>
              {cardItem?.name}
            </Typography>
          )}

          {cardItem?.variants?.length > 0 && (
            <Typography
              component="span"
              sx={{
                textAlign: "left",
                color: "text.secondary",
                textTransform: "none",
              }}
              fontSize="10px"
            >
              {cardItem?.variants.map((variant) => variant.value).join(", ")}
            </Typography>
          )}
          <Stack flexDirection="row" alignItems="center" columnGap={1}>
            {cardItem?.price && cardItem?.comparePrice ? (
              <Typography fontSize="12px" fontWeight={600} color="error">
                {convertToCurrency(cardItem?.price)}
              </Typography>
            ) : (
              <></>
            )}
            <Typography fontSize={"12px"}>Qty: {cardItem?.quantity}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItemCard;
