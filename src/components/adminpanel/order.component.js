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
  IconButton,
  Tooltip,
} from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { createData, EnhancedTableHead } from "./order_props/order_TableProps";
import { OrderTableBody } from "./order_props/Order_TableBody.component";
import {
  fetchOrders,
  onFilteredOrderPageChange,
  onSearchedOrderPageChange,
} from "../../actions/admin/orderManagement.action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteMultiOrderModal } from "./order_modal/deleteMultiOrderConfirm.component";
import { OrderSearchText } from "./order_props/searchDropdown.component";
import { OrderFilterDropdown } from "./order_props/orderFilterDropdown.component";
import { OrderTablePagination } from "./order_props/props/TablePagination.component";

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const ManageOrderComponent = () => {
  const dispatch = useDispatch();
  const {
    orderDataLists,
    filteredOrderLists,
    searchedOrderLists,
    isFilterOn,
    isSearchOn,
    currentPage,
    itemPerPage,
  } = useSelector((reduxData) => reduxData.ORDERS_ADMIN_REDUCERS);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selectedCell, setSelectedCell] = React.useState([]);

  const EnhancedTableToolbar = (props) => {
    const dispatch = useDispatch();
    const { numSelected } = props;

    const handleReloadOrder = () => {
      dispatch(fetchOrders(0, 10));
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
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} orders selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Orders
          </Typography>
        )}
        <OrderSearchText />
        <Tooltip title="Refresh Orders">
          <IconButton onClick={handleReloadOrder}>
            <Autorenew color="primary" />
          </IconButton>
        </Tooltip>

        {numSelected > 0 ? <DeleteMultiOrderModal /> : <OrderFilterDropdown />}
      </Toolbar>
    );
  };
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const orderList = isSearchOn
    ? searchedOrderLists
    : isFilterOn
    ? filteredOrderLists
    : orderDataLists || [];

  const renderOrderLists = orderList.map((order, index) => {
    return createData(
      order._id,
      order.orderCode,
      order.fullName,
      order.email,
      order.phone,
      order.cartItems,
      order.totalAmount,
      order.shippingMethod,
      order.shippingAddress,
      order.paymentMethod,
      order.progress,
      order.status,
      order.createdAt
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = renderOrderLists.map((n) => n.id);
      setSelectedCell(newSelected);
      return;
    }
    setSelectedCell([]);
  };

  React.useEffect(() => {
    if (isSearchOn) {
      dispatch(onSearchedOrderPageChange(currentPage, itemPerPage));
    } else if (isFilterOn) {
      dispatch(onFilteredOrderPageChange(currentPage, itemPerPage));
    } else {
      dispatch(fetchOrders(currentPage, itemPerPage));
    }
  }, [dispatch, isFilterOn, isSearchOn, currentPage, itemPerPage]);
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
              rowCount={renderOrderLists.length}
            />
            <OrderTableBody
              order={order}
              orderBy={orderBy}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              dataRowLists={renderOrderLists}
            />
          </Table>
        </TableContainer>
        <OrderTablePagination />
      </Paper>
    </Box>
  );
};
