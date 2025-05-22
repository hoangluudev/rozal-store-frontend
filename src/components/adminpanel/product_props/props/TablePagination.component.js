import { TablePagination } from "@mui/material";
import { useProductManagementApi } from "@/hooks/api";

export const ProductTablePagination = () => {
  const {
    fetchProducts,
    onFilteredProductPageChange,
    onSearchedProductPageChange,
  } = useProductManagementApi();
  const {
    totalProductCount,
    isFilterOn,
    isSearchOn,
    currentPage,
    itemPerPage,
  } = useProductManagementApi().state;

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      onSearchedProductPageChange(newPage, itemPerPage);
    } else if (isFilterOn) {
      onFilteredProductPageChange(newPage, itemPerPage);
    } else {
      fetchProducts(newPage, itemPerPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      onSearchedProductPageChange(0, gItemPerPage);
    } else if (isFilterOn) {
      onFilteredProductPageChange(0, gItemPerPage);
    } else {
      fetchProducts(0, gItemPerPage);
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
