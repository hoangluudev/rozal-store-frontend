import * as React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useCustomSearchParams } from "../../../hooks/useSearchParams";

const ProductLimitComponent = ({
  value = 8,
  pending = true,
  options = [8],
}) => {
  const { setSearchParamsURLWithResetPage } = useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    updateSearchParams({ limit: newLimit }, 1);
  };
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="select-item-per-page">Items per page:</InputLabel>
      <Select
        id="select-item-per-page"
        value={value}
        label="Items per page"
        disabled={pending ? true : false}
        onChange={handleLimitChange}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductLimitComponent;
