import { Grid, Pagination } from "@mui/material";
import React from "react";
import { useCustomSearchParams } from "../../../../hooks/useSearchParams";
import { handleScrollToTop } from "../../../../services/scrollToTop";

const PaginationComponent = ({
  pending = true,
  totalPage = 0,
  currentPage = 0,
  align = "right",
  sx = {},
}) => {
  const { setSearchParamURL } = useCustomSearchParams();
  const [isPageChanging, setIsPageChanging] = React.useState(false);

  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };

  const onPageChange = (event, newPage) => {
    if (newPage !== currentPage) {
      updateSearchParams({ page: newPage });
      setIsPageChanging(true);
    }
  };

  React.useEffect(() => {
    if (isPageChanging && !pending) {
      setTimeout(() => {
        handleScrollToTop();
        setIsPageChanging(false);
      }, 500);
    }
  }, [isPageChanging, pending]);

  return (
    <Grid
      container
      item
      justifyContent={
        align === "left"
          ? "flex-start"
          : align === "center"
          ? "center"
          : align === "right"
          ? "flex-end"
          : "flex-end"
      }
      lg={12}
      md={12}
      sm={12}
      xs={12}
      mt={3}
      sx={sx}
    >
      <Pagination
        disabled={pending}
        count={totalPage}
        page={currentPage}
        onChange={onPageChange}
      />
    </Grid>
  );
};

export default PaginationComponent;
