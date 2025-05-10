import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserOrderHistory,
  createOrder,
  fetchOrderByCode,
  cancelOrderbyOrderCode,
  fetchOrderCheckoutInfo,
  fetchOrderStatusCheckoutByCode,
  createZaloPaymentRetryRequest,
  onRepurchaseOrder,
  updateOrderDeliveryAddress,
  updateOrderPaymentMethod,
} from "../../stores/actions/order/orderActions";

const useOrderApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.orderReducer);

  const fetchUserOrderHistoryCb = useCallback(
    (query) => {
      dispatch(fetchUserOrderHistory(query));
    },
    [dispatch]
  );

  const fetchOrderByCodeCb = useCallback(
    (orderCode) => {
      dispatch(fetchOrderByCode(orderCode));
    },
    [dispatch]
  );

  const createOrderCb = useCallback(
    (data) => {
      dispatch(createOrder(data));
    },
    [dispatch]
  );

  const cancelOrderbyOrderCodeCb = useCallback(
    (data, orderCode) => {
      dispatch(cancelOrderbyOrderCode(data, orderCode));
    },
    [dispatch]
  );

  const fetchOrderStatusCheckoutByCodeCb = useCallback(
    (orderCode) => {
      dispatch(fetchOrderStatusCheckoutByCode(orderCode));
    },
    [dispatch]
  );

  const fetchOrderCheckoutInfoCb = useCallback(
    (filterQuery) => {
      dispatch(fetchOrderCheckoutInfo(filterQuery));
    },
    [dispatch]
  );

  const createZaloPaymentRetryRequestCb = useCallback(
    (orderCode) => {
      dispatch(createZaloPaymentRetryRequest(orderCode));
    },
    [dispatch]
  );

  const onRepurchaseOrderCb = useCallback(
    (orderCode) => {
      dispatch(onRepurchaseOrder(orderCode));
    },
    [dispatch]
  );

  const updateOrderDeliveryAddressCb = useCallback(
    (data, orderCode) => {
      dispatch(updateOrderDeliveryAddress(data, orderCode));
    },
    [dispatch]
  );

  const updateOrderPaymentMethodCb = useCallback(
    (data, orderCode) => {
      dispatch(updateOrderPaymentMethod(data, orderCode));
    },
    [dispatch]
  );

  return {
    state,
    fetchUserOrderHistory: fetchUserOrderHistoryCb,
    fetchOrderByCode: fetchOrderByCodeCb,
    createOrder: createOrderCb,
    cancelOrderbyOrderCode: cancelOrderbyOrderCodeCb,
    fetchOrderStatusCheckoutByCode: fetchOrderStatusCheckoutByCodeCb,
    fetchOrderCheckoutInfo: fetchOrderCheckoutInfoCb,
    createZaloPaymentRetryRequest: createZaloPaymentRetryRequestCb,
    onRepurchaseOrder: onRepurchaseOrderCb,
    updateOrderDeliveryAddress: updateOrderDeliveryAddressCb,
    updateOrderPaymentMethod: updateOrderPaymentMethodCb,
  };
};

export default useOrderApi;
