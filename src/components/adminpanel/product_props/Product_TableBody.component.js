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
  Chip,
} from "@mui/material";
import { getComparator, stableSort } from "./product_TableProps";
import { EditProductModal } from "../product_modal/editProductModal.component";
import { DeleteProductConFirmModal } from "../product_modal/deleteProductConfirm.component";
import {
  fetchProducts,
  getSelectedIDs,
  onFilteredProductPageChange,
  onSearchedProductPageChange,
} from "../../../actions/admin/productManagement.action";
import { useDispatch, useSelector } from "react-redux";
import { LoadingElementSmallComponent } from "../../misc/LoadingElementSmall.component";
import { NoDataComponent } from "../../misc/DataNotFound.component";
import { convertToCurrency } from "../../../utils/formatting";

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

export const ProductTableBody = ({
  selectedCell,
  order,
  orderBy,
  setSelectedCell,
  dataRowLists,
}) => {
  const dispatch = useDispatch();
  const {
    createProductPending,
    updateProductPending,
    deleteProductPending,
    itemPerPage,
    isSearchOn,
    isFilterOn,
  } = useSelector((reduxData) => reduxData.PRODUCTS_ADMIN_REDUCERS);

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
    if (deleteProductPending) {
      setSelectedCell([]);
      dispatch(getSelectedIDs([]));
    }
  }, [dispatch, deleteProductPending, setSelectedCell]);

  React.useEffect(() => {
    if (createProductPending || updateProductPending || deleteProductPending) {
      if (isSearchOn) {
        dispatch(onSearchedProductPageChange(0, itemPerPage));
      } else if (isFilterOn) {
        dispatch(onFilteredProductPageChange(0, itemPerPage));
      } else if (!isSearchOn && !isFilterOn) {
        dispatch(fetchProducts(0, itemPerPage));
      }
    }
  }, [
    dispatch,
    createProductPending,
    itemPerPage,
    deleteProductPending,
    updateProductPending,
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
              <Typography style={{ textAlign: "start" }}>
                {row.productCode || "None"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                <Avatar alt="" src={row.imgUrl} variant="square" />
                <Stack flexDirection={"column"} alignItems={"flex-start"}>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {row.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="fw-semibold text-capitalize"
                    fontSize={"12px"}
                    color={"text.secondary"}
                  >
                    {row.category || "none"}
                  </Typography>
                </Stack>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>{row.brand}</StyledTableCell>
            <StyledTableCell>
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                }}
              >
                {row.stockQuantity}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Chip
                label={row.stockStatus}
                style={{ fontWeight: "bold", fontSize: "12px" }}
                size="small"
                color={
                  row.stockStatus === "In Stock"
                    ? "success"
                    : row.stockStatus === "Out Of Stock"
                    ? "error"
                    : "warning"
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <Stack flexDirection={"column"} alignItems={"center"}>
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {convertToCurrency(row.promotionPrice)}
                </Typography>
                {row.promotionPrice === row.buyPrice ? (
                  <></>
                ) : (
                  <Typography
                    variant="caption"
                    className="text-decoration-line-through"
                    fontSize={"12px"}
                    color={"text.secondary"}
                  >
                    {convertToCurrency(row.buyPrice)}
                  </Typography>
                )}
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Chip
                label={row.productStatus}
                style={{ fontWeight: "bold", fontSize: "12px" }}
                size="small"
                color={
                  row.productStatus === "Active"
                    ? "success"
                    : row.productStatus === "Inactive"
                    ? "error"
                    : "default"
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <ButtonGroup variant="contained" size="small">
                <EditProductModal selectedProductData={row} />
                <DeleteProductConFirmModal selectedProductID={row.id} />
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
