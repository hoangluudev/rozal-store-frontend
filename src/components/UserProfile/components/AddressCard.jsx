import { VerifiedOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { SwitchComponent } from "../../common/UI";
import EditUserAddressDialog from "./EditAddressDialog";
import { DeleteOneConfirmComponent } from "../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";

const AddressCard = ({
  addressData,
  handleSetDefault = null,
  handleDelete = null,
}) => {
  const handleToggleDefault = (id, value) => {
    handleSetDefault(id, value);
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container justifyContent={{ lg: "space-between" }}>
          <Grid item xs={12} lg={10}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item>
                <Chip
                  className="px-3"
                  label="Default"
                  variant="outlined"
                  color={addressData?.isDefault ? "error" : "default"}
                  size="small"
                  icon={<VerifiedOutlined />}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="start"
                  control={
                    <SwitchComponent
                      tooltipTitle={
                        addressData?.isDefault
                          ? "Default address cannot be deselected"
                          : "Set as default"
                      }
                      value={addressData?.isDefault}
                      disabled={addressData?.isDefault}
                      onChange={(value) =>
                        handleToggleDefault(addressData._id, value)
                      }
                    />
                  }
                />
              </Grid>
            </Grid>

            <Grid
              className="mb-3"
              container
              columnGap={2}
              alignItems={"center"}
            >
              <Grid item xs={12} md={"auto"}>
                <Typography variant="h6" component="div">
                  {addressData?.fullName}
                </Typography>
              </Grid>
              <Divider
                sx={{
                  opacity: 1,
                  display: { xs: "none", md: "block" },
                }}
                orientation="vertical"
                flexItem
              />
              <Grid item xs={12} md={"auto"}>
                <Typography variant="subtitle1" color="text.secondary">
                  {addressData?.phone}
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary">
              {addressData?.address}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {addressData?.ward || "None"}
              {", " + addressData?.district || "None"}
              {", " + addressData?.city || "None"}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={2}
            flexDirection={{ lg: "column" }}
            alignItems={"flex-end"}
            gap={1}
          >
            <EditUserAddressDialog selectedAddressData={addressData} />
            <DeleteOneConfirmComponent
              handleSubmit={() => handleDelete(addressData._id)}
              buttonProps={{
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
