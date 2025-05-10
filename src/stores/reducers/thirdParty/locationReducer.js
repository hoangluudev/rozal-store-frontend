import { LOCATION_CONST } from "../../constants";

const initialState = {
  fetchCityPending: false,
  fetchDistrictPending: false,
  fetchWardPending: false,

  cityDataLists: [],
  districtDataLists: [],
  wardDataLists: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CONST.FETCH_CITY_NAME_PENDING:
      state.fetchCityPending = true;
      break;
    case LOCATION_CONST.FETCH_CITY_NAME_SUCCESS:
      state.fetchCityPending = false;
      state.cityDataLists = action.data.results;
      break;
    case LOCATION_CONST.FETCH_CITY_NAME_ERROR:
      state.fetchCityPending = false;
      break;
    case LOCATION_CONST.FETCH_DISTRICT_NAME_PENDING:
      state.fetchDistrictPending = true;
      break;
    case LOCATION_CONST.FETCH_DISTRICT_NAME_SUCCESS:
      state.fetchDistrictPending = false;
      state.districtDataLists = action.data.results;
      state.wardDataLists = [];
      break;
    case LOCATION_CONST.FETCH_DISTRICT_NAME_ERROR:
      state.fetchDistrictPending = false;
      break;
    case LOCATION_CONST.FETCH_WARD_NAME_PENDING:
      state.fetchWardPending = true;
      break;
    case LOCATION_CONST.FETCH_WARD_NAME_SUCCESS:
      state.fetchWardPending = false;
      state.wardDataLists = action.data.results;
      break;
    case LOCATION_CONST.FETCH_WARD_NAME_ERROR:
      state.fetchWardPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default locationReducer;
