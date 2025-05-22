import * as React from "react";
import { Grid, Pagination } from "@mui/material";
import { useCustomSearchParams } from "../../hooks/useSearchParams";
import { useProductApi } from "@/hooks/api";

const PaginationSection = ({ handleScrollToTop }) => {
  const previousPageRef = React.useRef();
  const { setSearchParamURL } = useCustomSearchParams();

  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };

  const {
    totalPage,
    currentPage,
    fetchProductPending,
    productSearchPending,
    productPending,
  } = useProductApi().state;

  const onChangePagination = (event, newPage) => {
    updateSearchParams({ page: newPage });
  };
  React.useEffect(() => {
    if (previousPageRef.current !== currentPage) {
      handleScrollToTop();
      previousPageRef.current = currentPage;
    }
  }, [currentPage, handleScrollToTop]);
  return (
    <Grid
      container
      item
      justifyContent={"flex-end"}
      className="w-100"
      lg={12}
      md={12}
      sm={12}
      xs={12}
      mt={4}
    >
      <Pagination
        disabled={
          fetchProductPending || productSearchPending || productPending
            ? true
            : false
        }
        count={totalPage}
        page={currentPage}
        onChange={onChangePagination}
      />
    </Grid>
  );
};

export default PaginationSection;
