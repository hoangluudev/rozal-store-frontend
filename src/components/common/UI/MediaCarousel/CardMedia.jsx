import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close, Image } from "@mui/icons-material";

const CarouselCardMedia = ({ image = "", title = "", ...imgProps }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box>
      <Card sx={{ minWidth: 200 }}>
        {image ? (
          <CardMedia
            component="img"
            image={image}
            title={title}
            onClick={handleOpenDialog}
            style={{
              cursor: "pointer",
            }}
            {...imgProps}
          />
        ) : (
          <Stack
            sx={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              background: "#f6f6f6",
            }}
          >
            <Image fontSize="large" />
            <Typography variant="caption">No Image</Typography>
          </Stack>
        )}
      </Card>
      <Dialog
        open={openDialog}
        maxWidth="xl"
        fullWidth={true}
        fullScreen={true}
      >
        <DialogContent
          sx={{
            position: "relative",
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "black",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
          >
            <Close fontSize="large" />
          </IconButton>
          <CardMedia
            component="img"
            image={image}
            title={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CarouselCardMedia;
