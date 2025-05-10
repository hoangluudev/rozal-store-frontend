import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[800],
    padding: "0 0.5rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    textAlign: "start",
    textWrap: "nowrap",
  },
  [`&.${tableCellClasses.head}:first-of-type`]: {
    padding: 0,
  },
  [`&.${tableCellClasses.head}:last-child`]: {
    textAlign: "right",
  },
}));
export const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    padding: "0.3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "300px",
  },
  [`&.${tableCellClasses.body}:first-of-type`]: {
    padding: 0,
  },
}));
export const StyledTableBodyRow = styled(TableRow)(({ theme }) => ({
  "&": {
    borderBottom: "1px solid #e0e0e0",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
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
