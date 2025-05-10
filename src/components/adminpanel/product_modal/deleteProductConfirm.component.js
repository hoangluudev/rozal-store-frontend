import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteProductByID } from "../../../actions/admin/productManagement.action";
import { useDispatch } from "react-redux";

export const DeleteProductConFirmModal = ({ selectedProductID }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenDeleteModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  const handleSubmitDelete = () => {
    dispatch(deleteProductByID(selectedProductID));
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="contained" color="error">
        <Delete />
      </Button>
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
