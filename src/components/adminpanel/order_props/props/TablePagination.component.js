import { TablePagination } from "@mui/material";
import useOrderManagementApi from "@/hooks/api/useOrderManagementApi";

export const OrderTablePagination = () => {
  const { fetchOrders, onFilteredOrderPageChange, onSearchedOrderPageChange } =
    useOrderManagementApi();
  const { totalOrderCount, isFilterOn, isSearchOn, currentPage, itemPerPage } =
    useOrderManagementApi().state;

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      onSearchedOrderPageChange(newPage, itemPerPage);
    } else if (isFilterOn) {
      onFilteredOrderPageChange(newPage, itemPerPage);
    } else {
      fetchOrders(newPage, itemPerPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      onSearchedOrderPageChange(0, gItemPerPage);
    } else if (isFilterOn) {
      onFilteredOrderPageChange(0, gItemPerPage);
    } else {
      fetchOrders(0, gItemPerPage);
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
      count={totalOrderCount}
      rowsPerPage={itemPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      showFirstButton
      showLastButton
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
