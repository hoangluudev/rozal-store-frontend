import * as React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Groups } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const TotalCustomer = () => {
  const { totalClientCount } = useSelector(
    (reduxData) => reduxData.ADMIN_DASHBOARD_REDUCERS
  );

  let textColor = "#fff";
  let backgroundColor = "#2196f3";

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
              <Groups sx={{ color: textColor }} fontSize="large" />
              <Typography
                sx={{
                  fontSize: 16,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Total Customers
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
            {totalClientCount ? totalClientCount : 0}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
