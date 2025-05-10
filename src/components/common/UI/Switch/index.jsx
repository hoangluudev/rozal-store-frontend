import React, { useState } from "react";
import {
  Switch,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.error.main,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M18.71,5.29L12,11.88L5.29,5.29L3.88,6.71L10.59,13.41L3.88,20.12L5.29,21.54L12,14.83L18.71,21.54L20.12,20.12L13.41,13.41L20.12,6.71L18.71,5.29Z"/></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.error.main,
    "&.Mui-checked": {
      color: theme.palette.success.main,
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.success.main,
    },
  },
}));

const SwitchComponent = ({
  name,
  value,
  onChange,
  color = "success",
  tooltipTitle = "",
  disabled = false,
  isConfirm = false,
  confirmMessage = "Are you sure you want to switch off?",
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const gName = name || "N/A";

  const handleOnChange = (checked) => {
    if (!checked && isConfirm) {
      setOpen(true);
    } else {
      onChange(checked);
    }
  };
  const handleConfirm = () => {
    setOpen(false);
    onChange(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title={tooltipTitle}>
        <span>
          <CustomSwitch
            checked={value}
            onChange={(e) => handleOnChange(e.target.checked)}
            name={gName}
            color={color}
            disabled={disabled}
            {...props}
          />
        </span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
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

export default SwitchComponent;
