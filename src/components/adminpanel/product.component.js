import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableContainer,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AddCircle, Autorenew } from "@mui/icons-material";
import {
  createData,
  EnhancedTableHead,
} from "./product_props/product_TableProps";
import { ProductTableBody } from "./product_props/Product_TableBody.component";
import {
  fetchProducts,
  onFilteredProductPageChange,
  onSearchedProductPageChange,
} from "../../actions/admin/productManagement.action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteMultiProductModal } from "./product_modal/deleteMultiProductConfirm.component";
import { ProductSearchText } from "./product_props/searchDropdown.component";
import { ProductFilterDropdown } from "./product_props/productFilterDropdown.component";
import { ProductTablePagination } from "./product_props/props/TablePagination.component";
import { Link } from "react-router-dom";

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const ManageProductComponent = () => {
  const dispatch = useDispatch();
  const {
    productDataLists,
    searchedProductLists,
    filteredProductLists,
    isFilterOn,
    isSearchOn,
    currentPage,
    itemPerPage,
  } = useSelector((reduxData) => reduxData.PRODUCTS_ADMIN_REDUCERS);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selectedCell, setSelectedCell] = React.useState([]);

  const EnhancedTableToolbar = (props) => {
    const dispatch = useDispatch();
    const { numSelected } = props;

    const handleReloadProduct = () => {
      dispatch(fetchProducts(0, 10));
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
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} product selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Products
          </Typography>
        )}
        <ProductSearchText />
        <Tooltip title="Refresh Products">
          <IconButton onClick={handleReloadProduct}>
            <Autorenew color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="New Product">
          <Link to={"/admin-panel/product/add-product"}>
            <IconButton color="success">
              <AddCircle />
            </IconButton>
          </Link>
        </Tooltip>
        {numSelected > 0 ? (
          <DeleteMultiProductModal />
        ) : (
          <ProductFilterDropdown />
        )}
      </Toolbar>
    );
  };
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const productLists = isSearchOn
    ? searchedProductLists
    : isFilterOn
    ? filteredProductLists
    : productDataLists || [];

  const renderProductLists = productLists.map((product, index) => {
    return createData(
      product._id,
      product.productCode,
      product.name,
      product.category,
      product.brand,
      product.imgUrl,
      product.productStatus,
      product.stock.stockQuantity,
      product.stock.stockStatus,
      product.buyPrice,
      product.promotionPrice,
      product.description,
      product.forGender,
      product.isPopular,
      product.size,
      product.color
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = renderProductLists.map((n) => n.id);
      setSelectedCell(newSelected);
      return;
    }
    setSelectedCell([]);
  };

  React.useEffect(() => {
    if (isSearchOn) {
      dispatch(onSearchedProductPageChange(currentPage, itemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredProductPageChange(currentPage, itemPerPage));
    } else {
      dispatch(fetchProducts(currentPage, itemPerPage));
    }
  }, [dispatch, currentPage, itemPerPage, isFilterOn, isSearchOn]);
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
              rowCount={renderProductLists.length}
            />
            <ProductTableBody
              order={order}
              orderBy={orderBy}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              dataRowLists={renderProductLists}
            />
          </Table>
        </TableContainer>
        <ProductTablePagination />
      </Paper>
    </Box>
  );
};
