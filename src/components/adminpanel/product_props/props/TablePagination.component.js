import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  onFilteredProductPageChange,
  onSearchedProductPageChange,
} from "../../../../actions/admin/productManagement.action";

export const ProductTablePagination = () => {
  const dispatch = useDispatch();
  const { totalProductCount, isFilterOn, isSearchOn, currentPage, itemPerPage } =
    useSelector((reduxData) => reduxData.PRODUCTS_ADMIN_REDUCERS);

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      dispatch(onSearchedProductPageChange(newPage, itemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredProductPageChange(newPage, itemPerPage));
    } else {
      dispatch(fetchProducts(newPage, itemPerPage));
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      dispatch(onSearchedProductPageChange(0, gItemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredProductPageChange(0, gItemPerPage));
    } else {
      dispatch(fetchProducts(0, gItemPerPage));
    }
  };
  return (
    <TablePagination
      sx={{
        "& p": {
          margin: 0,
        },
      }}
      rowsPerPageOptions={[5, 10, 20, 30, 50]}
      component="div"
      count={totalProductCount}
      rowsPerPage={itemPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      showFirstButton
      showLastButton
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
