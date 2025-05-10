import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { NumbericTextFieldComponent } from "../../../../../common/Input";

const EditPriceDialog = ({
  open,
  onClose,
  onApply,
  selectedCount,
  initialValue = 0,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (value) => {
    setValue(value);
  };

  const handleApplyClick = () => {
    onApply(value);
  };

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth={"xs"}
      disableScrollLock={true}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Edit Price</DialogTitle>
      <DialogContent>
        <Box p={3}>
          <NumbericTextFieldComponent
            value={value}
            onChange={handleOnChange}
            fullWidth
            isCurrency={true}
            variant="outlined"
            label="New Price"
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleApplyClick} variant="contained" color="primary">
          {`Apply to All (${selectedCount})`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPriceDialog;
