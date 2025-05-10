import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { EditNoteOutlined, Close } from "@mui/icons-material";
import IconButtonComponent from "../../UI/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormEditComponent = ({
  FormTitle,
  FormBody,
  isOpen,
  onOpen,
  onClose,
  width = "sm",
  isFullScreen = false,
}) => {
  return (
    <React.Fragment>
      <IconButtonComponent
        onClick={onOpen}
        icon={<EditNoteOutlined />}
        hoverColor={"#388e3c"}
      />
      {isFullScreen ? (
        <Dialog
          fullScreen
          open={isOpen}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography
                variant="h5"
                component={"div"}
                fontSize={{ xs: "18px", sm: "22px" }}
              >
                {FormTitle || "N/A"}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>{FormBody ? FormBody : <>N/A</>}</DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={isOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth={width}
          disableScrollLock={true}
          onClose={onClose}
          aria-describedby="dialog-slide"
        >
          <DialogTitle className="text-center" style={{ position: "relative" }}>
            <Typography
              variant="h5"
              component={"div"}
              fontSize={{ xs: "18px", sm: "22px" }}
            >
              {FormTitle || "N/A"}
            </Typography>
            <IconButton
              onClick={onClose}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>{FormBody ? FormBody : <>N/A</>}</DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};
