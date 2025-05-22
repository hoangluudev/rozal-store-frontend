import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import useUserManagementApi from "@/hooks/api/useUserManagementApi";

export const ModalConfirmDeleteMultipleUser = () => {
  const { deleteMultipleUserByID } = useUserManagementApi();
  const { deleteUserPending, selectedUserIDs } = useUserManagementApi().state;

  const [openModal, setOpenDeleteModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  const handleSubmitDelete = () => {
    deleteMultipleUserByID(selectedUserIDs);
  };
  React.useEffect(() => {
    if (deleteUserPending) {
      handleClose();
    }
  }, [deleteUserPending]);
  return (
    <React.Fragment>
      <Tooltip title="Delete Users">
        <IconButton color="error" onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openModal}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete " + selectedUserIDs.length + " users?"}
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
            onClick={() => handleSubmitDelete()}
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
