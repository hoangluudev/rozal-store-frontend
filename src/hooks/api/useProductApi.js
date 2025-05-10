import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductByCode,
  fetchProductFilterOptions,
  fetchRelatedProductsByCode,
  fetchFeaturedProducts,
  fetchLatestProducts,
} from "../../stores/actions/product/productActions";

const useProducttApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.productReducer);

  const fetchProductsCb = useCallback(
    (query) => {
      dispatch(fetchProducts(query));
    },
    [dispatch]
  );

  const fetchProductByCodeCb = useCallback(
    (productCode) => {
      dispatch(fetchProductByCode(productCode));
    },
    [dispatch]
  );

  const fetchProductFilterOptionsCb = useCallback(() => {
    dispatch(fetchProductFilterOptions());
  }, [dispatch]);

  const fetchRelatedProductsByCodeCb = useCallback(
    (productCode) => {
      dispatch(fetchRelatedProductsByCode(productCode));
    },
    [dispatch]
  );

  const fetchFeaturedProductsCb = useCallback(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const fetchLatestProductsCb = useCallback(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  return {
    state,
    fetchProducts: fetchProductsCb,
    fetchProductByCode: fetchProductByCodeCb,
    fetchProductFilterOptions: fetchProductFilterOptionsCb,
    fetchRelatedProductsByCode: fetchRelatedProductsByCodeCb,
    fetchFeaturedProducts: fetchFeaturedProductsCb,
    fetchLatestProducts: fetchLatestProductsCb,
  };
};

export default useProducttApi;
