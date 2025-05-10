import React from "react";
import { useParams } from "react-router-dom";
import {
  BlockLayoutComponent,
  PageContainerLayout,
} from "../../components/common/Layout";
import OrderStatusSection from "../../components/OrderPlacedStatus";
import NavigateButtons from "../../components/OrderPlacedStatus/components/NavigateButtons";
import { useCurrentUserApi, useOrderApi } from "../../hooks/api";

const OrderSuccessPage = () => {
  const { orderCode } = useParams();

  const { currentUserData } = useCurrentUserApi().state;
  const { fetchOrderStatusCheckoutByCode } = useOrderApi();
  const { fetchOrderStatusByCodePending, orderCheckoutData } =
    useOrderApi().state;

  const shoppingPageUrl = "/products-alpha";
  const orderDetailPage = "/user/order";

  React.useEffect(() => {
    if (currentUserData) {
      fetchOrderStatusCheckoutByCode(orderCode);
    }
  }, [fetchOrderStatusCheckoutByCode, currentUserData, orderCode]);

  return (
    <PageContainerLayout>
      <BlockLayoutComponent>
        <OrderStatusSection
          orderCode={orderCode}
          orderData={orderCheckoutData}
          isLoading={fetchOrderStatusByCodePending}
        />
        <NavigateButtons
          paymentStatus={orderCheckoutData?.paymentStatus}
          orderData={orderCheckoutData}
          shopURL={shoppingPageUrl}
          orderURL={orderDetailPage + "/" + orderCode}
          orderCode={orderCode}
        />
      </BlockLayoutComponent>
    </PageContainerLayout>
  );
};

export default OrderSuccessPage;
