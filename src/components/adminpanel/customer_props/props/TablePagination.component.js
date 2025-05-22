import { TablePagination } from "@mui/material";
import useUserManagementApi from "@/hooks/api/useUserManagementApi";

export const CustomerTablePagination = () => {
  const {
    fetchClients,
    onFilteredCustomerPageChange,
    onSearchedCustomerPageChange,
  } = useUserManagementApi();
  const { totalClientCount, isFilterOn, isSearchOn, currentPage, itemPerPage } =
    useUserManagementApi().state;

  const handleChangePage = (event, newPage) => {
    if (isSearchOn) {
      onSearchedCustomerPageChange(newPage, itemPerPage);
    } else if (isFilterOn) {
      onFilteredCustomerPageChange(newPage, itemPerPage);
    } else {
      fetchClients(newPage, itemPerPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const gItemPerPage = parseInt(event.target.value, 10);
    if (isSearchOn) {
      onSearchedCustomerPageChange(0, gItemPerPage);
    } else if (isFilterOn) {
      onFilteredCustomerPageChange(0, gItemPerPage);
    } else {
      fetchClients(0, gItemPerPage);
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
