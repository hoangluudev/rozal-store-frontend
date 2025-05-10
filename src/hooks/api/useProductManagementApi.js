import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductByID,
  createProduct,
  updateProductByID,
  deleteProductByID,
  deleteMultipleSubcategoryByID,
  fetchProductOptions,
  getSelectedIDs,
} from "../../stores/actions/product/productManagementActions";

const useProductManagementApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.productManagementReducer);

  const fetchProductsCb = useCallback(
    (query) => {
      dispatch(fetchProducts(query));
    },
    [dispatch]
  );

  const fetchProductByIDCb = useCallback(
    (id) => {
      dispatch(fetchProductByID(id));
    },
    [dispatch]
  );

  const createProductCb = useCallback(
    (data) => {
      dispatch(createProduct(data));
    },
    [dispatch]
  );

  const updateProductByIDCb = useCallback(
    (data, id) => {
      dispatch(updateProductByID(data, id));
    },
    [dispatch]
  );

  const deleteProductByIDCb = useCallback(
    (id) => {
      dispatch(deleteProductByID(id));
    },
    [dispatch]
  );

  const deleteMultipleSubcategoryByIDCb = useCallback(
    (ids) => {
      dispatch(deleteMultipleSubcategoryByID(ids));
    },
    [dispatch]
  );

  const fetchProductOptionsCb = useCallback(() => {
    dispatch(fetchProductOptions());
  }, [dispatch]);

  const getSelectedIDsCb = useCallback(
    (ids) => {
      dispatch(getSelectedIDs(ids));
    },
    [dispatch]
  );

  return {
    state,
    fetchProducts: fetchProductsCb,
    fetchProductByID: fetchProductByIDCb,
    createProduct: createProductCb,
    updateProductByID: updateProductByIDCb,
    deleteProductByID: deleteProductByIDCb,
    deleteMultipleSubcategoryByID: deleteMultipleSubcategoryByIDCb,
    fetchProductOptions: fetchProductOptionsCb,
    getSelectedIDs: getSelectedIDsCb,
  };
};

export default useProductManagementApi;
