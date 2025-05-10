import * as React from "react";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { convertToCurrency, formatDatetime } from "../../../utils/formatting";

export const OrderGridView = ({ userOrderData }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage - 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const gUserOrderLists = (userOrderData || [])
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const displayedRows = gUserOrderLists.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      <List>
        {displayedRows.length > 0 &&
          displayedRows.map((order, index) => (
            <ListItem
              key={index}
              style={{ background: "#f2f2f2", marginBottom: 16 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={12}>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <Grid container flexDirection={"row"} columnSpacing={2}>
                      <Grid item xs={12} sm="auto">
                        <Typography style={{ fontWeight: "bold" }}>
                          {`#${order.orderCode}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm="auto">
                        <Chip
                          size="small"
                          label={order.status}
                          color={
                            order.status === "completed"
                              ? "success"
                              : order.status === "canceled"
                              ? "error"
                              : "primary"
                          }
                          style={{
                            textTransform: "capitalize",
                            borderRadius: "5px",
                            fontSize: 12,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/user/order/" + order._id}
                    >
                      <IconButton
                        variant="contained"
                        size="small"
                        color="primary"
                      >
                        <Visibility color="primary" />
                      </IconButton>
                    </Link>
                  </Stack>
                  <Typography color={"text.secondary"}>
                    {formatDatetime(order.createdAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {order.items.map((item, itemIndex) => (
                    <Grid
                      container
                      spacing={3}
                      key={itemIndex}
                      alignItems="center"
                    >
                      <Grid item xs={2} sm={2}>
                        <Avatar
                          alt={item.name}
                          src={item.imgUrl}
                          variant="square"
                        />
                      </Grid>
                      <Grid item xs={8} sm={8}>
                        <Typography
                          variant="body2"
                          fontSize={{ xs: "12px", sm: "14px" }}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <Typography variant="body2">
                          x{item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body2" style={{ textAlign: "right" }}>
                    Tổng cộng:{" "}
                    <strong>{convertToCurrency(order.totalAmount)}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
      </List>
      {gUserOrderLists.length > 5 && (
        <Box mt={2}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item className="w-100" xs={12} sm={6}>
              <FormControl
                style={{ minWidth: 150 }}
                variant="outlined"
                size="small"
              >
                <InputLabel>Items per page</InputLabel>
                <Select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  label="Rows per page"
                >
                  {[5, 10, 20, 50].map((rowsPerPageOption) => (
                    <MenuItem key={rowsPerPageOption} value={rowsPerPageOption}>
                      {rowsPerPageOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              container
              item
              className="w-100"
              xs={12}
              sm={6}
              flexDirection={"row"}
              justifyContent={"flex-end"}
            >
              <Pagination
                count={Math.ceil(gUserOrderLists.length / rowsPerPage)}
                page={page + 1}
                onChange={handleChangePage}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
