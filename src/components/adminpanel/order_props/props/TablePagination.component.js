import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  onFilteredOrderPageChange,
  onSearchedOrderPageChange,
} from "../../../../actions/admin/orderManagement.action";

export const OrderTablePagination = () => {
  const dispatch = useDispatch();
  const { totalOrderCount, isFilterOn, isSearchOn, currentPage, itemPerPage } =
    useSelector((reduxData) => reduxData.ORDERS_ADMIN_REDUCERS);

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      dispatch(onSearchedOrderPageChange(newPage, itemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredOrderPageChange(newPage, itemPerPage));
    } else {
      dispatch(fetchOrders(newPage, itemPerPage));
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      dispatch(onSearchedOrderPageChange(0, gItemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredOrderPageChange(0, gItemPerPage));
    } else {
      dispatch(fetchOrders(0, gItemPerPage));
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
