import React from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useCustomSearchParams } from "../../hooks/useSearchParams";
import { useProductApi } from "@/hooks/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductSortBySelect = () => {
  const query = useQuery();
  const sortFilter = query.get("sort_by");
  const { setSearchParamURL } = useCustomSearchParams();

  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };

  const {
    filterValue,
    fetchProductPending,
    productSearchPending,
    productPending,
  } = useProductApi().state;

  const selectedSortOption = filterValue.sort_by || "";

  const handleChange = (event) => {
    const value = event.target.value;
    updateSearchParams({ sort_by: value });
  };

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "latest", label: "Latest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <FormControl size="small" sx={{ minWidth: 100, mx: 1 }}>
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        value={sortFilter || selectedSortOption}
        disabled={
          fetchProductPending || productSearchPending || productPending
            ? true
            : false
        }
        label="Sort By"
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSortBySelect;
