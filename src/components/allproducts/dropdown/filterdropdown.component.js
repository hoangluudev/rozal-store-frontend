import * as React from "react";
import {
  Box,
  Button,
  Menu,
  Paper,
  List,
  Typography,
  AppBar,
  Toolbar,
  Tooltip,
  Divider,
  ListItem,
  Chip,
  Stack,
} from "@mui/material";
import {
  FilterAltOutlined,
  ArrowDropDown,
  ArrowDropUp,
  RestartAlt,
} from "@mui/icons-material";
import { CategoryFilter } from "../props/category.component";
import { PriceRangeFilter } from "../props/price.component";
import { BrandFilter } from "../props/brand.component";
import { GenderFilter } from "../props/gender.component";
import { useCustomSearchParams } from "../../../hooks/useSearchParams";
import { useProductApi } from "@/hooks/api";

export const AllFilterDropdown = ({
  filterData,
  setFilterData,
  onSubmitFilter,
}) => {
  const { isFilterOn, filterValue, productLists } = useProductApi().state;

  const { resetSearchParamURL, removeSearchParamURL } = useCustomSearchParams();

  const productData = productLists || [];
  const currentFilteredData = productLists || [];

  const [anchorProductFilter, setAnchorProductFilter] = React.useState(null);

  const handleOpenFilter = (event) => {
    setAnchorProductFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorProductFilter(null);
  };

  const onCategoriesChange = (data) => {
    setFilterData((prevFilteredProduct) => ({
      ...prevFilteredProduct,
      category: data,
    }));
  };
  const onPriceFilterChange = (data) => {
    setFilterData((prevFilteredProduct) => ({
      ...prevFilteredProduct,
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
    }));
  };
  const onBrandChange = (data) => {
    setFilterData((prevFilteredProduct) => ({
      ...prevFilteredProduct,
      brand: data,
    }));
  };
  const onGenderChange = (data) => {
    setFilterData((prevFilteredProduct) => ({
      ...prevFilteredProduct,
      gender: data,
    }));
  };

  const handleResetFilter = () => {
    setFilterData({});
    resetSearchParamURL();
  };
  const handleClearFilter = () => {
    handleCloseFilter();
    handleResetFilter();
  };
  const handleSubmitFilter = () => {
    onSubmitFilter();
    handleCloseFilter();
  };

  const handleDelete = (key) => () => {
    setFilterData((prevFilterValue) => {
      const newFilterValue = { ...prevFilterValue };
      delete newFilterValue[key];
      removeSearchParamURL(key);
      return newFilterValue;
    });
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Stack flexDirection={"row"}>
        <Button
          style={{
            padding: "8px 16px",
            background: "transparent",
            color: "black",
          }}
          variant="contained"
          onClick={handleOpenFilter}
        >
          <FilterAltOutlined />
          <Typography className="text-capitalize">Filter</Typography>
          {anchorProductFilter ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
        {isFilterOn ? (
          <Tooltip title="Reset Filter">
            <Button
              onClick={handleResetFilter}
              style={{
                marginLeft: "5px",
                padding: "8px 0",
              }}
              color="error"
              variant="contained"
            >
              <RestartAlt />
            </Button>
          </Tooltip>
        ) : (
          <></>
        )}
        {filterValue ? (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              listStyle: "none",
              p: 0.5,
              m: 0,
              ml: 2,
            }}
            elevation={0}
            component="ul"
          >
            {Object.keys(filterValue).map((key) => {
              const value = filterValue[key];
              const label = `${
                key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
              }: ${Array.isArray(value) ? value.join(", ") : value}`;
              return (
                <ListItem
                  key={key}
                  sx={{
                    p: 0.5,
                  }}
                >
                  <Chip label={label} onDelete={handleDelete(key)} />
                </ListItem>
              );
            })}
          </Paper>
        ) : (
          <></>
        )}
      </Stack>

      <Menu
        sx={{
          mt: "45px",
          maxHeight: "calc(85% - 96px)",
          ul: { paddingY: "0" },
        }}
        style={{ paddingBottom: "0px" }}
        id="menu-appbar"
        anchorEl={anchorProductFilter}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        disableScrollLock={true}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorProductFilter)}
        onClose={() => setAnchorProductFilter(null)}
      >
        <Paper square xs={{ paddingBottom: "1rem" }}>
          <List>
            <CategoryFilter
              selectedValue={filterData}
              onChange={onCategoriesChange}
            />
            <Divider className="my-2" variant="middle" component="li" />
            <PriceRangeFilter
              productDataList={productData}
              filteredData={currentFilteredData}
              onChange={onPriceFilterChange}
            />
            <Divider className="my-2" variant="middle" component="li" />
            <BrandFilter selectedValue={filterData} onChange={onBrandChange} />
            <Divider className="my-2" variant="middle" component="li" />
            <GenderFilter
              selectedValue={filterData}
              onChange={onGenderChange}
            />
          </List>
        </Paper>
        <AppBar
          className="flex-row justify-content-center"
          position="sticky"
          color="default"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar className="gap-3">
            <Button
              onClick={handleClearFilter}
              color="inherit"
              variant="contained"
            >
              Clear
            </Button>
            <Button
              onClick={handleSubmitFilter}
              color="error"
              variant="contained"
            >
              See result
            </Button>
          </Toolbar>
        </AppBar>
      </Menu>
    </Box>
  );
};
