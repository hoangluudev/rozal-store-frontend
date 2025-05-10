import { Typography, CircularProgress, Box } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { convertToCurrency } from "../../../utils/formatting";

const OrderPaymentStatus = ({
  orderCode = "",
  orderStatus,
  paymentStatus = "Pending",
}) => {
  const statusDetails = {
    Pending: {
      icon: (
        <CircularProgress
          size={150}
          sx={{ color: "primary.main", marginBottom: "1rem" }}
        />
      ),
      title: "Your Order is Awaiting Payment",
      message: `Please complete your payment of ${convertToCurrency(
        orderStatus?.totalAmount
      )} by ${
        orderStatus?.paymentExpiredAt
      }. Your order will remain pending until the payment is completed.`,
    },
    Success: {
      icon: <CheckCircle color="success" sx={{ fontSize: 150 }} />,
      title: "Payment Successful!",
      message: (
        <>
          Thank you for your payment. Your order is on track to be delivered by{" "}
          <Typography component="span" fontWeight={600}>
            {orderStatus?.estimatedDeliveryDate}
          </Typography>
          .
        </>
      ),
    },
    Failed: {
      icon: <ErrorOutlineIcon color="error" sx={{ fontSize: 150 }} />,
      title: "Payment Failed",
      message:
        "We were unable to process your payment. Please try again or choose a different payment method.",
    },
  };

  const { icon, title, message } =
    statusDetails[paymentStatus] || statusDetails.Pending;

  return (
    <Box width="100%" sx={{ padding: "2rem", textAlign: "center" }}>
      {icon}

      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
        }}
        gutterBottom
      >
        {message}
      </Typography>

      <Typography
        fontSize={{ xs: "14px", sm: "16px" }}
        sx={{ color: "text.secondary", marginBottom: "1rem" }}
      >
        Order Number: {orderCode}
      </Typography>
    </Box>
  );
};

export default OrderPaymentStatus;
