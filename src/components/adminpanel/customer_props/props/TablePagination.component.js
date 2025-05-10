import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  onFilteredCustomerPageChange,
  onSearchedCustomerPageChange,
} from "../../../../actions/admin/userManagement.action";

export const CustomerTablePagination = () => {
  const dispatch = useDispatch();
  const { totalClientCount, isFilterOn, isSearchOn, currentPage, itemPerPage } =
    useSelector((reduxData) => reduxData.USERS_ADMIN_REDUCERS);

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      dispatch(onSearchedCustomerPageChange(newPage, itemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredCustomerPageChange(newPage, itemPerPage));
    } else {
      dispatch(fetchClients(newPage, itemPerPage));
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      dispatch(onSearchedCustomerPageChange(0, gItemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredCustomerPageChange(0, gItemPerPage));
    } else {
      dispatch(fetchClients(0, gItemPerPage));
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
      count={totalClientCount}
      rowsPerPage={itemPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      showFirstButton
      showLastButton
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
