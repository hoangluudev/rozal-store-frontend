import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ButtonComponent, DividerComponent } from "../../../../common/UI";
import { convertToCurrency } from "../../../../../utils/formatting";
import {
  AddShoppingCart,
  ArrowForwardIos,
  Cancel,
  CheckCircle,
  CreditCard,
  DoneAll,
  SwapHoriz,
} from "@mui/icons-material";
import CancelOrderDialog from "../CancelOrderDialog";
import CountdownTimer from "../../../../misc/CountdownTimer";
import ChangePaymentMethodDialog from "../ChangePaymentMethod";
// import ProductRatingDialog from "../ProductRatingDialog";
import OrderItems from "./OrderItems";
import { useOrderApi } from "../../../../../hooks/api";

const OrderCard = ({ orderItem }) => {
  const navigate = useNavigate();

  const { onRepurchaseOrder, createZaloPaymentRetryRequest } = useOrderApi();

  const theme = useTheme();

  const handleNoAction = () => {
    console.log("button clicked");
  };
  const handleRepurchaseOrder = (orderCode) => {
    onRepurchaseOrder(orderCode);
  };
  const handleRetryPayment = (orderCode) => {
    createZaloPaymentRetryRequest(orderCode);
  };
  const handleDirectToOrderDetail = (orderCode) => {
    navigate("/user/order/" + orderCode);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Unpaid":
        return theme.palette.warning.light;
      case "Pending":
        return theme.palette.primary.light;
      case "Confirmed":
        return theme.palette.primary.main;
      case "In Preparation":
        return theme.palette.primary.dark;
      case "Shipped":
        return theme.palette.info.light;
      case "Delivered":
        return theme.palette.success.light;
      case "Completed":
        return theme.palette.success.main;
      case "Canceled":
        return theme.palette.error.main;
      case "Returned":
        return theme.palette.error.light;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <Box sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
        <Stack
          flexDirection={{ xs: "column-reverse", sm: "row" }}
          columnGap={2}
        >
          <Stack flexDirection={{ xs: "row", sm: "column" }} columnGap={1}>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
              }}
            >
              Order Placed
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
                fontWeight: 600,
                textWrap: "nowrap",
              }}
            >
              {orderItem?.timestamps?.createdDate}
            </Typography>
          </Stack>
          <DividerComponent flexItem isVertical />
          <Stack flexDirection={{ xs: "row", sm: "column" }} columnGap={1}>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
                fontWeight: 600,
              }}
            >
              {convertToCurrency(orderItem?.totalAmount)}
            </Typography>
          </Stack>
          <DividerComponent flexItem isVertical />
          <Stack flexDirection={{ xs: "row", sm: "column" }} columnGap={1}>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
              }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
                fontWeight: 600,
                color: getStatusColor(orderItem?.status),
                textWrap: "nowrap",
              }}
            >
              {orderItem?.status}
            </Typography>
          </Stack>
          <DividerComponent flexItem isVertical />
          <Stack
            flexDirection={{ xs: "row", sm: "column" }}
            alignItems={{ xs: "normal", sm: "center" }}
            columnGap={1}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
              }}
            >
              Payment
            </Typography>
            {orderItem?.isPaid ? (
              <Tooltip title={`Paid via ${orderItem?.paymentMethod}`}>
                <CheckCircle color="success" fontSize="small" />
              </Tooltip>
            ) : (
              <Tooltip title="Unpaid">
                <Cancel color="error" fontSize="small" />
              </Tooltip>
            )}
          </Stack>
          <DividerComponent flexItem isVertical />
          <Stack
            flexDirection={{ xs: "row", sm: "column" }}
            alignItems={{ xs: "center", sm: "flex-end" }}
            justifyContent={{ xs: "space-between" }}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {`Order #${orderItem?.orderCode}`}
            </Typography>
            <Link
              component={RouterLink}
              to={"/user/order/" + orderItem?.orderCode}
              sx={{
                fontSize: "12px",
                textTransform: "capitalize",
                fontWeight: 600,
                color: theme.palette.success.main,
                textDecoration: "underline",
                "&:hover": {
                  color: theme.palette.success.light,
                },
              }}
            >
              View Order
            </Link>
          </Stack>
        </Stack>
      </Box>

      <CardContent>
        {orderItem?.items.map((item, index) => (
          <Box key={index}>
            <OrderItems itemData={item} orderCode={orderItem?.orderCode} />
            {index < orderItem?.items?.length - 1 && (
              <DividerComponent
                sx={{
                  my: 1,
                }}
              />
            )}
          </Box>
        ))}
      </CardContent>
      {!["Completed", "Canceled", "Returned"].includes(orderItem?.status) && (
        <Box sx={{ p: 2 }}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor:
                orderItem?.status === "Unpaid" ? "#ffebee" : "#e8f5e9",
              cursor: "pointer",
              p: 1,
            }}
            onClick={() => handleDirectToOrderDetail(orderItem?.orderCode)}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {orderItem?.status === "Unpaid" &&
              orderItem?.paymentMethod !== "Cash On Delivery" ? (
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {`Please complete payment within `}
                  <CountdownTimer
                    initialSeconds={orderItem?.timestamps?.paymentExpiredIn}
                    sx={{
                      color: theme.palette.error.main,
                      fontWeight: 600,
                    }}
                  />
                  {` via E-wallet / ${orderItem?.paymentMethod}`}
                </Typography>
              ) : (
                <Stack>
                  <Typography
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: { xs: "12px", sm: "14px" },
                      fontWeight: 600,
                    }}
                  >
                    Expected delivery by:{" "}
                    {orderItem?.timestamps?.estimatedDeliveryDate}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                  >
                    {orderItem?.lastShippingProgress?.description}
                  </Typography>
                </Stack>
              )}
              <ArrowForwardIos
                color={orderItem?.status === "Unpaid" ? "error" : "success"}
              />
            </Stack>
          </Paper>
        </Box>
      )}

      <Box sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
        <Stack
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
          gap={1}
        >
          <ButtonComponent
            variant="contained"
            color="success"
            size="small"
            startIcon={<DoneAll />}
            onClick={() => handleNoAction()}
            onDisabledClick={() => {
              console.log("this button is disabled!");
            }}
            hidden={!["Shipped", "Delivered"].includes(orderItem?.status)}
            disabled={!["Delivered"].includes(orderItem?.status)}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Order Received
          </ButtonComponent>
          <ChangePaymentMethodDialog
            orderCode={orderItem?.orderCode}
            currentPaymentMethod={orderItem?.paymentMethod}
            ButtonProps={{
              hidden: !["Unpaid"].includes(orderItem?.status),
            }}
          />
          <ButtonComponent
            variant="contained"
            color="primary"
            size="small"
            startIcon={<CreditCard />}
            onClick={() => handleRetryPayment(orderItem?.orderCode)}
            hidden={!["Unpaid"].includes(orderItem?.status)}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Pay now
          </ButtonComponent>
          <CancelOrderDialog
            orderCode={orderItem?.orderCode}
            order={orderItem}
            ButtonProps={{
              hidden: ![
                "Unpaid",
                "Pending",
                "Confirmed",
                "In Preparation",
              ].includes(orderItem?.status),
              disabled: !["Unpaid", "Pending", "Confirmed"].includes(
                orderItem?.status
              ),
            }}
          />
          <ButtonComponent
            variant="contained"
            color="warning"
            size="small"
            startIcon={<SwapHoriz />}
            onClick={() => handleNoAction()}
            hidden={!["Delivered", "Completed"].includes(orderItem?.status)}
            disabled={!["Completed"].includes(orderItem?.status)}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Request for Return/Refund
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            color="success"
            size="small"
            startIcon={<AddShoppingCart />}
            onClick={() => handleRepurchaseOrder(orderItem?.orderCode)}
            hidden={
              !["Delivered", "Completed", "Canceled", "Returned"].includes(
                orderItem?.status
              )
            }
            sx={{
              textTransform: "initial",
            }}
          >
            Repurchase
          </ButtonComponent>
        </Stack>
      </Box>
    </Card>
  );
};

export default OrderCard;
