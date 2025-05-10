import React from "react";
import { Box } from "@mui/material";
import ProductGridView from "../components/ProductGridView";
import { useLocation } from "react-router-dom";
import ProductToolbar from "../components/ProductGridView/ProductToolbar";
import ProductFilterDrawer from "../components/ProductFilter";
import { PaginationComponent } from "../../common/UI";
import { useProductApi } from "../../../hooks/api";

const ShopProductSection = () => {
  const location = useLocation();
  const filterParamsData = location.search;
  const { fetchProductFilterOptions, fetchProducts } = useProductApi();
  const {
    fetchProductPending,
    productLists,
    totalItemCount,
    currentPage,
    totalPage,
    itemPerPage,
    isSearchOn,
    searchValue,
    isFilterOn,
    filterValue,
    sortValue,
    filterOptions,
  } = useProductApi().state;

  const limitOptions = [10, 20, 40, 50];
  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "top-sellers", label: "Top Sellers" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  React.useEffect(() => {
    fetchProducts(filterParamsData);
  }, [fetchProducts, filterParamsData]);
  React.useEffect(() => {
    fetchProductFilterOptions();
  }, [fetchProductFilterOptions]);
  return (
    <Box sx={{ width: "100%" }}>
      <ProductFilterDrawer
        filterValue={filterValue}
        filterOptionsData={filterOptions}
        isFilterOn={isFilterOn}
      />
      <ProductToolbar
        totalItemCount={totalItemCount}
        limitValue={itemPerPage}
        sortValue={sortValue}
        limitOptions={limitOptions}
        sortOptions={sortOptions}
        isFilterOrSearchOn={isSearchOn || isFilterOn}
        searchValue={searchValue}
        isSearchOn={isSearchOn}
        pending={fetchProductPending}
      />
      <ProductGridView
        productData={productLists}
        productDetailUrl={"/products-alpha/"}
        pending={fetchProductPending}
      />
      <PaginationComponent
        pending={fetchProductPending}
        currentPage={currentPage}
        totalPage={totalPage}
      />
    </Box>
  );
};

export default ShopProductSection;
