import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableContainer,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AddCircle, Autorenew } from "@mui/icons-material";
import { createData, EnhancedTableHead } from "./props/TableDataset";
import { Link, useLocation } from "react-router-dom";
import { TableBodyComponent } from "./props/TableBody";
import { DeleteMultipleConfirmComponent } from "../../common/Dialog/DeleteConfirm/MultipleDeleteConfirm";
import { TablePaginationComponent, TypographyComponent } from "../../common/UI";
import { FilterParamsDropdown, SearchParamsDropdown } from "../../common/Input";
import { FilterFormComponent } from "./component/form/filterForm.component";
import { useProductManagementApi } from "../../../hooks/api";

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const ManageProductAlphaComponent = () => {
  const location = useLocation();
  const { deleteMultipleSubcategoryByID, fetchProducts, getSelectedIDs } =
    useProductManagementApi();
  const {
    productDataLists,
    selectedProductIDs,
    fetchProductPending,
    isUpdateProductSuccess,
    isDeleteProductSuccess,
    totalItemCount,
    currentPage,
    itemPerPage,
    isSearchOn,
    searchValue,
    isFilterOn,
    filterValue,
  } = useProductManagementApi().state;

  const filterParamsData = location.search;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selectedCell, setSelectedCell] = React.useState([]);

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    const handleRefresh = () => {
      fetchProducts(filterParamsData);
    };
    const handleDeleteMultiple = () => {
      deleteMultipleSubcategoryByID(selectedProductIDs);
    };
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "space-between",
        }}
      >
        {numSelected > 0 ? (
          <TypographyComponent
            sx={{ flex: "1 1 100%", py: { xs: 1, sm: 1 } }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} items selected
          </TypographyComponent>
        ) : (
          <TypographyComponent
            sx={{ flex: "1 1 100%", py: { xs: 1, sm: 1 } }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Products
          </TypographyComponent>
        )}
        <SearchParamsDropdown
          searchValue={searchValue}
          isSearchOn={isSearchOn}
          TextFieldProps={{
            name: "Product-search",
            label: "Search...",
            placeholder: "Search by name...",
            variant: "standard",
          }}
        />
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <Autorenew color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="New Product">
          <Link to={"/admin-panel/product-alpha/add-product-alpha"}>
            <IconButton color="success">
              <AddCircle />
            </IconButton>
          </Link>
        </Tooltip>
        {numSelected > 0 ? (
          <DeleteMultipleConfirmComponent
            handleSubmit={handleDeleteMultiple}
            itemLength={selectedProductIDs.length}
          />
        ) : (
          <FilterParamsDropdown
            value={filterValue}
            isFilterOn={isFilterOn}
            children={<FilterFormComponent />}
          />
        )}
      </Toolbar>
    );
  };
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const renderDataList = productDataLists || [];

  const renderLists = renderDataList.map((product, index) => {
    return createData(
      product._id,
      product.name,
      product.avatarImage,
      product.category,
      product.brand,
      product.productType,
      product.stock,
      product.status,
      product.category._id,
      product.productType._id,
      product.hasVariation,
      product.variantStats,
      product.isPublished
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = renderLists.map((n) => n.id);
      setSelectedCell(newSelected);
      getSelectedIDs(newSelected);
      return;
    }
    setSelectedCell([]);
    getSelectedIDs([]);
  };

  React.useEffect(() => {
    fetchProducts(filterParamsData);
  }, [fetchProducts, filterParamsData]);
  React.useEffect(() => {
    if (isUpdateProductSuccess || isDeleteProductSuccess) {
      fetchProducts(filterParamsData);
    }
  }, [
    filterParamsData,
    isUpdateProductSuccess,
    isDeleteProductSuccess,
    fetchProducts,
  ]);

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <EnhancedTableToolbar numSelected={selectedCell.length} />
        <TableContainer>
          <Table sx={{ width: "100%" }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selectedCell.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={renderLists.length}
            />
            <TableBodyComponent
              order={order}
              orderBy={orderBy}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              dataRowLists={renderLists}
            />
          </Table>
        </TableContainer>
        <TablePaginationComponent
          fetchPending={fetchProductPending}
          totalCount={totalItemCount}
          currentPage={currentPage}
          itemPerPage={itemPerPage}
        />
      </Paper>
    </Box>
  );
};
