import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import IconButtonComponent from "../../../../common/UI/IconButton";
import { Image } from "@mui/icons-material";
import useToast from "../../../../../hooks/useNotifications";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VariantImageSelectComponent = ({
  value = "",
  onChange = null,
  images = [],
}) => {
  const { sendMsgInfo } = useToast();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(value);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleOpenClick = () => {
    setOpenDialog(true);
  };
  const handleCloseClick = () => {
    setOpenDialog(false);
  };

  const handleSubmitSelect = () => {
    if (selectedImage) {
      onChange(selectedImage);
      handleCloseClick();
    } else {
      sendMsgInfo("Please select a image.");
    }
  };
  const handleRemoveSelectedImage = () => {
    if (value) {
      onChange("");
      setSelectedImage("");
      handleCloseClick();
    } else {
      sendMsgInfo("No image to remove.");
    }
  };

  return (
    <React.Fragment>
      <IconButtonComponent
        onClick={handleOpenClick}
        hoverColor={"#d32f2f"}
        icon={
          value ? (
            <img src={value} alt="Variant" style={{ width: 40, height: 40 }} />
          ) : (
            <Image style={{ width: 40, height: 40 }} />
          )
        }
      />
      <StyledDialog
        open={openDialog}
        onClose={handleCloseClick}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Choose Variant Image</DialogTitle>
        <DialogContent dividers>
          {images.length === 0 || images.every((image) => !image) ? (
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
                      border:
                        selectedImage === image ? "2px solid blue" : "none",
                      width: "100%",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="inherit"
            onClick={() => handleCloseClick()}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => handleRemoveSelectedImage()}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitSelect()}
          >
            Done
          </Button>
        </DialogActions>
      </StyledDialog>
    </React.Fragment>
  );
};

export default VariantImageSelectComponent;
