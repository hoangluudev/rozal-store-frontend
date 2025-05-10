import React from "react";
import {
  Typography,
  RadioGroup,
  Radio,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import images from "../../utils/imageUtils";

const paymentMethods = [
  {
    title: "Cash on Delivery",
    image: images.cashIcon,
    value: "cash-on-delivery",
    description: "Pay when you receive the package.",
  },
  {
    title: "ZaloPay",
    image: images.zalopayLogo,
    value: "zalopay",
    description: "Pay securely via ZaloPay.",
  },
  {
    title: "Momo",
    image: images.momoLogo,
    value: "momo",
    description: "Pay securely via Momo.",
  },
];

const PaymentMethodSelect = ({ value = "cash-on-delivery", onChange }) => {
  const handleSelectPaymentMethod = (newValue) => {
    onChange(newValue);
  };

  return (
    <Box width="100%">
      <Typography
        color="text.secondary"
        sx={{
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        Select Payment Method
      </Typography>
      <RadioGroup
        value={value}
        onChange={(e) => handleSelectPaymentMethod(e.target.value)}
      >
        {paymentMethods.map((method) => (
          <Card
            key={method.value}
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 1,
              padding: 1,
              border:
                value === method.value
                  ? "1px solid #1976d2"
                  : "1px solid #e0e0e0",
              boxShadow:
                value === method.value
                  ? "0 0 5px rgba(25, 118, 210, 0.5)"
                  : "none",
              transition: "border 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onClick={() => handleSelectPaymentMethod(method.value)}
          >
            <Radio
              value={method.value}
              sx={{
                mr: { xs: 1, sm: 3 },
                width: { xs: 10, sm: 14 },
                height: { xs: 10, sm: 14 },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "16px", sm: "20px" },
                },
              }}
              checked={value === method.value}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <img
                src={method.image}
                alt={method.title}
                style={{
                  width: "auto",
                  height: "32px",
                  maxHeight: { xs: 24, sm: 32 },
                }}
              />
              <CardContent
                sx={{
                  padding: "0 8px",
                  flex: 1,
                  "& .MuiTypography-body1": {
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 600,
                  },
                  "& .MuiTypography-body2": {
                    fontSize: { xs: "10px", sm: "12px" },
                  },
                }}
              >
                <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                  {method.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {method.description}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </RadioGroup>
    </Box>
  );
};

export default PaymentMethodSelect;
