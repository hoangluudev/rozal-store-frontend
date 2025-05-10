import React from "react";
import { Skeleton, Typography } from "@mui/material";

const NoDefautAddress = () => {
  return (
    <div className="w-100 position-relative py-4">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"100%"}
        animation="wave"
      />
      <div className="position-absolute d-flex flex-column top-0 start-0 w-100 h-100 justify-content-center">
        <Typography sx={{ fontWeight: 600, textTransform: "capitalize" }}>
          Please select a delivery address to proceed!
        </Typography>
      </div>
    </div>
  );
};

export default NoDefautAddress;
