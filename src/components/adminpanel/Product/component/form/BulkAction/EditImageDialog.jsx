import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import useToast from "../../../../../../hooks/useNotifications";

const EditImageDialog = ({ open, onClose, onApply, selectedCount, images }) => {
  const { sendMsgInfo } = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleApplyClick = () => {
    if (selectedImage) {
      onApply(selectedImage);
    } else {
      sendMsgInfo("Please select an image.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent dividers>
        {images.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No images available.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  onClick={() => handleImageSelect(image)}
                  style={{
                    cursor: "pointer",
                    border: selectedImage === image ? "2px solid blue" : "none",
                    width: "100%",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
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

export default EditImageDialog;
