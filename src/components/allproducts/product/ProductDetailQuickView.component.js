import * as React from "react";
import { Modal, Grid, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export const ProductDetailQuickView = ({
  isOpen,
  onClose,
  ProductDetailData,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "85vh",
    width: "80%",
    overflow: "auto",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  const productLists = ProductDetailData;
  return (
    <>
      {isOpen ? (
        <Modal
          open={isOpen}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
