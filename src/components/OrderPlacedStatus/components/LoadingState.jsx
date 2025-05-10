import React from "react";
import { Typography, CircularProgress, Box } from "@mui/material";

const LoadingState = () => {
  return (
    <Box width="100%" sx={{ padding: "2rem", textAlign: "center" }}>
      <CircularProgress
        size={150}
        color="primary"
        sx={{ marginBottom: "1rem" }}
      />

      <Typography variant="h5" gutterBottom>
        Loading...
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Please wait while we load your content.
      </Typography>
    </Box>
  );
};

export default LoadingState;
