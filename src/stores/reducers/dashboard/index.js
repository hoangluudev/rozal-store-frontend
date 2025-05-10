import { DASHBOARD_CONST } from "../../constants";

const initialState = {
  fetchOrderDashboardPending: false,

  orderStatistics: {},
  totalOrderCount: {},
  totalRevenue: {},
  totalSales: {},
  totalProductSold: null,
  totalClientCount: null,
  totalProductEachCategory: null,
  topSoldProduct: null,

  saleStatisticOverrall: {},
};

const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_CONST.FETCH_ORDER_DASHBOARD_PENDING:
      state.fetchOrderDashboardPending = true;
      break;
    case DASHBOARD_CONST.FETCH_ORDER_DASHBOARD_SUCCESS:
      state.fetchOrderDashboardPending = false;
      state.orderStatistics = action.payload;
      state.totalOrderCount = state.orderStatistics.orderStatusCountBy;
      state.totalRevenue = action.payload.totalRevenue;
      state.totalSales = action.payload.totalSales;
      state.totalProductSold = action.payload.totalProductSold;
      state.totalClientCount = action.payload.totalClientCount;
      state.saleStatisticOverrall = action.payload.overrallStatsBy;
      state.totalProductEachCategory = action.payload.totalProductEachCategory;
      state.topSoldProduct = action.payload.topSoldProducts;
      break;
    case DASHBOARD_CONST.FETCH_ORDER_DASHBOARD_ERROR:
      state.fetchOrderDashboardPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default adminDashboardReducer;
