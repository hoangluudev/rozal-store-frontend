import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { convertToCurrency } from "../../../utils/formatting";
import { LocalShipping } from "@mui/icons-material";

const ShippingCard = ({ shippingData, selectedShippingOption, onChange }) => {
  return (
    <Stack flexDirection="row" alignItems="flex-start">
      <FormControlLabel
        control={
          <Radio
            color="error"
            checked={selectedShippingOption === shippingData.value}
            onChange={onChange}
            value={shippingData.value}
          />
        }
        label=""
        sx={{
          m: 0,
        }}
      />

      <Card
        variant="outlined"
        sx={{
          borderColor:
            selectedShippingOption === shippingData.value ? "crimson" : "black",
          borderWidth: "1px",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={onChange}
      >
        <CardContent
          sx={{
            "&:last-child": {
              p: 1,
            },
          }}
        >
          <Stack flexDirection="column">
            <Stack flexDirection="row" alignItems="center" columnGap={1}>
              <LocalShipping />
              <Typography>{shippingData.title}</Typography>
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {`Cost: ${convertToCurrency(shippingData.costPrice)}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Delivery: ${shippingData?.estimatedTime?.minDay} - ${shippingData?.estimatedTime?.maxDay} days`}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {shippingData.description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ShippingCard;
