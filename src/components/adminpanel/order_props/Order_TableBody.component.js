import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  ButtonGroup,
  styled,
  tableCellClasses,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { getComparator, stableSort } from "./order_TableProps";
import { EditOrderModal } from "../order_modal/editOrderModal.component";
import { DeleteOrderConfirmModal } from "../order_modal/deleteOrderConfirm.component";
import { LoadingElementSmallComponent } from "../../misc/LoadingElementSmall.component";
import { NoDataComponent } from "../../misc/DataNotFound.component";
import { convertToCurrency, formatDatetime } from "../../../utils/formatting";
import useOrderManagementApi from "@/hooks/api/useOrderManagementApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    padding: "0.3rem",
    textAlign: "center",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getLatestProgress = (progress) => {
  progress.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  const latest = progress[0];
  return latest;
};

export const OrderTableBody = ({
  selectedCell,
  order,
  orderBy,
  setSelectedCell,
  dataRowLists,
}) => {
  const {
    fetchOrders,
    getSelectedIDs,
    onFilteredOrderPageChange,
    onSearchedOrderPageChange,
  } = useOrderManagementApi();
  const {
    isUpdateOrderSuccess,
    deleteOrderPending,
    itemPerPage,
    isFilterOn,
    isSearchOn,
  } = useOrderManagementApi().state;

  const isSelected = (id) => selectedCell.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () => stableSort(dataRowLists, getComparator(order, orderBy)),
    [dataRowLists, order, orderBy]
  );

  const handleSelectClick = (event, id) => {
    const selectedIndex = selectedCell.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCell, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCell.slice(1));
    } else if (selectedIndex === selectedCell.length - 1) {
      newSelected = newSelected.concat(selectedCell.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCell.slice(0, selectedIndex),
        selectedCell.slice(selectedIndex + 1)
      );
    }
    setSelectedCell(newSelected);
    getSelectedIDs(newSelected);
  };
  React.useEffect(() => {
    if (deleteOrderPending) {
      setSelectedCell([]);
      getSelectedIDs([]);
    }
  }, [deleteOrderPending, getSelectedIDs, setSelectedCell]);

  React.useEffect(() => {
    if (isUpdateOrderSuccess || deleteOrderPending) {
      if (isSearchOn) {
        onSearchedOrderPageChange(0, itemPerPage);
      } else if (isFilterOn) {
        onFilteredOrderPageChange(0, itemPerPage);
      } else if (!isSearchOn && !isFilterOn) {
        fetchOrders(0, itemPerPage);
      }
    }
  }, [
    itemPerPage,
    isSearchOn,
    isFilterOn,
    isUpdateOrderSuccess,
    deleteOrderPending,
    onSearchedOrderPageChange,
    onFilteredOrderPageChange,
    fetchOrders,
  ]);

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        const gLatestProgress = getLatestProgress(row.progress || []);
        return (
          <StyledTableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
          >
            <StyledTableCell padding="checkbox">
              <Checkbox
                color="primary"
                onClick={(event) => handleSelectClick(event, row.id)}
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Typography style={{ textAlign: "start" }}>
                {row.orderCode || "None"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body2">
                {formatDatetime(row.createdDate || "")}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                <Stack flexDirection={"column"} alignItems={"flex-start"}>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {row.fullName}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize={"12px"}
                    color={"text.secondary"}
                  >
                    {row.email || "none"}
                  </Typography>
                </Stack>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>{row.paymentMethod}</StyledTableCell>
            <StyledTableCell>
              {convertToCurrency(row.totalAmount || 0)}
            </StyledTableCell>
            <StyledTableCell>
              <Chip
                label={gLatestProgress.status}
                style={{ fontWeight: "bold", fontSize: "12px" }}
                size="small"
                color={
                  gLatestProgress.status === "Delivered"
                    ? "success"
                    : gLatestProgress.status === "Out for Delivery"
                    ? "secondary"
                    : gLatestProgress.status === "On the Way"
                    ? "warning"
                    : gLatestProgress.status === "Order Packed"
                    ? "info"
                    : "primary"
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <Chip
                label={row.status}
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                size="small"
                color={
                  row.status === "completed"
                    ? "success"
                    : row.status === "canceled"
                    ? "error"
                    : "primary"
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <ButtonGroup variant="contained" size="small">
                <EditOrderModal selectedOrderData={row} />
                <DeleteOrderConfirmModal selectedOrderID={row.id} />
              </ButtonGroup>
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
      {visibleRows.length === 0 && (isSearchOn || isFilterOn) ? (
        <StyledTableRow>
          <StyledTableCell colSpan={10}>
            <NoDataComponent />
          </StyledTableCell>
        </StyledTableRow>
      ) : visibleRows.length === 0 ? (
        <StyledTableRow>
          <StyledTableCell colSpan={10}>
            <LoadingElementSmallComponent />
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <></>
      )}
    </TableBody>
  );
};
