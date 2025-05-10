import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  styled,
  tableCellClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

//Data Row
export function createData(
  id,
  orderCode,
  fullName,
  email,
  phone,
  cartItems,
  totalAmount,
  shippingMethod,
  shippingAddress,
  paymentMethod,
  progress,
  status,
  createdDate
) {
  return {
    id,
    orderCode,
    fullName,
    email,
    phone,
    cartItems,
    totalAmount,
    shippingMethod,
    shippingAddress,
    paymentMethod,
    progress,
    status,
    createdDate,
  };
}

//Method
const headCells = [
  {
    id: "orderCode",
    label: "Order Code",
  },
  {
    id: "createdDate",
    label: "Order Date",
  },
  {
    id: "fullName",
    label: "Customer",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
  },
  {
    id: "totalAmount",
    label: "Total Amount",
  },
  {
    id: "progress",
    label: "Progress Status",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4dabf5",
    color: theme.palette.common.white,
    padding: "0.5rem 0",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
//Component
export const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ fontWeight: "bold" }}>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
