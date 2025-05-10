import React from "react";
import { Typography, Button, Box } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const DefaultState = () => {
  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <Box width="100%" sx={{ padding: "2rem", textAlign: "center" }}>
      <SearchOffIcon color="disabled" fontSize="large" sx={{ fontSize: 150 }} />

      <Typography variant="h5" gutterBottom sx={{ marginTop: "1rem" }}>
        No Order Found
      </Typography>

      <Typography variant="body1" color="textSecondary" gutterBottom>
        We couldn’t locate any valid orders. Please check your order details or
        try again later.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "1.5rem" }}
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default DefaultState;
