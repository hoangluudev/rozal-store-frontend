import * as React from "react";
import { useLocation } from "react-router-dom";
import { Box, AppBar, Stack, Toolbar, Typography } from "@mui/material";
import ProductElevationScroll from "./props/filternavbar";
import PaginationSection from "./pagination.component";
import SearchTextBox from "./InputSearch.component";
import { AllProductsComponent } from "./product/allproducts.component";
import SelectItemPerPage from "./selectItemPerPage.component";
import ProductSortBySelect from "./SortProduct.component";
import { handleScrollToTop } from "../../services/scrollToTop";
import { AllFilterDropdown } from "./dropdown/filterdropdown.component";
import { searchParamsToObject } from "../../utils/helperFunctions";
import { useCustomSearchParams } from "../../hooks/useSearchParams";
import { useProductApi } from "@/hooks/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AllProductSection = () => {
  const { fetchProductsWithFilter } = useProductApi();
  const { totalProductCount, isSearchOn, isFilterOn } = useProductApi().state;
  const query = useQuery();
  const { setSearchParamsURLWithResetPage } = useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };

  const currentFilterData = searchParamsToObject(query);
  const [filterData, setFilterData] = React.useState(currentFilterData);

  const onFilterChange = (data) => {
    setFilterData(data);
  };

  const handleSubmitFilter = () => {
    updateSearchParams(filterData, 1);
  };
  const filterValue = window.location.search;

  React.useEffect(() => {
    fetchProductsWithFilter(filterValue);
  }, [fetchProductsWithFilter, filterValue]);

  return (
    <Box className="product-section mt-3">
      <Box className="mb-4">
        <ProductElevationScroll>
          <AppBar component={"header"}>
            <Toolbar className="px-0 py-2">
              <AllFilterDropdown
                filterData={filterData}
                setFilterData={onFilterChange}
                onSubmitFilter={handleSubmitFilter}
              />
            </Toolbar>
          </AppBar>
        </ProductElevationScroll>
      </Box>
      <Stack
        className="w-100 my-3 gap-3"
        justifyContent={"space-between"}
        direction={{ xs: "column-reverse", md: "row" }}
      >
        <Stack
          flexDirection={{ xs: "column-reverse", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={3}
        >
          <Typography className="fw-bold" variant="h6" component={"p"}>
            {isSearchOn || isFilterOn
              ? totalProductCount + " products found"
              : totalProductCount + " products"}
          </Typography>
          <SearchTextBox />
        </Stack>
        <Stack
          flexDirection={{ xs: "row", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          <SelectItemPerPage />
          <ProductSortBySelect />
        </Stack>
      </Stack>
      <AllProductsComponent />
      <PaginationSection handleScrollToTop={handleScrollToTop} />
    </Box>
  );
};

export default AllProductSection;
