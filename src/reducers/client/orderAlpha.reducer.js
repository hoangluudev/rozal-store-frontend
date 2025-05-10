import {
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  FETCH_ORDER_BY_CODE_PENDING,
  FETCH_ORDER_BY_CODE_SUCCESS,
  FETCH_ORDER_BY_CODE_ERROR,
  FETCH_ORDER_CHECKOUT_INFO_PENDING,
  FETCH_ORDER_CHECKOUT_INFO_SUCCESS,
  FETCH_ORDER_CHECKOUT_INFO_ERROR,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR,
  FETCH_USER_ORDER_HISTORY_PENDING,
  FETCH_USER_ORDER_HISTORY_SUCCESS,
  FETCH_USER_ORDER_HISTORY_ERROR,
  CREATE_ORDER_CANCELLATION_REQUEST_PENDING,
  CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS,
  CREATE_ORDER_CANCELLATION_REQUEST_ERROR,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR,
  ON_BUY_ORDER_AGAIN_PENDING,
  ON_BUY_ORDER_AGAIN_SUCCESS,
  ON_BUY_ORDER_AGAIN_ERROR,
} from "../../constants/client/order.constant";

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

const ORDER_ALPHA_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_PENDING:
      state.createOrderPending = true;
      state.createOrderSuccess = false;
      break;
    case CREATE_ORDER_SUCCESS:
      state.createOrderPending = false;
      state.createOrderSuccess = true;
      {
        let dataObj = action.payload.data;

        state.createdOrderCode = dataObj.createdOrderCode;
        state.paymentUrl = dataObj.paymentUrl;
      }
      break;
    case CREATE_ORDER_ERROR:
      state.createOrderPending = false;
      state.createOrderSuccess = false;
      break;
    case FETCH_ORDER_CHECKOUT_INFO_PENDING:
      state.fetchCheckoutInfoPending = true;
      break;
    case FETCH_ORDER_CHECKOUT_INFO_SUCCESS:
      state.fetchCheckoutInfoPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedCartData = dataObj.selectedCartItem;
        state.orderBillings = dataObj.orderBillings;
        state.selectedShippingOption = dataObj.selectedShippingOption;
        state.shippingOptions = dataObj.shippingOptions;
      }
      break;
    case FETCH_ORDER_CHECKOUT_INFO_ERROR:
      state.fetchCheckoutInfoPending = false;
      break;
    case FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING:
      state.fetchOrderStatusByCodePending = true;
      break;
    case FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS:
      state.fetchOrderStatusByCodePending = false;
      {
        let dataObj = action.payload.data;

        state.orderCheckoutData = dataObj.orderData;
      }
      break;
    case FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR:
      state.fetchOrderStatusByCodePending = false;
      break;
    case CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING:
      state.createRetryZaloPaymentRequestPending = true;
      state.createZaloRetryRequestSuccess = false;
      break;
    case CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS:
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
    case CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR:
      state.createRetryZaloPaymentRequestPending = false;
      state.createZaloRetryRequestSuccess = false;
      break;
    case FETCH_USER_ORDER_HISTORY_PENDING:
      state.fetchUserOrderHistoryPending = true;
      break;
    case FETCH_USER_ORDER_HISTORY_SUCCESS:
      state.fetchUserOrderHistoryPending = false;
      {
        let dataObj = action.payload.data;

        state.orderHistoryData = dataObj.data;
        state.paginationInfo = dataObj.paginationInfo;
      }
      break;
    case FETCH_USER_ORDER_HISTORY_ERROR:
      state.fetchUserOrderHistoryPending = false;
      break;
    case FETCH_ORDER_BY_CODE_PENDING:
      state.fetchOrderByCodePending = true;
      break;
    case FETCH_ORDER_BY_CODE_SUCCESS:
      state.fetchOrderByCodePending = false;
      {
        let dataObj = action.payload.data;

        state.orderDetailItem = dataObj.data;
      }
      break;
    case FETCH_ORDER_BY_CODE_ERROR:
      state.fetchOrderByCodePending = false;
      break;
    case CREATE_ORDER_CANCELLATION_REQUEST_PENDING:
      state.createOrderCancellationRequestPending = true;
      break;
    case CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS:
      state.createOrderCancellationRequestPending = false;
      break;
    case CREATE_ORDER_CANCELLATION_REQUEST_ERROR:
      state.createOrderCancellationRequestPending = false;
      break;
    case UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING:
      state.updateOrderCustomerPaymentMethodPending = true;
      break;
    case UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS:
      state.updateOrderCustomerPaymentMethodPending = false;
      break;
    case UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR:
      state.updateOrderCustomerPaymentMethodPending = false;
      break;
    case UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING:
      state.updateOrderCustomerDeliveryAddressPending = true;
      break;
    case UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS:
      state.updateOrderCustomerDeliveryAddressPending = false;
      break;
    case UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR:
      state.updateOrderCustomerDeliveryAddressPending = false;
      break;
    case ON_BUY_ORDER_AGAIN_PENDING:
      state.repurchaseOrderPending = true;
      break;
    case ON_BUY_ORDER_AGAIN_SUCCESS:
      state.repurchaseOrderPending = false;
      break;
    case ON_BUY_ORDER_AGAIN_ERROR:
      state.repurchaseOrderPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default ORDER_ALPHA_REDUCERS;
