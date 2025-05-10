import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { IconButtonComponent } from "../../UI";

export const DeleteMultipleConfirmComponent = ({
  handleSubmit = null,
  itemLength = 0,
  iconSize = "medium",
  pending = false,
}) => {
  const [openModal, setOpenDeleteModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  const handleSubmitDelete = () => {
    if (handleSubmit) handleSubmit();
  };

  return (
    <React.Fragment>
      <IconButtonComponent
        onClick={handleClickOpen}
        hoverColor={"error"}
        size={iconSize}
        tooltipTitle="Delete All"
        icon={<DeleteForeverOutlined fontSize={iconSize} />}
        disabled={pending}
      />
      <Dialog
        open={openModal}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this " + itemLength + " items?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will permanently delete your item and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmitDelete();
            }}
            color="error"
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
