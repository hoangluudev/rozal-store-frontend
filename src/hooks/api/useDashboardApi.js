import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStatistics } from "../../stores/actions/dashboard";
import { useCallback } from "react";

const useDashboardApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.adminDashboardReducer);
  const fetchDashboardStatisticsCb = useCallback(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);
  return {
    state,
    fetchDashboardStatistics: fetchDashboardStatisticsCb,
  };
};

export default useDashboardApi;
