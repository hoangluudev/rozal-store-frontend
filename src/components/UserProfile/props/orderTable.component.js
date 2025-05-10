import * as React from "react";
import {
  Chip,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { convertToCurrency, formatDatetime } from "../../../utils/formatting";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 14,
    border: "1px solid #bdbdbd",
    padding: "0 0.5rem",
    textAlign: "left",
    textWrap: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: 500,
    fontSize: 14,
    border: "1px solid #bdbdbd",
    padding: "0 0.5rem",
    textAlign: "left",
  },
  "&:first-of-type": {
    width: "max-content",
    textWrap: "nowrap",
  },
  "&:nth-of-type(3)": {
    width: "100%",
  },
}));

export const UserOrderTable = ({ userOrderData }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const gUserOrderLists = userOrderData || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function createData(id, createdDate, orderCode, items, totalAmount, status) {
    return { id, createdDate, orderCode, items, totalAmount, status };
  }
  const renderOrderLists = gUserOrderLists
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((order, index) => {
      return createData(
        order._id,
        order.createdAt,
        order.orderCode,
        order.items,
        order.totalAmount,
        order.status
      );
    }, []);

  const displayedRows = renderOrderLists.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Order Code</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.orderCode}>
                <StyledTableCell>
                  {formatDatetime(row.createdDate)}
                </StyledTableCell>
                <StyledTableCell>{row.orderCode}</StyledTableCell>
                <StyledTableCell>
                  {row.items.length > 0 &&
                    row.items.map((item, index) => {
                      return (
                        <Grid
                          container
                          key={index}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Grid item>
                            <Typography fontSize={14}>{item.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography fontSize={14}>
                              x {item.quantity}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                </StyledTableCell>
                <StyledTableCell>
                  {convertToCurrency(row.totalAmount)}
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    size="small"
                    label={row.status}
                    color={
                      row.status === "completed"
                        ? "success"
                        : row.status === "canceled"
                        ? "error"
                        : "primary"
                    }
                    style={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      fontSize: 12,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="View detail">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/user/order/" + row.id}
                    >
                      <IconButton size="small">
                        <Visibility color="primary" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderOrderLists.length > 5 ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={renderOrderLists.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <></>
      )}
    </>
  );
};
