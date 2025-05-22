import * as React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { useDashboardApi } from "@/hooks/api";

export const TotalProductsSold = () => {
  const { totalProductSold } = useDashboardApi().state;

  let textColor = "#fff";
  let backgroundColor = "#e53935";

  return (
    <Card
      variant="elevation"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1rem",
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <CardContent>
        <Stack flexDirection={"column"} justifyContent={"center"} gap={2}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack flexDirection={"row"} alignItems={"center"} columnGap={1}>
              <ShoppingBagOutlined sx={{ color: textColor }} fontSize="large" />
              <Typography
                sx={{
                  fontSize: 16,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Total items Sold
              </Typography>
            </Stack>
          </Stack>
          <Typography
            sx={{
              fontSize: "1.5rem",
              textTransform: "capitalize",
              fontWeight: 700,
              color: `${textColor}`,
            }}
          >
            {totalProductSold ? totalProductSold : 0}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
