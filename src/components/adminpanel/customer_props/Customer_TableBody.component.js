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
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { getComparator, stableSort } from "./customer_TableProps";
import { ModalEditCustomer } from "../customer_modal/modalEditCustomer.component";
import { ModalConfirmDeleteUser } from "../customer_modal/confirmDeleteUser.component";
import {
  fetchClients,
  getSelectedIDs,
  onFilteredCustomerPageChange,
  onSearchedCustomerPageChange,
} from "../../../actions/admin/userManagement.action";
import { useDispatch, useSelector } from "react-redux";
import { NoDataComponent } from "../../misc/DataNotFound.component";
import { LoadingElementSmallComponent } from "../../misc/LoadingElementSmall.component";
import { formatDatetime, getShortedCharacter } from "../../../utils/formatting";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    padding: "0.3rem",
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

export const CustomerTableBody = ({
  selectedCell,
  order,
  orderBy,
  setSelectedCell,
  dataRowLists,
}) => {
  const dispatch = useDispatch();
  const {
    createCustomerPending,
    updateCustomerPending,
    deleteUserPending,
    itemPerPage,
    isSearchOn,
    isFilterOn,
  } = useSelector((reduxData) => reduxData.USERS_ADMIN_REDUCERS);
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
    dispatch(getSelectedIDs(newSelected));
  };
  React.useEffect(() => {
    if (deleteUserPending) {
      setSelectedCell([]);
      dispatch(getSelectedIDs([]));
    }
  }, [dispatch, deleteUserPending, setSelectedCell]);

  React.useEffect(() => {
    if (createCustomerPending || updateCustomerPending || deleteUserPending) {
      if (isSearchOn) {
        dispatch(onSearchedCustomerPageChange(0, itemPerPage));
      } else if (isFilterOn) {
        dispatch(onFilteredCustomerPageChange(0, itemPerPage));
      } else if (!isSearchOn && !isFilterOn) {
        dispatch(fetchClients(0, itemPerPage));
      }
    }
  }, [
    dispatch,
    createCustomerPending,
    itemPerPage,
    deleteUserPending,
    updateCustomerPending,
    isSearchOn,
    isFilterOn,
  ]);
  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

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
              <Tooltip title={row.id}>
                <IconButton>
                  <Info color="info" />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>
              <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                {row.profileImage ? (
                  <Avatar alt="" src={row.profileImage || ""} />
                ) : (
                  <Avatar alt="Profile Picture">
                    {getShortedCharacter(row.fullName)}
                  </Avatar>
                )}
                <Stack flexDirection={"column"}>
                  <Typography variant="body2" className="fw-bold">
                    {row.fullName}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="fw-semibold text-capitalize"
                    fontSize={"12px"}
                    color={"text.secondary"}
                  >
                    {row.role || "none"}
                  </Typography>
                </Stack>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>{row.username}</StyledTableCell>
            <StyledTableCell>{row.email}</StyledTableCell>
            <StyledTableCell>{row.phone}</StyledTableCell>
            <StyledTableCell>{row.gender}</StyledTableCell>
            <StyledTableCell>{formatDatetime(row.joinDate)}</StyledTableCell>
            <StyledTableCell>
              <ButtonGroup variant="contained" size="small">
                <ModalEditCustomer userData={row} />
                <ModalConfirmDeleteUser userID={row.id} />
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
