import * as React from "react";
import {
  IconButton,
  Tooltip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Badge,
  Menu,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useProductManagementApi } from "@/hooks/api";

export const ProductFilterDropdown = () => {
  const { onProductFilter, onProductSearch } = useProductManagementApi();
  const { itemPerPage, productCategoryLists, productBrandLists, isFilterOn } =
    useProductManagementApi().state;

  const categoryLists = productCategoryLists || [];
  const brandLists = productBrandLists || [];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [stockStatus, setStockStatus] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [filterInput, setFilterInput] = React.useState({});

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGenderChange = (event) => {
    const gValue = event.target.value;
    setGender(gValue);
    setFilterInput((preState) => ({
      ...preState,
      gender: gValue,
    }));
  };
  const handleCategoryChange = (event) => {
    const gValue = event.target.value;
    setCategory(gValue);
    setFilterInput((prevState) => ({
      ...prevState,
      category: gValue,
    }));
  };
  const handleBrandChange = (event) => {
    const gValue = event.target.value;
    setBrand(gValue);
    setFilterInput((prevState) => ({
      ...prevState,
      brand: gValue,
    }));
  };
  const handleStockStatusChange = (event) => {
    const gValue = event.target.value;
    setStockStatus(gValue);
    setFilterInput((prevState) => ({
      ...prevState,
      stockStatus: gValue,
    }));
  };
  const handleStatusChange = (event) => {
    const gValue = event.target.value;
    setStatus(gValue);
    setFilterInput((prevState) => ({
      ...prevState,
      status: gValue,
    }));
  };

  const handleClearFilter = () => {
    onProductFilter(0, itemPerPage, {});
    setGender("");
    setCategory("");
    setBrand("");
    setStockStatus("");
    setStatus("");
    setFilterInput({});
    handleClose();
  };
  const handleSubmitFilter = async () => {
    await onProductSearch(0, itemPerPage, "");
    await onProductFilter(0, itemPerPage, filterInput);
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Filter">
        <Badge
          color="primary"
          variant="dot"
          overlap="circular"
          invisible={!isFilterOn}
        >
          <IconButton onClick={handleOpen}>
            <FilterAlt color={isFilterOn ? "primary" : "inherit"} />
          </IconButton>
        </Badge>
      </Tooltip>
      <Menu
        id={"product-filter"}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          maxHeight: "calc(85% - 96px)",
          ul: { paddingY: "0" },
        }}
      >
        <Paper>
          <Box padding={2} width={300}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender-select-label">For Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                value={gender}
                label="For Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="unisex">Unisex</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categoryLists.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="brand-select-label">Brand</InputLabel>
              <Select
                labelId="brand-select-label"
                value={brand}
                label="Brand"
                onChange={handleBrandChange}
              >
                {brandLists.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="stock-status-select-label">
                Stock Status
              </InputLabel>
              <Select
                labelId="stock-status-select-label"
                value={stockStatus}
                label="Stock Status"
                onChange={handleStockStatusChange}
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low In Stock">Low In Stock</MenuItem>
                <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ padding: "0.3rem" }}
          >
            <Button variant="text" color="primary" onClick={handleClearFilter}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitFilter}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Menu>
    </React.Fragment>
  );
};
