import React, { useState } from "react";
import {
  Typography,
  RadioGroup,
  Radio,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import images from "../../../../utils/imageUtils";
import { useOrderApi } from "../../../../hooks/api";

const paymentMethods = [
  {
    title: "Cash On Delivery",
    image: images.CODIcon,
    value: "cash-on-delivery",
    description: "Pay when you receive the package.",
  },
  {
    title: "ZaloPay",
    image: images.zalopayLogo,
    value: "zalopay",
    description: "Pay securely via ZaloPay.",
  },
  {
    title: "Momo",
    image: images.momoLogo,
    value: "momo",
    description: "Pay securely via Momo.",
  },
];

const ChangePaymentMethodDialog = ({
  orderCode,
  currentPaymentMethod = "",
  ButtonProps = {},
}) => {
  const { updateOrderPaymentMethod } = useOrderApi();
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [requestDataObj, setRequestDataObj] = useState({
    newPaymentMethod: "",
  });

  const handleSelectPaymentMethod = (newValue) => {
    setRequestDataObj({
      newPaymentMethod: newValue,
    });
  };

  const handleConfirm = () => {
    updateOrderPaymentMethod(requestDataObj, orderCode);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<Autorenew />}
        sx={{ textTransform: "capitalize" }}
        onClick={handleOpenDialog}
        {...ButtonProps}
      >
        Change payment method
      </Button>
      <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          Payment Method
        </DialogTitle>
        <DialogContent
          sx={{
            p: { xs: 1, sm: 3 },
          }}
        >
          <RadioGroup
            value={requestDataObj.newPaymentMethod}
            onChange={(e) => handleSelectPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((method) => {
              const isDisabled = currentPaymentMethod === method.title;

              return (
                <Card
                  key={method.value}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                    padding: 1,
                    border: isDisabled
                      ? "1px solid #e0e0e0"
                      : requestDataObj.newPaymentMethod === method.value
                      ? "1px solid #1976d2"
                      : "1px solid #e0e0e0",
                    boxShadow: isDisabled
                      ? "none"
                      : requestDataObj.newPaymentMethod === method.value
                      ? "0 0 5px rgba(25, 118, 210, 0.5)"
                      : "none",
                    transition: "border 0.3s, box-shadow 0.3s",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                    pointerEvents: isDisabled ? "none" : "auto",
                  }}
                  onClick={() =>
                    !isDisabled && handleSelectPaymentMethod(method.value)
                  }
                >
                  <Radio
                    value={method.value}
                    disabled={isDisabled}
                    sx={{
                      mr: { xs: 1, sm: 3 },
                      width: { xs: 10, sm: 14 },
                      height: { xs: 10, sm: 14 },
                      "& .MuiSvgIcon-root": {
                        fontSize: { xs: "16px", sm: "20px" },
                      },
                    }}
                    checked={
                      requestDataObj.newPaymentMethod === method.value ||
                      currentPaymentMethod === method.title
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={method.image}
                      alt={method.title}
                      style={{
                        width: "auto",
                        height: "32px",
                        maxHeight: { xs: 24, sm: 32 },
                      }}
                    />
                    <CardContent
                      sx={{
                        padding: "0 8px",
                        flex: 1,
                        "& .MuiTypography-body1": {
                          fontSize: { xs: "12px", sm: "14px" },
                          fontWeight: 600,
                        },
                        "& .MuiTypography-body2": {
                          fontSize: { xs: "10px", sm: "12px" },
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                        {method.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.description}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="text" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePaymentMethodDialog;
