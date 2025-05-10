import { TablePagination } from "@mui/material";
import { useCustomSearchParams } from "../../../../../hooks/useSearchParams";

const TablePaginationComponent = ({
  fetchPending,
  totalCount,
  currentPage,
  itemPerPage,
}) => {
  const { setSearchParamURL, setSearchParamsURLWithResetPage } =
    useCustomSearchParams();

  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };
  const updateSearchParamsWithResetPage = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };

  const handleChangePage = (event, newPage) => {
    updateSearchParams({ page: newPage });
  };
  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    updateSearchParamsWithResetPage({ limit: newLimit }, 0);
  };
  return (
    <TablePagination
      sx={{
        "& p": {
          margin: 0,
        },
      }}
      disabled={fetchPending ? true : false}
      rowsPerPageOptions={[5, 10, 20, 30, 50]}
      component="div"
      count={totalCount}
      rowsPerPage={itemPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      showFirstButton
      showLastButton
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
export default TablePaginationComponent;
