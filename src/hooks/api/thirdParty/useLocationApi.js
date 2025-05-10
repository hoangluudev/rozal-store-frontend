import { useDispatch, useSelector } from "react-redux";
import {
  fetchCity,
  fetchDistrict,
  fetchWard,
} from "../../../stores/actions/thirdParty/locationActions";

const useLocationApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.locationReducer);

  return {
    state,
    fetchCity: () => dispatch(fetchCity()),
    fetchDistrict: (cityData) => dispatch(fetchDistrict(cityData)),
    fetchWard: (districtData) => dispatch(fetchWard(districtData)),
  };
};

export default useLocationApi;
