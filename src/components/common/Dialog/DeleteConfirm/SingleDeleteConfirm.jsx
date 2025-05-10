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
import IconButtonComponent from "../../UI/IconButton";

export const DeleteOneConfirmComponent = ({
  handleSubmit,
  iconSize = "medium",
  pending = false,
  buttonProps = {},
}) => {
  const [openModal, setOpenDeleteModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  const handleSubmitDelete = () => {
    handleSubmit();
  };
  return (
    <React.Fragment>
      <IconButtonComponent
        onClick={handleClickOpen}
        hoverColor={"error"}
        size={iconSize}
        tooltipTitle="Delete"
        icon={<DeleteForeverOutlined fontSize={iconSize} />}
        disabled={pending}
        sx={buttonProps}
      />
      <Dialog
        open={openModal}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will permanently delete this item and cannot be undone.
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
