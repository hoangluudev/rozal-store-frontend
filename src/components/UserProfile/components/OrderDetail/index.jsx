import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createZaloPaymentRetryRequest,
  fetchOrderByCode,
  onRepurchaseOrder,
} from "../../../../actions/client/order.action";
import { TitleBlockLayout } from "../../../common/Layout";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import {
  AddShoppingCart,
  ContentCopy,
  CreditCard,
  DoneAll,
  SwapHoriz,
} from "@mui/icons-material";
import { convertToCurrency, isEmptyObj } from "../../../../utils/formatting";
import StatusProgress from "./StatusProgress";
import ChangePaymentMethodDialog from "../../Order/components/ChangePaymentMethod";
import CancelOrderDialog from "../../Order/components/CancelOrderDialog";
import { ButtonComponent } from "../../../common/UI";
import CountdownTimer from "../../../misc/CountdownTimer";
import ShippingProgressTimeline from "./ShippingProgressTimeline";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import ChangeDeliveryAddress from "../../Order/components/ChangeDeliveryAddress";
import { LoadingElementComponent } from "../../../misc/LoadingElement.component";
import OrderNotFound from "../../../misc/OrderNotFound";

const OrderDetail = () => {
  const { orderCode } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { fetchOrderByCodePending, orderDetailItem } = useSelector(
    (reduxData) => reduxData.ORDER_ALPHA_REDUCERS
  );
  const getStatusColor = (status, type = "text") => {
    const textColors = {
      Unpaid: theme.palette.warning.light,
      Pending: theme.palette.primary.light,
      Confirmed: theme.palette.primary.main,
      "In Preparation": theme.palette.primary.dark,
      Shipped: theme.palette.info.light,
      Delivered: theme.palette.success.light,
      Completed: theme.palette.success.main,
      Canceled: theme.palette.error.main,
      Returned: theme.palette.error.light,
      default: theme.palette.text.primary,
    };
    const backgroundColors = {
      Unpaid: "#fffde7",
      Pending: "#e1f5fe",
      Confirmed: "#e1f5fe",
      "In Preparation": "#e1f5fe",
      Shipped: "#e0f7fa",
      Delivered: "#f1f8e9",
      Completed: "#f1f8e9",
      Canceled: "#fbe9e7",
      Returned: "#fbe9e7",
      default: theme.palette.grey[100],
    };
    const colorSet = type === "background" ? backgroundColors : textColors;
    return colorSet[status] || colorSet.default;
  };
  const getPaymentColor = (status, type = "text") => {
    const textColors = {
      Pending: theme.palette.primary.light,
      Success: theme.palette.success.light,
      Failed: theme.palette.error.light,
      default: theme.palette.text.primary,
    };
    const backgroundColors = {
      Pending: "#e1f5fe",
      Success: "#f1f8e9",
      Failed: "#fbe9e7",
      default: theme.palette.grey[100],
    };

    const colorSet = type === "background" ? backgroundColors : textColors;
    return colorSet[status] || colorSet.default;
  };

  const handleNoAction = () => {
    console.log("ButtonComponent clicked");
  };
  const handleBuyAgain = (orderCode) => {
    dispatch(onRepurchaseOrder(orderCode));
  };
  const handleRetryPayment = (orderCode) => {
    dispatch(createZaloPaymentRetryRequest(orderCode));
  };
  const hanldeCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  React.useEffect(() => {
    dispatch(fetchOrderByCode(orderCode));
  }, [dispatch, orderCode]);
  return (
    <TitleBlockLayout
      primary="Order Detail"
      secondary="Display information about products you have purchased at our Shop."
    >
      {fetchOrderByCodePending ? (
        <LoadingElementComponent />
      ) : isEmptyObj(orderDetailItem) ? (
        <OrderNotFound orderCode={orderCode} />
      ) : (
        <Box
          sx={{
            width: "100%",
            border: "2px solid #e0e0e0",
            borderRadius: "1rem",
            p: 1,
          }}
        >
          <Stack flexDirection={"column"} sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#bdbdbd",
                fontWeight: 600,
              }}
            >
              Order ID
            </Typography>
            <Stack
              flexDirection={"row"}
              justifyContent={{ xs: "flex-start", sm: "space-between" }}
              alignItems="center"
            >
              <ButtonComponent
                color="inherit"
                variant="text"
                size="small"
                endIcon={<ContentCopy />}
                tooltip="Copy"
                onClick={() =>
                  hanldeCopyToClipboard(orderDetailItem?.orderCode)
                }
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {`#${orderDetailItem?.orderCode}`}
                </Typography>
              </ButtonComponent>

              <Typography
                sx={{
                  fontSize: { xs: "8px", sm: "12px" },
                  fontWeight: 600,
                  color: getStatusColor(orderDetailItem?.status),
                  background: getStatusColor(
                    orderDetailItem?.status,
                    "background"
                  ),
                  textWrap: "nowrap",
                  textTransform: "uppercase",
                  borderRadius: "1rem",
                  px: 1,
                  py: "4px",
                }}
              >
                {orderDetailItem?.status}
              </Typography>
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            {!["Completed", "Canceled", "Returned"].includes(
              orderDetailItem?.status
            ) && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "2px solid #e0e0e0",
                    backgroundColor:
                      orderDetailItem?.status === "Unpaid"
                        ? "#ffebee"
                        : "#e8f5e9",
                    borderRadius: "1rem",
                    p: 2,
                  }}
                >
                  {orderDetailItem?.status === "Unpaid" &&
                  orderDetailItem?.paymentMethod !== "Cash On Delivery" ? (
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                    >
                      {`Please complete payment within `}
                      <CountdownTimer
                        initialSeconds={
                          orderDetailItem?.timestamps?.paymentExpiredIn
                        }
                        sx={{
                          color: theme.palette.error.main,
                          fontWeight: 600,
                        }}
                      />
                      {` via E-wallet / ${orderDetailItem?.payment?.method}`}
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
                        {orderDetailItem?.timestamps?.estimatedDeliveryDate}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        {orderDetailItem?.lastShippingProgress?.description}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <StatusProgress
                  options={orderDetailItem?.statusProgress}
                  orderAmount={orderDetailItem?.totalAmount}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#bdbdbd",
                    fontWeight: 600,
                  }}
                >
                  Delivery Address
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {orderDetailItem?.customerInfo?.fullName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.secondary",
                    }}
                  >
                    {orderDetailItem?.customerInfo?.phone}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.secondary",
                    }}
                  >
                    {`${orderDetailItem?.customerInfo?.address}, ${orderDetailItem?.customerInfo?.ward},
                   ${orderDetailItem?.customerInfo?.district}, ${orderDetailItem?.customerInfo?.city}`}
                  </Typography>
                  <ChangeDeliveryAddress
                    orderCode={orderDetailItem?.orderCode}
                    currentDeliveryAddressId={
                      orderDetailItem?.customerInfo?.addressId
                    }
                    ButtonProps={{
                      hidden: ![
                        "Unpaid",
                        "Pending",
                        "Confirmed",
                        "In Preparation",
                      ].includes(orderDetailItem?.status),
                      disabled: !["Unpaid", "Pending", "Confirmed"].includes(
                        orderDetailItem?.status
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#bdbdbd",
                    fontWeight: 600,
                  }}
                >
                  Payment
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Stack flexDirection="row" columnGap={1}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Method:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {orderDetailItem?.payment?.method}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" columnGap={1}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Amount:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "text.secondary",
                      }}
                    >
                      {convertToCurrency(orderDetailItem?.totalAmount)}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" columnGap={1}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Status:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: getPaymentColor(
                          orderDetailItem?.payment?.status
                        ),
                        background: getPaymentColor(
                          orderDetailItem?.payment?.status,
                          "background"
                        ),
                        fontWeight: 600,
                        borderRadius: "1rem",
                        px: "6px",
                      }}
                    >
                      {orderDetailItem?.payment?.status}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#bdbdbd",
                    fontWeight: 600,
                  }}
                >
                  Timeline
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <ShippingProgressTimeline
                    data={orderDetailItem?.shipping?.progress}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#bdbdbd",
                    fontWeight: 600,
                  }}
                >
                  Items
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {orderDetailItem?.items?.length > 0 &&
                    orderDetailItem?.items?.map((item, index) => (
                      <OrderItems
                        itemData={item}
                        orderCode={orderDetailItem?.orderCode}
                        key={index}
                      />
                    ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "1rem",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#bdbdbd",
                    fontWeight: 600,
                  }}
                >
                  Summary
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <OrderSummary orderData={orderDetailItem} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", p: 2 }}>
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
                  console.log("this ButtonComponent is disabled!");
                }}
                hidden={
                  !["Shipped", "Delivered"].includes(orderDetailItem?.status)
                }
                disabled={!["Delivered"].includes(orderDetailItem?.status)}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Order Received
              </ButtonComponent>
              <ChangePaymentMethodDialog
                orderCode={orderDetailItem?.orderCode}
                currentPaymentMethod={orderDetailItem?.payment?.method}
                ButtonProps={{
                  hidden: !["Unpaid"].includes(orderDetailItem?.status),
                }}
              />
              <ButtonComponent
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CreditCard />}
                onClick={() => handleRetryPayment(orderDetailItem?.orderCode)}
                hidden={!["Unpaid"].includes(orderDetailItem?.status)}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Pay now
              </ButtonComponent>
              <CancelOrderDialog
                orderCode={orderDetailItem?.orderCode}
                order={orderDetailItem}
                ButtonProps={{
                  hidden: ![
                    "Unpaid",
                    "Pending",
                    "Confirmed",
                    "In Preparation",
                  ].includes(orderDetailItem?.status),
                  disabled: !["Unpaid", "Pending", "Confirmed"].includes(
                    orderDetailItem?.status
                  ),
                }}
              />
              <ButtonComponent
                variant="contained"
                color="warning"
                size="small"
                startIcon={<SwapHoriz />}
                onClick={() => handleNoAction()}
                hidden={
                  !["Delivered", "Completed"].includes(orderDetailItem?.status)
                }
                disabled={!["Completed"].includes(orderDetailItem?.status)}
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
                onClick={() => handleBuyAgain(orderDetailItem?.orderCode)}
                hidden={
                  !["Delivered", "Completed", "Canceled", "Returned"].includes(
                    orderDetailItem?.status
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
        </Box>
      )}
    </TitleBlockLayout>
  );
};

export default OrderDetail;
