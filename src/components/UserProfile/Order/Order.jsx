import * as React from "react";
import { TitleBlockLayout } from "../../common/Layout";
import { useLocation } from "react-router-dom";
import { NoDataComponent } from "../../misc/DataNotFound.component";
import { PaginationComponent } from "../../common/UI";
import OrderCard from "./components/OrderCard";
import { Box, Stack } from "@mui/material";
import OrderToolbar from "./components/OrderToolbar";
import { useCurrentUserApi, useOrderApi } from "../../../hooks/api";

const Order = () => {
  const location = useLocation();
  const searchParamsData = location.search;
  const { currentUserData } = useCurrentUserApi().state;
  const { fetchUserOrderHistory } = useOrderApi();
  const {
    orderHistoryData,
    fetchUserOrderHistoryPending,
    paginationInfo,
    updateOrderCustomerPaymentMethodPending,
    updateOrderCustomerDeliveryAddressPending,
  } = useOrderApi().state;

  React.useEffect(() => {
    if (
      currentUserData ||
      searchParamsData ||
      updateOrderCustomerPaymentMethodPending ||
      updateOrderCustomerDeliveryAddressPending
    ) {
      fetchUserOrderHistory(searchParamsData);
    }
  }, [
    currentUserData,
    searchParamsData,
    updateOrderCustomerPaymentMethodPending,
    updateOrderCustomerDeliveryAddressPending,
    fetchUserOrderHistory,
  ]);
  return (
    <React.Fragment>
      <TitleBlockLayout
        primary="Order History"
        secondary="Display information about products you have purchased at our Shop."
      >
        <Box width="100%">
          <OrderToolbar
            data={paginationInfo}
            pending={fetchUserOrderHistoryPending}
          />
          {orderHistoryData.length > 0 ? (
            <Stack flexDirection="column" rowGap={2}>
              {orderHistoryData.map((order) => (
                <OrderCard orderItem={order} key={order.orderCode} />
              ))}
              <PaginationComponent
                currentPage={paginationInfo.page}
                totalPage={paginationInfo.totalPage}
                pending={fetchUserOrderHistoryPending}
                sx={{
                  margin: 0,
                  p: 2,
                }}
              />
            </Stack>
          ) : (
            <NoDataComponent />
          )}
        </Box>
      </TitleBlockLayout>
    </React.Fragment>
  );
};
export default Order;
