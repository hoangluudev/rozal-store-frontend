import React from "react";
import DefaultState from "./components/DefaultState";
import LoadingState from "./components/LoadingState";
import OrderPlacedSuccess from "./components/OrderPlacedSuccessState";
import OrderPaymentStatus from "./components/OrderPaymentStatus";

const OrderStatusSection = ({
  orderCode = "",
  orderData = null,
  isLoading = true,
}) => {
  if (!orderCode) {
    return <DefaultState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (orderData?.isOnlinePayment) {
    return (
      <OrderPaymentStatus
        orderCode={orderCode}
        orderStatus={orderData}
        paymentStatus={orderData?.paymentStatus}
      />
    );
  }

  if (orderData?.orderStatus === "Pending" && !orderData?.isOnlinePayment) {
    return (
      <OrderPlacedSuccess
        orderCode={orderCode}
        totalAmount={orderData?.totalAmount}
      />
    );
  }

  return <DefaultState />;
};

export default OrderStatusSection;
