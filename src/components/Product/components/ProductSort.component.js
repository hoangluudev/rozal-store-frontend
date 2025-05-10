import React from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useCustomSearchParams } from "../../../hooks/useSearchParams";

const ProductSortComponent = ({ value = "", options = [], pending = true }) => {
  const { setSearchParamURL } = useCustomSearchParams();

  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    updateSearchParams({ sort_by: value });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 100 }}>
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        value={value}
        disabled={pending ? true : false}
        label="Sort By"
        onChange={handleSortChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSortComponent;
