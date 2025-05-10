import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { TextFieldComponent } from "../../../../../common/Input";

const EditSKUDialog = ({
  open,
  onClose,
  onApply,
  selectedCount,
  initialValue = "",
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
      <DialogTitle>Edit SKU</DialogTitle>
      <DialogContent>
        <Box p={3}>
          <TextFieldComponent
            value={value}
            onChange={handleOnChange}
            fullWidth
            variant="outlined"
            placeholder="New SKU"
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

export default EditSKUDialog;
