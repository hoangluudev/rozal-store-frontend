import React, { useState } from "react";
import PropTypes from "prop-types";
import EditQuantityDialog from "./EditQuantityDialog";
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import EditPriceDialog from "./EditPriceDialog";
import EditComparePriceDialog from "./EditComparePriceDialog";
import EditSKUDialog from "./EditSKUDialog";
import EditImageDialog from "./EditImageDialog";

const ProductVariantBulkActions = ({
  variations,
  selectedCell,
  onChange,
  images,
  handleBulkDeleteVariant,
}) => {
  const [dialogState, setDialogState] = useState({
    editQuantity: false,
    editPrice: false,
    editComparePrice: false,
    editSku: false,
    addImage: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleBulkActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBulkActionClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (dialogName) => {
    setDialogState({ ...dialogState, [dialogName]: true });
    handleBulkActionClose();
  };
  const handleCloseDialog = (dialogName) => {
    setDialogState({ ...dialogState, [dialogName]: false });
  };

  const hanldeChangeQuantity = (variations, selectedCell, newQuantity) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, quantity: newQuantity };
      }
      return variation;
    });
    return updatedVariations;
  };
  const handleChangePrice = (variations, selectedCell, newPrice) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, price: newPrice };
      }
      return variation;
    });
    return updatedVariations;
  };
  const handleChangeComparePrice = (
    variations,
    selectedCell,
    newComparePrice
  ) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, comparePrice: newComparePrice };
      }
      return variation;
    });
    return updatedVariations;
  };
  const handleChangeSKU = (variations, selectedCell, newSku) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, sku: newSku };
      }
      return variation;
    });
    return updatedVariations;
  };
  const handleChangeAddImage = (variations, selectedCell, selectedImage) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, image: selectedImage };
      }
      return variation;
    });
    return updatedVariations;
  };
  const handleChangeRemoveImage = (variations, selectedCell) => {
    const updatedVariations = variations.map((variation, index) => {
      if (selectedCell.includes(index)) {
        return { ...variation, image: "" };
      }
      return variation;
    });
    onChange(updatedVariations);
  };

  return (
    <div>
      <Button
        color="inherit"
        variant="contained"
        endIcon={<ArrowDropDown />}
        style={{ textTransform: "capitalize" }}
        onClick={handleBulkActionClick}
        size="small"
      >
        More Actions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleBulkActionClose}
      >
        <MenuItem onClick={() => handleOpenDialog("editQuantity")}>
          Edit quantities
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("editPrice")}>
          Edit prices
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("editComparePrice")}>
          Edit compare prices
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("editSku")}>
          Edit SKUs
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("addImage")}>
          Add Image
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeRemoveImage(variations, selectedCell)}
        >
          Remove Image
        </MenuItem>
        <MenuItem onClick={() => handleBulkDeleteVariant()}>
          Delete Variants
        </MenuItem>
      </Menu>
      <EditQuantityDialog
        open={dialogState.editQuantity}
        onClose={() => handleCloseDialog("editQuantity")}
        onApply={(newQuantity) => {
          const updatedVariations = hanldeChangeQuantity(
            variations,
            selectedCell,
            newQuantity
          );
          onChange(updatedVariations);
        }}
        selectedCount={selectedCell.length}
      />
      <EditPriceDialog
        open={dialogState.editPrice}
        onClose={() => handleCloseDialog("editPrice")}
        onApply={(newQuantity) => {
          const updatedVariations = handleChangePrice(
            variations,
            selectedCell,
            newQuantity
          );
          onChange(updatedVariations);
        }}
        selectedCount={selectedCell.length}
      />
      <EditComparePriceDialog
        open={dialogState.editComparePrice}
        onClose={() => handleCloseDialog("editComparePrice")}
        onApply={(newQuantity) => {
          const updatedVariations = handleChangeComparePrice(
            variations,
            selectedCell,
            newQuantity
          );
          onChange(updatedVariations);
        }}
        selectedCount={selectedCell.length}
      />
      <EditSKUDialog
        open={dialogState.editSku}
        onClose={() => handleCloseDialog("editSku")}
        onApply={(newQuantity) => {
          const updatedVariations = handleChangeSKU(
            variations,
            selectedCell,
            newQuantity
          );
          onChange(updatedVariations);
        }}
        selectedCount={selectedCell.length}
      />
      <EditImageDialog
        open={dialogState.addImage}
        onClose={() => handleCloseDialog("addImage")}
        onApply={(selectedImage) => {
          const updatedVariations = handleChangeAddImage(
            variations,
            selectedCell,
            selectedImage
          );
          onChange(updatedVariations);
          handleCloseDialog("addImage");
        }}
        selectedCount={selectedCell.length}
        images={images}
      />
    </div>
  );
};

ProductVariantBulkActions.propTypes = {
  variations: PropTypes.array.isRequired,
  selectedCell: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

export default ProductVariantBulkActions;
