import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  ProductRatingDialog,
  ViewProductRatingDialog,
} from "../../Order/components/ProductRatingDialog";

const ItemRatingStatus = ({ userReview = null, item, orderCode = "" }) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);

  const handleRateNowClick = () => {
    setIsRateDialogOpen(true);
  };

  const handleViewClick = () => {
    setIsViewDialogOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          pl: "6px",
          backgroundColor: userReview ? "#e8f5e9" : "#fff3e0",
          border: "1px solid",
          borderColor: userReview ? "#66bb6a" : "#ffa726",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {userReview ? (
            <>
              <StarIcon
                sx={{
                  color: "#ffb400",
                  fontSize: {
                    xs: 16,
                    sm: 20,
                  },
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: {
                    xs: "9px",
                    sm: "12px",
                  },
                }}
              >
                Your Rating: {userReview.score} / 5
              </Typography>
            </>
          ) : (
            <>
              <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: {
                    xs: "9px",
                    sm: "12px",
                  },
                }}
              >
                Please rate your experience
              </Typography>
            </>
          )}
        </Stack>

        <Button
          onClick={userReview ? handleViewClick : handleRateNowClick}
          variant="contained"
          color={userReview ? "success" : "error"}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            fontSize: {
              xs: "9px",
              sm: "12px",
            },
          }}
        >
          {userReview ? "View" : "Rate now"}
        </Button>
      </Box>

      <ViewProductRatingDialog
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        ratingData={userReview || { score: 0, content: "", lastUpdated: "" }}
        item={item}
      />

      <ProductRatingDialog
        open={isRateDialogOpen}
        onClose={() => setIsRateDialogOpen(false)}
        item={item}
        orderCode={orderCode}
      />
    </>
  );
};

export default ItemRatingStatus;
