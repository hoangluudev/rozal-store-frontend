import * as React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useCustomSearchParams } from "../../hooks/useSearchParams";

const SelectItemPerPage = () => {
  const { setSearchParamsURLWithResetPage } = useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };
  const {
    itemPerPage,
    fetchProductPending,
    productSearchPending,
    productPending,
  } = useSelector((reduxData) => reduxData.PRODUCTS_REDUCERS);

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    updateSearchParams({ limit: newLimit }, 1);
  };
  return (
    <div className="d-flex align-items-center">
      <FormControl sx={{ minWidth: 120, mx: 1 }} size="small">
        <InputLabel id="select-item-per-page">Items per page:</InputLabel>
        <Select
          id="select-item-per-page"
          value={itemPerPage}
          disabled={
            fetchProductPending || productSearchPending || productPending
              ? true
              : false
          }
          onChange={handleLimitChange}
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectItemPerPage;
