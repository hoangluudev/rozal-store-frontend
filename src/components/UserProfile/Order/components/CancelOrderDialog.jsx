import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Clear, Error } from "@mui/icons-material";
import ChangeDeliveryAddress from "./ChangeDeliveryAddress";
import { useOrderApi } from "../../../../hooks/api";

const cancelReasons = [
  "I need to change delivery information (address, phone number, etc...)",
  "I want to add/change voucher",
  "I want to modify order (colour, size, quantity, etc...)",
  "Found a better deal (cheaper, more reliable, faster delivery)",
  "No longer need this item",
  "Ordered by mistake",
  "Others / Change of mind",
];

const CancelOrderDialog = ({ orderCode, order, ButtonProps = {} }) => {
  const theme = useTheme();

  const { cancelOrderbyOrderCode } = useOrderApi();

  const [isOpenDialog, setOpenDialog] = useState(false);
  const [requestDataObj, setRequestDataObj] = React.useState({
    cancelReason: "",
  });

  const handleSubmitConfirm = () => {
    cancelOrderbyOrderCode(requestDataObj, orderCode);
    handleCloseDialog();
  };

  const handleOnChange = (name, value) => {
    setRequestDataObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        size="small"
        startIcon={<Clear />}
        sx={{ textTransform: "capitalize" }}
        onClick={handleOpenDialog}
        {...ButtonProps}
      >
        Cancel order
      </Button>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Select Cancellation Reason</DialogTitle>
        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              background: "#fff3e0",
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection="row" alignItems="center" columnGap={1}>
              <Error color="warning" />
              <Typography
                color={theme.palette.warning.dark}
                sx={{
                  fontSize: { xs: "10px", sm: "12px" },
                }}
              >
                Please take a note that your cancellation will be subject to the
                seller's approval, as the order is currently being proccessed.
              </Typography>
            </Stack>
          </Paper>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={requestDataObj.cancelReason}
              onChange={(e) => handleOnChange("cancelReason", e.target.value)}
            >
              {cancelReasons.map((item, index) => (
                <React.Fragment key={index}>
                  <FormControlLabel
                    value={item}
                    control={<Radio color="error" />}
                    label={item}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                        lineHeight: {
                          xs: "16px",
                        },
                      },
                    }}
                  />
                  {requestDataObj.cancelReason === cancelReasons[0] &&
                  index === 0 ? (
                    <ChangeDeliveryAddress
                      orderCode={orderCode}
                      currentDeliveryAddressId={order?.customerAddressId}
                    />
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitConfirm}
            color="error"
            disabled={!requestDataObj.cancelReason}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CancelOrderDialog;
