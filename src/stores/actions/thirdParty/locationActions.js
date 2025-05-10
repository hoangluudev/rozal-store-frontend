import { LOCATION_CONST } from "../../constants";

export const fetchCity = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOCATION_CONST.FETCH_CITY_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/",
        requestOptions
      );

      const cityData = await response.json();

      dispatch({
        type: LOCATION_CONST.FETCH_CITY_NAME_SUCCESS,
        data: cityData,
      });
    } catch (error) {
      dispatch({ type: LOCATION_CONST.FETCH_CITY_NAME_ERROR });
    }
  };
};
export const fetchDistrict = (paramProvinceData) => {
  return async (dispatch) => {
    try {
      const gProvinceID = paramProvinceData.province_id;
      dispatch({ type: LOCATION_CONST.FETCH_DISTRICT_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/district/" + gProvinceID,
        requestOptions
      );

      const districtData = await response.json();

      dispatch({
        type: LOCATION_CONST.FETCH_DISTRICT_NAME_SUCCESS,
        data: districtData,
      });
    } catch (error) {
      dispatch({ type: LOCATION_CONST.FETCH_DISTRICT_NAME_ERROR });
    }
  };
};
export const fetchWard = (paramDistrictData) => {
  return async (dispatch) => {
    try {
      const gDistrictID = paramDistrictData.district_id;
      dispatch({ type: LOCATION_CONST.FETCH_WARD_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/ward/" + gDistrictID,
        requestOptions
      );

      const districtData = await response.json();

      dispatch({
        type: LOCATION_CONST.FETCH_WARD_NAME_SUCCESS,
        data: districtData,
      });
    } catch (error) {
      dispatch({ type: LOCATION_CONST.FETCH_WARD_NAME_ERROR });
    }
  };
};
