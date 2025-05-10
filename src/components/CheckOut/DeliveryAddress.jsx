import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { LoadingElementSmallComponent } from "../misc/LoadingElementSmall.component";
import NoAddressAvailable from "./components/NoAddressAvailable";
import NoDefautAddress from "./components/NoDefautAddress";
import { DividerComponent } from "../common/UI";

const DeliveryAddress = ({
  addressDataList = [],
  selectedAddressId = null,
  isDataAvailable = false,
  isNoAddressAvailable = false,
  isDefaltAddressUnavailable = false,
  pending = false,
}) => {
  const selectedAddress = addressDataList.find(
    (address) => address._id === selectedAddressId
  );

  return (
    <React.Fragment>
      {pending || !isDataAvailable ? (
        <LoadingElementSmallComponent />
      ) : (
        <Box
          component={Paper}
          elevation={1}
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "3px solid #90caf9",
            background: "#e3f2fd",
          }}
        >
          {!pending && isNoAddressAvailable ? (
            <NoAddressAvailable />
          ) : !pending && isDefaltAddressUnavailable ? (
            <NoDefautAddress />
          ) : selectedAddress ? (
            <Grid container columnGap={2} alignItems={"center"}>
              <Grid item xs={"auto"}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                  fontSize={{
                    xs: "14px",
                    sm: "16px",
                  }}
                >
                  {selectedAddress?.fullName}
                </Typography>
              </Grid>
              <DividerComponent isVertical flexItem />
              <Grid item xs={"auto"}>
                <Typography
                  color="text.secondary"
                  fontSize={{
                    xs: "14px",
                    sm: "16px",
                  }}
                >
                  {selectedAddress?.phone}
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    fontSize={{
                      xs: "12px",
                      md: "14px",
                    }}
                  >
                    {selectedAddress?.address}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    fontSize={{
                      xs: "12px",
                      md: "14px",
                    }}
                  >
                    {selectedAddress?.ward}
                    {", " + selectedAddress?.district}
                    {", " + selectedAddress?.city}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography>No address selected.</Typography>
          )}
        </Box>
      )}
    </React.Fragment>
  );
};

export default DeliveryAddress;
