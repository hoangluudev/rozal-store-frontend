import { ORDER_CONST } from "../../constants";

const initialState = {
  createOrderPending: false,
  fetchCheckoutInfoPending: false,
  fetchOrderStatusByCodePending: false,
  createRetryZaloPaymentRequestPending: false,
  fetchUserOrderHistoryPending: false,
  fetchOrderByCodePending: false,
  createOrderCancellationRequestPending: false,
  updateOrderCustomerPaymentMethodPending: false,
  updateOrderCustomerDeliveryAddressPending: false,
  repurchaseOrderPending: false,

  createOrderSuccess: false,
  createZaloRetryRequestSuccess: false,

  selectedCartData: [],
  orderHistoryData: [],
  orderDetailItem: null,
  paginationInfo: {
    totalItemCount: 0,
    totalPage: 0,
    currentPage: 1,
  },

  shippingOptions: [],
  orderBillings: {
    subTotalAmount: 0,
    totalSavedAmount: 0,
    shippingFee: 0,
    totalAmount: 0,
  },
  selectedShippingOption: null,
  createdOrderCode: null,
  paymentUrl: null,
  orderCheckoutData: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CONST.CREATE_ORDER_PENDING:
      state.createOrderPending = true;
      state.createOrderSuccess = false;
      break;
    case ORDER_CONST.CREATE_ORDER_SUCCESS:
      state.createOrderPending = false;
      state.createOrderSuccess = true;
      {
        let dataObj = action.payload.data;

        state.createdOrderCode = dataObj.createdOrderCode;
        state.paymentUrl = dataObj.paymentUrl;
      }
      break;
    case ORDER_CONST.CREATE_ORDER_ERROR:
      state.createOrderPending = false;
      state.createOrderSuccess = false;
      break;
    case ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_PENDING:
      state.fetchCheckoutInfoPending = true;
      break;
    case ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_SUCCESS:
      state.fetchCheckoutInfoPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedCartData = dataObj.selectedCartItem;
        state.orderBillings = dataObj.orderBillings;
        state.selectedShippingOption = dataObj.selectedShippingOption;
        state.shippingOptions = dataObj.shippingOptions;
      }
      break;
    case ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_ERROR:
      state.fetchCheckoutInfoPending = false;
      break;
    case ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING:
      state.fetchOrderStatusByCodePending = true;
      break;
    case ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS:
      state.fetchOrderStatusByCodePending = false;
      {
        let dataObj = action.payload.data;

        state.orderCheckoutData = dataObj.orderData;
      }
      break;
    case ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR:
      state.fetchOrderStatusByCodePending = false;
      break;
    case ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING:
      state.createRetryZaloPaymentRequestPending = true;
      state.createZaloRetryRequestSuccess = false;
      break;
    case ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS:
      state.createRetryZaloPaymentRequestPending = false;
      state.createZaloRetryRequestSuccess = true;
      {
        let dataObj = action.payload.data;

        state.paymentUrl = dataObj.paymentUrl;

        if (state.paymentUrl) {
          window.open(state.paymentUrl);
          window.location.reload();
        }
      }
      break;
    case ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR:
      state.createRetryZaloPaymentRequestPending = false;
      state.createZaloRetryRequestSuccess = false;
      break;
    case ORDER_CONST.FETCH_USER_ORDER_HISTORY_PENDING:
      state.fetchUserOrderHistoryPending = true;
      break;
    case ORDER_CONST.FETCH_USER_ORDER_HISTORY_SUCCESS:
      state.fetchUserOrderHistoryPending = false;
      {
        let dataObj = action.payload.data;

        state.orderHistoryData = dataObj.data;
        state.paginationInfo = dataObj.paginationInfo;
      }
      break;
    case ORDER_CONST.FETCH_USER_ORDER_HISTORY_ERROR:
      state.fetchUserOrderHistoryPending = false;
      break;
    case ORDER_CONST.FETCH_ORDER_BY_CODE_PENDING:
      state.fetchOrderByCodePending = true;
      break;
    case ORDER_CONST.FETCH_ORDER_BY_CODE_SUCCESS:
      state.fetchOrderByCodePending = false;
      {
        let dataObj = action.payload.data;

        state.orderDetailItem = dataObj.data;
      }
      break;
    case ORDER_CONST.FETCH_ORDER_BY_CODE_ERROR:
      state.fetchOrderByCodePending = false;
      break;
    case ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_PENDING:
      state.createOrderCancellationRequestPending = true;
      break;
    case ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS:
      state.createOrderCancellationRequestPending = false;
      break;
    case ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_ERROR:
      state.createOrderCancellationRequestPending = false;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING:
      state.updateOrderCustomerPaymentMethodPending = true;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS:
      state.updateOrderCustomerPaymentMethodPending = false;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR:
      state.updateOrderCustomerPaymentMethodPending = false;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING:
      state.updateOrderCustomerDeliveryAddressPending = true;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS:
      state.updateOrderCustomerDeliveryAddressPending = false;
      break;
    case ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR:
      state.updateOrderCustomerDeliveryAddressPending = false;
      break;
    case ORDER_CONST.ON_BUY_ORDER_AGAIN_PENDING:
      state.repurchaseOrderPending = true;
      break;
    case ORDER_CONST.ON_BUY_ORDER_AGAIN_SUCCESS:
      state.repurchaseOrderPending = false;
      break;
    case ORDER_CONST.ON_BUY_ORDER_AGAIN_ERROR:
      state.repurchaseOrderPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default orderReducer;
