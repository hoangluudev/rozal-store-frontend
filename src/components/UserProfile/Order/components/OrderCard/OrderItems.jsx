import React from "react";
import { Stack, Typography } from "@mui/material";
import { CardMediaComponent, LinkComponent } from "../../../../common/UI";
import { formatRateScore } from "../../../../../utils/formatting";
import { Star } from "@mui/icons-material";
import ItemRatingStatus from "../../../components/OrderDetail/ItemRatingStatus";

const OrderItems = ({ itemData, orderCode = "" }) => {
  const productDetailUrl = "/products-alpha/";
  return (
    <Stack flexDirection="row" columnGap={2}>
      <CardMediaComponent
        image={itemData?.image}
        title={itemData?.name}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
          maxWidth: "60px",
          maxHeight: "60px",
        }}
      />
      <Stack
        flexDirection="column"
        rowGap={1}
        sx={{
          width: "100%",
        }}
      >
        <Stack
          flexDirection="row"
          alignItems={{ xs: "flex-start", sm: "center" }}
          columnGap={1}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{
              display:
                itemData?.rate?.score && itemData?.rate?.score !== 0
                  ? "flex"
                  : "none",
              background: "#eeeeee",
              borderRadius: "5px",
              px: "4px",
              py: "2px",
            }}
          >
            <Typography fontSize="12px" fontWeight={700} color="#ff9100">
              {formatRateScore(itemData?.rate?.score || 0)}
            </Typography>
            <Star sx={{ color: "#ff9100", fontSize: "12px" }} />
          </Stack>
          <LinkComponent
            to={productDetailUrl + itemData?.productCode}
            underline="hover"
          >
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: 600,
              }}
            >
              {itemData?.name}
            </Typography>
          </LinkComponent>
        </Stack>
        <ItemRatingStatus
          userReview={itemData?.myRating}
          item={itemData}
          orderCode={orderCode}
        />
      </Stack>
    </Stack>
  );
};

export default OrderItems;
