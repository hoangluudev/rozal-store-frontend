import React from "react";
import { useSelector } from "react-redux";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { RadioButtonSelect, TextFieldComponent } from "../../common/Input";
import { SwitchComponent } from "../../common/UI";
import { FormFieldComponent } from "../../common/Layout";

const AddressForm = ({
  formData,
  onChange,
  formSubmitted,
  addressData = {},
  onAddressChange = null,
}) => {
  const {
    fetchCityPending,
    cityDataLists,
    fetchDistrictPending,
    districtDataLists,
    fetchWardPending,
    wardDataLists,
  } = useSelector((reduxData) => reduxData.ADDRESS_REDUCERS);

  const onInputChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box width="100%" sx={{ mt: 3 }}>
      <Grid container item rowGap={2} columnSpacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldComponent
            fullWidth
            name="fullName"
            label="Full Name"
            error={!formData.fullName && formSubmitted}
            helperText={!formData.fullName && formSubmitted ? "*required" : ""}
            value={formData.fullName}
            onChange={(value) => onInputChange("fullName", value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldComponent
            fullWidth
            name="phone"
            label="Phone"
            error={!formData.phone && formSubmitted}
            helperText={!formData.phone && formSubmitted ? "*required" : ""}
            value={formData.phone}
            onChange={(value) => onInputChange("phone", value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            freeSolo
            loading={fetchCityPending}
            value={addressData}
            options={cityDataLists || []}
            onChange={(e, value) => onAddressChange("city", value)}
            getOptionLabel={(option) => option.province_name}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                variant="outlined"
                error={!formData.city && formSubmitted}
                helperText={!formData.city && formSubmitted ? "*required" : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            loading={fetchDistrictPending}
            value={addressData}
            options={districtDataLists || []}
            onChange={(e, value) => onAddressChange("district", value)}
            getOptionLabel={(option) => option.district_name}
            fullWidth
            disabled={addressData.province_name === ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="District"
                variant="outlined"
                error={!formData.district && formSubmitted}
                helperText={
                  !formData.district && formSubmitted ? "*required" : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            loading={fetchWardPending}
            value={addressData}
            options={wardDataLists || []}
            onChange={(e, value) => onAddressChange("ward", value)}
            getOptionLabel={(option) => option.ward_name}
            fullWidth
            disabled={addressData.district_name === ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ward"
                variant="outlined"
                error={!formData.ward && formSubmitted}
                helperText={!formData.ward && formSubmitted ? "*required" : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldComponent
            fullWidth
            name="address"
            label="Street Name, Building, House No."
            error={!formData.address && formSubmitted}
            helperText={!formData.address && formSubmitted ? "*required" : ""}
            value={formData.address}
            onChange={(value) => onInputChange("address", value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Set as Default"
            control={
              <SwitchComponent
                id="isDefault"
                name="isDefault"
                value={formData.isDefault}
                onChange={(value) => onInputChange("isDefault", value)}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormFieldComponent isColumn label={"Label as"}>
            <RadioButtonSelect
              value={formData.label}
              onChange={(value) => onInputChange("label", value)}
              options={["Home", "Work"]}
              buttonColor="error"
              isArrayString
            />
          </FormFieldComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;
