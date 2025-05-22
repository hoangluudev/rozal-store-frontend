import * as React from "react";
import { TableBody, Checkbox, Typography, Stack } from "@mui/material";
import {
  getComparator,
  stableSort,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from "../../../common/UI/Table/Config";
import { LoadingElementSmallComponent } from "../../../misc/LoadingElementSmall.component";
import { NoDataComponent } from "../../../misc/DataNotFound.component";
import { DeleteOneConfirmComponent } from "../../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";
import SwitchComponent from "../../../common/UI/Switch";
import TypographyComponent from "../../../common/UI/Typography";
import IconComponent from "../../../common/UI/Icon";
import { Link } from "react-router-dom";
import IconButtonComponent from "../../../common/UI/IconButton";
import { EditNoteOutlined } from "@mui/icons-material";
import { useCategoryApi } from "@/hooks/api";

export const TableBodyComponent = ({
  selectedCell,
  order,
  orderBy,
  setSelectedCell,
  dataRowLists,
}) => {
  const { deleteCategoryByID, getSelectedIDs, updateCategoryByID } =
    useCategoryApi();
  const {
    fetchCategoryPending,
    updateCategoryPending,
    isDeleteCategorySuccess,
  } = useCategoryApi().state;

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

  const handleUpdateCategory = (value, paramID) => {
    updateCategoryByID({ isPublished: value }, paramID);
  };
  const handleDeleteCateogry = (paramID) => {
    deleteCategoryByID(paramID);
  };
  React.useEffect(() => {
    if (isDeleteCategorySuccess) {
      setSelectedCell([]);
      getSelectedIDs([]);
    }
  }, [getSelectedIDs, isDeleteCategorySuccess, setSelectedCell]);
  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <StyledTableBodyRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
          >
            <StyledTableBodyCell padding="checkbox">
              <Checkbox
                color="primary"
                onClick={(event) => handleSelectClick(event, row.id)}
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <IconComponent image={row.avatarImage} />
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <TypographyComponent>{row.name}</TypographyComponent>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <TypographyComponent>
                {row.description || "N/A"}
              </TypographyComponent>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <Typography>{row.productCount}</Typography>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <SwitchComponent
                value={row.isPublished}
                onChange={(value) => handleUpdateCategory(value, row.id)}
                disabled={updateCategoryPending ? true : false}
              />
            </StyledTableBodyCell>
            <StyledTableBodyCell align="right">
              <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                <Link to={"/admin-panel/product-alpha/categories/id/" + row.id}>
                  <IconButtonComponent icon={<EditNoteOutlined />} />
                </Link>
                <DeleteOneConfirmComponent
                  handleSubmit={() => handleDeleteCateogry(row.id)}
                />
              </Stack>
            </StyledTableBodyCell>
          </StyledTableBodyRow>
        );
      })}
      {visibleRows.length === 0 && fetchCategoryPending ? (
        <StyledTableBodyRow>
          <StyledTableBodyCell colSpan={10}>
            <LoadingElementSmallComponent />
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      ) : visibleRows.length === 0 ? (
        <StyledTableBodyRow>
          <StyledTableBodyCell colSpan={10}>
            <NoDataComponent />
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      ) : (
        <></>
      )}
    </TableBody>
  );
};
