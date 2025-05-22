import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableContainer,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AddCircle, Autorenew } from "@mui/icons-material";
import { createData, EnhancedTableHead } from "./props/TableDataset";
import { Link, useLocation } from "react-router-dom";
import { TablePaginationComponent, TypographyComponent } from "../../common/UI";
import { SearchParamsDropdown } from "../../common/Input";
import { TableBodyComponent } from "./props/TableBody";
import { DeleteMultipleConfirmComponent } from "../../common/Dialog/DeleteConfirm/MultipleDeleteConfirm";
import { useCategoryApi } from "@/hooks/api";

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const ManageCategory = () => {
  const { deleteMultipleCategoryByID, fetchCategory, getSelectedIDs } =
    useCategoryApi();
  const {
    categoryDataLists,
    selectedCategoryIDs,
    fetchCategoryPending,
    isUpdateCategorySuccess,
    isDeleteCategorySuccess,
    totalItemCount,
    currentPage,
    itemPerPage,
    isSearchOn,
    searchValue,
  } = useCategoryApi().state;
  const location = useLocation();

  const filterValue = location.search;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selectedCell, setSelectedCell] = React.useState([]);

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    const handleRefresh = () => {
      fetchCategory(filterValue);
    };
    const handleDeleteMultiple = () => {
      deleteMultipleCategoryByID(selectedCategoryIDs);
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
          <TypographyComponent
            sx={{ flex: "1 1 100%", py: { xs: 1, sm: 1 } }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} items selected
          </TypographyComponent>
        ) : (
          <TypographyComponent
            sx={{ flex: "1 1 100%", py: { xs: 1, sm: 1 } }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Categories
          </TypographyComponent>
        )}
        <SearchParamsDropdown
          searchValue={searchValue}
          isSearchOn={isSearchOn}
          TextFieldProps={{
            name: "Category-search",
            label: "Search...",
            placeholder: "Search by name...",
            variant: "standard",
          }}
        />
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <Autorenew color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="New Category">
          <Link to={"/admin-panel/product-alpha/categories/add-category"}>
            <IconButton color="success">
              <AddCircle />
            </IconButton>
          </Link>
        </Tooltip>
        {numSelected > 0 ? (
          <DeleteMultipleConfirmComponent
            handleSubmit={handleDeleteMultiple}
            itemLength={selectedCategoryIDs.length}
          />
        ) : (
          <></>
        )}
      </Toolbar>
    );
  };
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const renderLists = categoryDataLists?.map((category, index) => {
    return createData(
      category._id,
      category.name,
      category.slug,
      category.avatarImage,
      category.productCount,
      category.description,
      category.isPublished
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = renderLists.map((n) => n.id);
      setSelectedCell(newSelected);
      getSelectedIDs(newSelected);
      return;
    }
    setSelectedCell([]);
    getSelectedIDs([]);
  };

  React.useEffect(() => {
    fetchCategory(filterValue);
  }, [fetchCategory, filterValue]);
  React.useEffect(() => {
    if (isUpdateCategorySuccess || isDeleteCategorySuccess) {
      fetchCategory(filterValue);
    }
  }, [
    filterValue,
    isUpdateCategorySuccess,
    isDeleteCategorySuccess,
    fetchCategory,
  ]);

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
              rowCount={renderLists.length}
            />
            <TableBodyComponent
              order={order}
              orderBy={orderBy}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              dataRowLists={renderLists}
            />
          </Table>
        </TableContainer>
        <TablePaginationComponent
          fetchPending={fetchCategoryPending}
          totalCount={totalItemCount}
          currentPage={currentPage}
          itemPerPage={itemPerPage}
        />
      </Paper>
    </Box>
  );
};
