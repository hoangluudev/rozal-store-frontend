import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Radio,
  FormControlLabel,
  Stack,
  Box,
} from "@mui/material";
import { VerifiedOutlined } from "@mui/icons-material";
import { DividerComponent } from "../../common/UI";
import EditUserAddressDialog from "../../UserProfile/components/EditAddressDialog";

const DeliveryAddressCard = ({
  addressData,
  selectedAddressId,
  onChangeAddress,
}) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="flex-start"
      sx={{
        width: "100%",
      }}
    >
      <FormControlLabel
        control={
          <Radio
            color="error"
            checked={selectedAddressId === addressData._id}
            onChange={onChangeAddress}
            value={addressData._id}
          />
        }
        label=""
      />

      <Card
        variant="outlined"
        sx={{
          borderColor:
            selectedAddressId === addressData._id ? "crimson" : "black",
          borderWidth: "1px",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={onChangeAddress}
      >
        <CardContent
          sx={{
            "&:last-child": {
              p: 1,
            },
          }}
        >
          <Stack flexDirection="row">
            <Box width={"100%"}>
              {addressData?.isDefault ? (
                <Chip
                  className="px-3"
                  label="Default"
                  variant="outlined"
                  color={addressData.isDefault ? "error" : "default"}
                  size="small"
                  icon={<VerifiedOutlined />}
                />
              ) : null}
              <Grid container alignItems="center" columnGap={1}>
                <Grid item xs={12} sm={"auto"}>
                  <Typography
                    fontSize={{
                      xs: "14px",
                      md: "16px",
                    }}
                  >
                    {addressData.fullName}
                  </Typography>
                </Grid>
                <DividerComponent isVertical flexItem />
                <Grid item xs={12} sm={"auto"}>
                  <Typography
                    color="text.secondary"
                    fontSize={{
                      xs: "14px",
                      md: "16px",
                    }}
                  >
                    {addressData.phone}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                color="text.secondary"
                fontSize={{
                  xs: "12px",
                  md: "14px",
                }}
              >
                {addressData.address}
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={{
                  xs: "12px",
                  md: "14px",
                }}
              >
                {addressData?.ward || "None"}
                {", " + addressData?.district || "None"}
                {", " + addressData?.city || "None"}
              </Typography>
            </Box>
            <EditUserAddressDialog selectedAddressData={addressData} />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DeliveryAddressCard;
