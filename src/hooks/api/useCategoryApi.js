import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchCategoryByID,
  createCategory,
  createProductType,
  updateCategoryByID,
  updateProductTypeByID,
  deleteCategoryByID,
  deleteMultipleCategoryByID,
  deleteMultipleProductTypeByID,
  deleteProductTypeByID,
  fetchCategoryOptions,
  fetchProductType,
  fetchProductTypeByID,
  getSelectedIDs,
} from "../../stores/actions/category";

const useCategoryApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.categoryReducer);

  const fetchCategoryCb = useCallback(
    (query) => {
      dispatch(fetchCategory(query));
    },
    [dispatch]
  );

  const fetchCategoryByIDCb = useCallback(
    (id) => {
      dispatch(fetchCategoryByID(id));
    },
    [dispatch]
  );

  const createCategoryCb = useCallback(
    (data) => {
      dispatch(createCategory(data));
    },
    [dispatch]
  );

  const updateCategoryByIDCb = useCallback(
    (data, id) => {
      dispatch(updateCategoryByID(data, id));
    },
    [dispatch]
  );

  const deleteCategoryByIDCb = useCallback(
    (id) => {
      dispatch(deleteCategoryByID(id));
    },
    [dispatch]
  );

  const deleteMultipleCategoryByIDCb = useCallback(
    (ids) => {
      dispatch(deleteMultipleCategoryByID(ids));
    },
    [dispatch]
  );

  const getSelectedIDsCb = useCallback(
    (ids) => {
      dispatch(getSelectedIDs(ids));
    },
    [dispatch]
  );

  const fetchCategoryOptionsCb = useCallback(() => {
    dispatch(fetchCategoryOptions());
  }, [dispatch]);

  const fetchProductTypeCb = useCallback(
    (query) => {
      dispatch(fetchProductType(query));
    },
    [dispatch]
  );

  const fetchProductTypeByIDCb = useCallback(
    (id) => {
      dispatch(fetchProductTypeByID(id));
    },
    [dispatch]
  );

  const createProductTypeCb = useCallback(
    (data) => {
      dispatch(createProductType(data));
    },
    [dispatch]
  );

  const updateProductTypeByIDCb = useCallback(
    (data, id) => {
      dispatch(updateProductTypeByID(data, id));
    },
    [dispatch]
  );

  const deleteProductTypeByIDCb = useCallback(
    (id) => {
      dispatch(deleteProductTypeByID(id));
    },
    [dispatch]
  );

  const deleteMultipleProductTypeByIDCb = useCallback(
    (ids) => {
      dispatch(deleteMultipleProductTypeByID(ids));
    },
    [dispatch]
  );

  return {
    state,
    fetchCategory: fetchCategoryCb,
    fetchCategoryByID: fetchCategoryByIDCb,
    createCategory: createCategoryCb,
    updateCategoryByID: updateCategoryByIDCb,
    deleteCategoryByID: deleteCategoryByIDCb,
    deleteMultipleCategoryByID: deleteMultipleCategoryByIDCb,
    getSelectedIDs: getSelectedIDsCb,
    fetchCategoryOptions: fetchCategoryOptionsCb,
    fetchProductType: fetchProductTypeCb,
    fetchProductTypeByID: fetchProductTypeByIDCb,
    createProductType: createProductTypeCb,
    updateProductTypeByID: updateProductTypeByIDCb,
    deleteProductTypeByID: deleteProductTypeByIDCb,
    deleteMultipleProductTypeByID: deleteMultipleProductTypeByIDCb,
  };
};

export default useCategoryApi;
