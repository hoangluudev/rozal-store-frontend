import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import { SelectComponent } from "../../../../common/Input";
import { useSelector } from "react-redux";

export const FilterFormComponent = ({ value, onChange }) => {
  const { categoryOptions, brandOptions, genderOptions, statusOptions } =
    useSelector((reduxData) => reduxData.PRODUCT_ALPHA_ADMIN_REDUCERS);

  const onInputChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <SelectComponent
          label="Category"
          name="category"
          value={value.category || ""}
          onChange={(value) => {
            onInputChange("category", value);
          }}
          options={categoryOptions}
          optionValueProps="slug"
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <SelectComponent
          label="Brand"
          name="brand"
          value={value.brand || ""}
          onChange={(value) => onInputChange("brand", value)}
          options={brandOptions}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <SelectComponent
          label="Gender"
          name="gender"
          value={value.gender || ""}
          onChange={(value) => onInputChange("gender", value)}
          options={genderOptions}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <SelectComponent
          label="Status"
          name="status"
          value={value.status || ""}
          onChange={(value) => onInputChange("status", value)}
          options={statusOptions}
        />
      </FormControl>
    </React.Fragment>
  );
};
