import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableContainer,
  Toolbar,
  Typography,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  createData,
  EnhancedTableHead,
} from "./customer_props/customer_TableProps";
import { CustomerTableBody } from "./customer_props/Customer_TableBody.component";
import { ModalConfirmDeleteMultipleUser } from "./customer_modal/confirmDeleteMultipleUser.component";
import { CustomerSearchText } from "./customer_props/searchDropdown.component";
import { CustomerFilterDropdown } from "./customer_props/customerFilterDropdown.component";
import { PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CustomerTablePagination } from "./customer_props/props/TablePagination.component";
import useUserManagementApi from "@/hooks/api/useUserManagementApi";

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const ManageCustomerComponent = () => {
  const {
    fetchClients,
    onFilteredCustomerPageChange,
    onSearchedCustomerPageChange,
  } = useUserManagementApi();
  const {
    customerDataLists,
    filteredCustomerLists,
    searchedCustomerLists,
    isFilterOn,
    isSearchOn,
    currentPage,
    itemPerPage,
  } = useUserManagementApi().state;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selectedCell, setSelectedCell] = React.useState([]);

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

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
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} user selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Customers
          </Typography>
        )}
        <CustomerSearchText />
        <Tooltip title="Add new User">
          <Link to={"/admin-panel/customer/add-customer"}>
            <IconButton color="success">
              <PersonAdd />
            </IconButton>
          </Link>
        </Tooltip>
        {numSelected > 0 ? (
          <ModalConfirmDeleteMultipleUser />
        ) : (
          <CustomerFilterDropdown />
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const customerList = isSearchOn
    ? searchedCustomerLists
    : isFilterOn
    ? filteredCustomerLists
    : customerDataLists || [];

  const renderCustomerLists = customerList.map((client, index) => {
    return createData(
      client._id,
      client.fullName,
      client.profileImage,
      client.role.name,
      client.username,
      client.email,
      client.phone,
      client.gender,
      client.createdAt
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = renderCustomerLists.map((n) => n.id);
      setSelectedCell(newSelected);
      return;
    }
    setSelectedCell([]);
  };

  React.useEffect(() => {
    if (isSearchOn) {
      onSearchedCustomerPageChange(currentPage, itemPerPage);
    } else if (isFilterOn) {
      onFilteredCustomerPageChange(currentPage, itemPerPage);
    } else {
      fetchClients(currentPage, itemPerPage);
    }
  }, [
    isFilterOn,
    isSearchOn,
    currentPage,
    itemPerPage,
    onSearchedCustomerPageChange,
    onFilteredCustomerPageChange,
    fetchClients,
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
              rowCount={renderCustomerLists.length}
            />
            <CustomerTableBody
              order={order}
              orderBy={orderBy}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              dataRowLists={renderCustomerLists}
            />
          </Table>
        </TableContainer>
        <CustomerTablePagination />
      </Paper>
    </Box>
  );
};
