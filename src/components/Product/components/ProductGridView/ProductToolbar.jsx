import { Box, Stack } from "@mui/material";
import React from "react";
import ProductLimitComponent from "../ProductLimit.component";
import ProductSortComponent from "../ProductSort.component";
import { TypographyComponent } from "../../../common/UI";
import ProductSearchComponent from "../ProductSearch.component";

const ProductToolbar = ({
  isFilterOrSearchOn = false,
  totalItemCount = 0,
  sortValue = "",
  limitValue = 8,
  sortOptions = [],
  limitOptions = [],
  searchValue = "",
  isSearchOn = false,
  pending = true,
}) => {
  return (
    <Box width={"100%"}>
      <Stack
        justifyContent={"space-between"}
        direction={{ xs: "column-reverse", md: "row" }}
        sx={{
          my: 3,
        }}
        gap={2}
      >
        <Stack
          flexDirection={{ xs: "column-reverse", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={3}
        >
          <TypographyComponent
            component={"p"}
            xs={"0.85rem"}
            sm={"0.95rem"}
            md={"1.1rem"}
            style={{ fontWeight: "bold" }}
          >
            {isFilterOrSearchOn
              ? totalItemCount + " products found"
              : totalItemCount + " products"}
          </TypographyComponent>
          <ProductSearchComponent value={searchValue} isSearchOn={isSearchOn} />
        </Stack>
        <Stack
          flexDirection={{ xs: "row", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          <ProductLimitComponent
            value={limitValue}
            options={limitOptions}
            pending={pending}
          />
          <ProductSortComponent
            value={sortValue}
            options={sortOptions}
            pending={pending}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductToolbar;
