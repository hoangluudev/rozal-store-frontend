import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import * as React from "react";
import {} from "../../../actions/client/order.action";
import { useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { convertToCurrency, formatDatetime } from "../../../utils/formatting";
import { useOrderApi } from "@/hooks/api";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const { cancelOrderByID, fetchOrderByID } = useOrderApi;
  const { selectedOrderData, cancelOrderByIDPending } = useOrderApi.state;

  const orderData = selectedOrderData || {};
  const progress = orderData.progress || [];

  const isProgressStatusConfirmed =
    progress.length > 0 &&
    progress[progress.length - 1].status === "Order Confirmed"
      ? true
      : false;
  const isProgressStatusDelivered =
    progress.length > 0 && progress[progress.length - 1].status === "Delivered"
      ? true
      : false;
  const isOrderStatusPending =
    orderData.status && orderData.status === "pending" ? true : false;

  const progressSteps = [
    {
      label: "Order Confirmed",
      date: progress[0]?.createDate,
    },
    { label: "Order Packed", date: progress[1]?.createDate },
    { label: "On the Way", date: progress[2]?.createDate },
    {
      label: "Out for Delivery",
      date: progress[3]?.createDate,
    },
    { label: "Delivered", date: progress[4]?.createDate },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOrderSubmit = () => {
    handleClose();
    cancelOrderByID(orderData._id);
  };

  React.useEffect(() => {
    fetchOrderByID(orderId);
  }, [fetchOrderByID, orderId]);

  React.useEffect(() => {
    if (cancelOrderByIDPending) {
      fetchOrderByID(orderId);
    }
  }, [cancelOrderByIDPending, fetchOrderByID, orderId]);

  return (
    <Box sx={{ borderRadius: "1rem", padding: "1rem" }}>
      <Grid container alignItems={"center"} spacing={2}>
        <Grid item xs={12} sm="auto">
          <Typography
            className="fw-semibold text-capitalize"
            variant="h6"
            component={"h6"}
          >
            Order Detail
          </Typography>
        </Grid>
        <Grid item xs={"auto"}>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            {"#" + orderData.orderCode}
          </Typography>
        </Grid>
        <Grid item xs={"auto"}>
          <Chip
            label={orderData.status}
            color={
              orderData.status === "completed"
                ? "success"
                : orderData.status === "canceled"
                ? "error"
                : "primary"
            }
            style={{
              textTransform: "capitalize",
              borderRadius: "5px",
              fontSize: 16,
              marginTop: 0,
            }}
          />
        </Grid>
      </Grid>
      <Typography color={"text.secondary"}>
        Display information about products you have purchased at our Shop.
      </Typography>
      <Divider style={{ margin: "1rem 0", opacity: 1 }} />
      <Box>
        {orderData ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Order Info
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Order Code: " + orderData.orderCode}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Created Date: " + formatDatetime(orderData.createdAt)}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Payment Method: " + orderData.paymentMethod}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Total Amount: " +
                    convertToCurrency(orderData.totalAmount || 0)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Recipient Information
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Name: " + orderData.fullName}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Email: " + orderData.email}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {"Phone: " + orderData.phone}
                </Typography>
                {orderData.shippingAddress ? (
                  <Typography style={{ fontSize: 14 }}>
                    {"Address: " +
                      `${orderData.shippingAddress.specificLocation}, ${orderData.shippingAddress.ward}, ${orderData.shippingAddress.district}, ${orderData.shippingAddress.province}`}
                  </Typography>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Order Items
                </Typography>
                {orderData.items &&
                  orderData.items.map((item, itemIndex) => (
                    <Grid
                      container
                      spacing={3}
                      key={itemIndex}
                      alignItems="center"
                    >
                      <Grid item xs={2} sm={2}>
                        <Avatar
                          alt={item.name}
                          src={item.imgUrl}
                          variant="square"
                        />
                      </Grid>
                      <Grid item xs={8} sm={8}>
                        <Typography
                          variant="body2"
                          fontSize={{ xs: "12px", sm: "14px" }}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <Typography variant="body2">
                          x{item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Divider style={{ margin: "1rem 0", opacity: 1 }} />

            <Grid item xs={12}>
              <Typography
                variant="h6"
                component={"h6"}
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Order Progress
              </Typography>
              {progress.length > 0 && (
                <Typography variant="body1" color="primary" gutterBottom>
                  {`Current Status: ${
                    progress[progress.length - 1].status
                  } (Updated on: ${formatDatetime(
                    progress[progress.length - 1].createDate
                  )})`}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box display={{ xs: "none", md: "block" }}>
                <Stepper activeStep={progress.length} alternativeLabel>
                  {progressSteps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        completed={index < progress.length ? "true" : undefined}
                        icon={
                          index < progress.length ? (
                            <CheckCircle color="success" />
                          ) : null
                        }
                      >
                        {step.label}
                        {step.date && (
                          <Typography variant="body2" color="textSecondary">
                            {formatDatetime(step.date)}
                          </Typography>
                        )}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box display={{ xs: "block", md: "none" }}>
                <Stepper
                  activeStep={progress.length}
                  orientation="vertical"
                  connector={<StepConnector />}
                >
                  {progressSteps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        completed={index < progress.length ? "true" : undefined}
                        icon={
                          index < progress.length ? (
                            <CheckCircle color="success" />
                          ) : null
                        }
                      >
                        {step.label}
                        {step.date && (
                          <Typography variant="body2" color="textSecondary">
                            {formatDatetime(step.date)}
                          </Typography>
                        )}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent={"flex-end"}
              style={{ marginTop: "1rem" }}
            >
              {progress.length > 0 ? (
                <Tooltip
                  title={
                    isProgressStatusConfirmed
                      ? "Cancel Order"
                      : isProgressStatusDelivered
                      ? "Order Delivered Successfully"
                      : "Order cannot be canceled at this stage"
                  }
                >
                  <Button
                    variant="contained"
                    color={
                      isProgressStatusConfirmed && isOrderStatusPending
                        ? "error"
                        : "inherit"
                    }
                    size="small"
                    onClick={handleClickOpen}
                  >
                    Cancel Order
                  </Button>
                </Tooltip>
              ) : (
                <></>
              )}
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              disableScrollLock={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action will cancel your item and cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="text" color="primary">
                  No
                </Button>
                <Button
                  onClick={handleCancelOrderSubmit}
                  variant="contained"
                  color="error"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};
