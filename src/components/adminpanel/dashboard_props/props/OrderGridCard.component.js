import * as React from "react";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

export const OrderGridCard = ({ cardStyle }) => {
  let textColor = cardStyle ? cardStyle.textColor : "#2196f3";
  let backgroundColor = cardStyle ? cardStyle.backgroundColor : "#bbdefb";

  return (
    <Card
      variant="elevation"
      style={{
        width: "100%",
        borderRadius: "1rem",
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <CardContent>
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <Avatar sx={{ bgcolor: "#fff" }}>
            {cardStyle ? (
              React.cloneElement(cardStyle.icon, {
                sx: { color: cardStyle.textColor },
              })
            ) : (
              <></>
            )}
          </Avatar>
          <Stack flexDirection={"column"}>
            <Typography
              sx={{
                fontSize: "2rem",
                textTransform: "capitalize",
                fontWeight: 700,
                color: `${textColor}`,
              }}
            >
              {cardStyle.value}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                textTransform: "capitalize",
                fontWeight: 700,
                color: "#616161",
              }}
            >
              {cardStyle ? cardStyle.label : ""}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
