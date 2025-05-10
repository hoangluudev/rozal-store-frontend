import {
  Box,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { StyledHeaderTableCell } from "../../../common/UI/Table/Config";

//Data Row
export function createData(
  id,
  name,
  slug,
  avatarImage,
  productCount,
  description,
  isPublished,
  categoryName
) {
  return {
    id,
    name,
    slug,
    avatarImage,
    productCount,
    description,
    isPublished,
    categoryName,
  };
}

//Method
const headCells = [
  {
    id: "avatarImage",
    label: "Icon",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "categoryName",
    label: "Category Name",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "productCount",
    label: "Product Count",
  },
  {
    id: "isPublished",
    label: "Published",
  },
  {
    id: "action",
    label: "Actions",
  },
];

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
      <TableRow>
        <StyledHeaderTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </StyledHeaderTableCell>
        {headCells.map((headCell, index) => (
          <StyledHeaderTableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "action" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </StyledHeaderTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
