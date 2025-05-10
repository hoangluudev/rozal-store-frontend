import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductRating } from "../../stores/actions/rating";

const useRatingApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ratingReducer);

  const createProductRatingCb = useCallback(
    (data, productCode) => {
      dispatch(createProductRating(data, productCode));
    },
    [dispatch]
  );

  return {
    state,
    createProductRating: createProductRatingCb,
  };
};

export default useRatingApi;
