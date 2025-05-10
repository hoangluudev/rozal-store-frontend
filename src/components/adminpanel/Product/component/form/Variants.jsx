import React from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Toolbar,
  alpha,
  Box,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { TypographyComponent } from "../../../../common/UI";
import {
  TextFieldComponent,
  NumbericTextFieldComponent,
} from "../../../../common/Input";
import { DeleteOneConfirmComponent } from "../../../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";
import VariantImageSelectComponent from "./VariantImageSelection";
import {
  StyledHeaderTableCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
} from "../../../../common/UI/Table/Config";
import ProductVariantBulkActions from "./BulkAction";

const VariantsTableComponent = ({
  variations = [],
  onChange,
  uploadedImages = [],
  formSubmitted,
  selectedCell = [],
  setSelectedCell = null,
}) => {
  const isSelected = (id) => selectedCell.indexOf(id) !== -1;

  const headCells = [
    { id: "image", label: "Image" },
    { id: "", label: "Variant" },
    { id: "", label: "Price" },
    { id: "", label: "Compare-at Price" },
    { id: "", label: "Quantity" },
    { id: "", label: "SKU" },
    { id: "", label: "Actions" },
  ];

  const onInputChange = (index, name, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][name] = value;
    onChange(updatedVariations);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = variations.map((_, index) => index);
      setSelectedCell(newSelected);
      return;
    }
    setSelectedCell([]);
  };

  const handleSelectClick = (event, index) => {
    const selectedIndex = selectedCell.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCell, index);
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
  };

  const handleImageSelect = (selectedImage, index) => {
    if (index !== null) {
      onInputChange(index, "image", selectedImage);
    }
  };

  const handleDeleteVariant = (index) => {
    const updatedVariations = variations.filter((_, i) => i !== index);
    onChange(updatedVariations);
    setSelectedCell(selectedCell.filter((i) => i !== index));
  };

  const EnhancedTableToolbar = ({ numSelected }) => {
    const handleBulkDeleteVariant = (indexes) => {
      const updatedVariations = variations.filter(
        (_, i) => !indexes.includes(i)
      );
      onChange(updatedVariations);
      setSelectedCell([]);
    };
    return (
      <Toolbar
        sx={{
          py: 1,
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "space-between",
          display: numSelected > 0 ? "flex" : "none",
        }}
        variant="dense"
      >
        {numSelected > 0 ? (
          <>
            <TypographyComponent
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} items selected
            </TypographyComponent>
            <ProductVariantBulkActions
              selectedCell={selectedCell}
              variations={variations}
              onChange={onChange}
              images={uploadedImages}
              handleBulkDeleteVariant={() =>
                handleBulkDeleteVariant(selectedCell)
              }
            />
          </>
        ) : null}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const rowCount = variations.length;

  return (
    <Box width={"100%"}>
      <EnhancedTableToolbar numSelected={selectedCell.length} />
      <TableContainer>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <StyledHeaderTableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selectedCell.length > 0 && selectedCell.length < rowCount
                  }
                  checked={rowCount > 0 && selectedCell.length === rowCount}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all" }}
                />
              </StyledHeaderTableCell>
              {headCells.map((headCell, index) => (
                <StyledHeaderTableCell key={index}>
                  {headCell.label}
                </StyledHeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {variations.map((variation, index) => {
              const isItemSelected = isSelected(index);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <StyledTableBodyRow key={index} hover>
                  <StyledTableBodyCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onClick={(event) => handleSelectClick(event, index)}
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <VariantImageSelectComponent
                      value={variation.image}
                      onChange={(value) => handleImageSelect(value, index)}
                      images={uploadedImages}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {variation.variants.length > 0 &&
                      variation.variants
                        .map((variant) => variant.value)
                        .join(" / ")}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <NumbericTextFieldComponent
                      value={variation.price}
                      onChange={(value) => onInputChange(index, "price", value)}
                      fullWidth
                      isCurrency={true}
                      variant="outlined"
                      size="small"
                      error={isNaN(variation.price) && formSubmitted}
                      helperText={
                        isNaN(variation.price) && formSubmitted
                          ? "*required"
                          : ""
                      }
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <NumbericTextFieldComponent
                      value={variation.comparePrice}
                      onChange={(value) =>
                        onInputChange(index, "comparePrice", value)
                      }
                      fullWidth
                      isCurrency={true}
                      variant="outlined"
                      size="small"
                      error={isNaN(variation.comparePrice) && formSubmitted}
                      helperText={
                        isNaN(variation.comparePrice) && formSubmitted
                          ? "*required"
                          : ""
                      }
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <NumbericTextFieldComponent
                      value={variation.quantity}
                      onChange={(value) =>
                        onInputChange(index, "quantity", value)
                      }
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={isNaN(variation.quantity) && formSubmitted}
                      helperText={
                        isNaN(variation.quantity) && formSubmitted
                          ? "*required"
                          : ""
                      }
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <TextFieldComponent
                      value={variation.sku}
                      onChange={(value) => onInputChange(index, "sku", value)}
                      fullWidth
                      variant="outlined"
                      placeholder="SKU"
                      size="small"
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                      <DeleteOneConfirmComponent
                        handleSubmit={() => handleDeleteVariant(index)}
                      />
                    </Stack>
                  </StyledTableBodyCell>
                </StyledTableBodyRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

VariantsTableComponent.propTypes = {
  variations: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  uploadedImages: PropTypes.array,
  formSubmitted: PropTypes.bool,
  selectedCell: PropTypes.array,
  setSelectedCell: PropTypes.func,
};

export default VariantsTableComponent;
