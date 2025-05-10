import * as React from "react";
import { Link } from "react-router-dom";
import { TableBody, Checkbox, Stack, Chip } from "@mui/material";
import { EditNoteOutlined, ZoomInOutlined } from "@mui/icons-material";
import {
  getComparator,
  stableSort,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from "../../../common/UI/Table/Config";
import { LoadingElementSmallComponent } from "../../../misc/LoadingElementSmall.component";
import { NoDataComponent } from "../../../misc/DataNotFound.component";
import { DeleteOneConfirmComponent } from "../../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";
import IconButtonComponent from "../../../common/UI/IconButton";
import IconComponent from "../../../common/UI/Icon";
import TypographyComponent from "../../../common/UI/Typography";
import SwitchComponent from "../../../common/UI/Switch";
import { useProductManagementApi } from "../../../../hooks/api";

export const TableBodyComponent = ({
  selectedCell,
  order,
  orderBy,
  setSelectedCell,
  dataRowLists,
}) => {
  const {
    getSelectedIDs,
    updateProductByID,
    deleteProductByID,
    fetchProductOptions,
  } = useProductManagementApi();
  const { fetchProductPending, updateProductPending, isDeleteProductSuccess } =
    useProductManagementApi().state;
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

  const handleSubmitUpdate = (value, paramID) => {
    updateProductByID({ isPublished: value }, paramID);
  };
  const handleSubmitDelete = (paramID) => {
    deleteProductByID(paramID);
  };

  React.useEffect(() => {
    if (isDeleteProductSuccess) {
      setSelectedCell([]);
      getSelectedIDs([]);
    }
  }, [getSelectedIDs, isDeleteProductSuccess, setSelectedCell]);
  React.useEffect(() => {
    fetchProductOptions();
  }, [fetchProductOptions]);
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
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <IconComponent
                  image={row.avatarImage}
                  iconframeprops={{ variant: "square" }}
                />
                <TypographyComponent
                  xs={"0.875rem"}
                  fontWeight={"bold"}
                  sx={{
                    maxWidth: "300px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.name}
                </TypographyComponent>
              </Stack>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <Stack flexDirection={"column"} alignItems={"start"}>
                <TypographyComponent
                  xs={"12px"}
                  fontWeight={"bold"}
                  color={"text.secondary"}
                >
                  {row.category.name}
                </TypographyComponent>
                <TypographyComponent
                  xs={"11px"}
                  fontWeight={"bold"}
                  color={"text.secondary"}
                >
                  {row.productType.name}
                </TypographyComponent>
              </Stack>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <TypographyComponent
                xs={"13px"}
                fontWeight={"bold"}
                color={"text.secondary"}
              >
                {row.brand}
              </TypographyComponent>
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              {row.hasVariation === false
                ? row.stock + " in stock"
                : row.variantStats
                ? row.variantStats.totalQuantity +
                  " in stock for " +
                  row.variantStats.totalCount +
                  " variants"
                : "N/A"}
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <Chip
                label={row.status}
                style={{ fontWeight: "bold", fontSize: "12px" }}
                size="small"
                color={
                  row.status === "Selling"
                    ? "success"
                    : row.status === "Sold Out"
                    ? "error"
                    : row.status === "Discontinued"
                    ? "secondary"
                    : "primary"
                }
              />
            </StyledTableBodyCell>
            <StyledTableBodyCell>
              <SwitchComponent
                value={row.isPublished}
                onChange={(value) => handleSubmitUpdate(value, row.id)}
                disabled={updateProductPending ? true : false}
              />
            </StyledTableBodyCell>
            <StyledTableBodyCell align="right">
              <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                <Link to={"/admin-panel/product-alpha/view/id/" + row.id}>
                  <IconButtonComponent
                    icon={<ZoomInOutlined />}
                    hoverColor={"primary"}
                  />
                </Link>
                <Link to={"/admin-panel/product-alpha/edit/id/" + row.id}>
                  <IconButtonComponent icon={<EditNoteOutlined />} />
                </Link>
                <DeleteOneConfirmComponent
                  handleSubmit={() => handleSubmitDelete(row.id)}
                />
              </Stack>
            </StyledTableBodyCell>
          </StyledTableBodyRow>
        );
      })}
      {visibleRows.length === 0 && fetchProductPending ? (
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
