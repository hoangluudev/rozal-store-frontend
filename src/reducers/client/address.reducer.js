import {
  FETCH_CITY_NAME_PENDING,
  FETCH_CITY_NAME_SUCCESS,
  FETCH_CITY_NAME_ERROR,
  FETCH_DISTRICT_NAME_PENDING,
  FETCH_DISTRICT_NAME_SUCCESS,
  FETCH_DISTRICT_NAME_ERROR,
  FETCH_WARD_NAME_PENDING,
  FETCH_WARD_NAME_SUCCESS,
  FETCH_WARD_NAME_ERROR,
} from "../../constants/user.constant";

const initialState = {
  fetchCityPending: false,
  fetchDistrictPending: false,
  fetchWardPending: false,

  cityDataLists: [],
  districtDataLists: [],
  wardDataLists: [],
};

const ADDRESS_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_NAME_PENDING:
      state.fetchCityPending = true;
      break;
    case FETCH_CITY_NAME_SUCCESS:
      state.fetchCityPending = false;
      state.cityDataLists = action.data.results;
      break;
    case FETCH_CITY_NAME_ERROR:
      state.fetchCityPending = false;
      break;
    case FETCH_DISTRICT_NAME_PENDING:
      state.fetchDistrictPending = true;
      break;
    case FETCH_DISTRICT_NAME_SUCCESS:
      state.fetchDistrictPending = false;
      state.districtDataLists = action.data.results;
      state.wardDataLists = [];
      break;
    case FETCH_DISTRICT_NAME_ERROR:
      state.fetchDistrictPending = false;
      break;
    case FETCH_WARD_NAME_PENDING:
      state.fetchWardPending = true;
      break;
    case FETCH_WARD_NAME_SUCCESS:
      state.fetchWardPending = false;
      state.wardDataLists = action.data.results;
      break;
    case FETCH_WARD_NAME_ERROR:
      state.fetchWardPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default ADDRESS_REDUCERS;
