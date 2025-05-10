import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  fetchProductTypeByID,
  updateProductTypeByID,
} from "../../../../actions/admin/category.action";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { useParams } from "react-router-dom";
import { ProductTypeForm } from "./form/form.component";

export const EditProductTypeComponent = () => {
  const dispatch = useDispatch();
  const { productTypeId } = useParams();
  const { selectedProductTypeData, isUpdateCategorySuccess } = useSelector(
    (reduxData) => reduxData.CATEGORY_ADMIN_REDUCERS
  );
  const initialFormData = {
    name: "",
    categoryId: "",
    description: "",
    avatarImage: null,
    isPublished: false,
  };
  const [requestData, setRequestData] = React.useState({});
  const [formData, setFormData] = React.useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const onFormInputChange = (data) => {
    setRequestData(data);
    setFormData(data);
  };
  const handleReset = () => {
    setRequestData({});
    setFormData(selectedProductTypeData || initialFormData);
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    dispatch(updateProductTypeByID(requestData, selectedProductTypeData._id));
  };

  React.useEffect(() => {
    if (!isEmptyObj(selectedProductTypeData)) {
      setFormData(selectedProductTypeData);
    }
  }, [selectedProductTypeData]);
  React.useEffect(() => {
    if (isUpdateCategorySuccess) {
      setRequestData({});
      setFormSubmitted(false);
    }
  }, [isUpdateCategorySuccess]);
  React.useEffect(() => {
    dispatch(fetchProductTypeByID(productTypeId));
  }, [dispatch, productTypeId]);
  return (
    <Box style={{ padding: "1rem" }}>
      <NavFormComponent
        title={selectedProductTypeData ? selectedProductTypeData?.name : "N/A"}
        backTo={"/admin-panel/product-alpha/product-types"}
        isVisibleDiscard={!isEmptyObj(requestData)}
        isDisabledSaveButton={isEmptyObj(requestData)}
        onDiscard={() => handleReset()}
        onSubmit={() => handleSubmit()}
      />
      <ProductTypeForm
        formData={formData}
        formSubmitted={formSubmitted}
        onChange={onFormInputChange}
      />
    </Box>
  );
};
