import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { createProductType } from "../../../../actions/admin/category.action";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { ProductTypeForm } from "./form/form.component";

export const CreateProductTypeComponent = () => {
  const dispatch = useDispatch();
  const { isCreateCategorySuccess } = useSelector(
    (reduxData) => reduxData.CATEGORY_ADMIN_REDUCERS
  );
  const initialFormData = {
    name: "",
    categoryId: "",
    description: "",
    avatarImage: "",
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
    setFormData(initialFormData);
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    dispatch(createProductType(requestData));
  };

  React.useEffect(() => {
    if (isCreateCategorySuccess) {
      setRequestData({});
      setFormData({
        name: "",
        categoryId: "",
        description: "",
        avatarImage: "",
        isPublished: false,
      });
      setFormSubmitted(false);
    }
  }, [dispatch, isCreateCategorySuccess]);
  return (
    <Box style={{ padding: "1rem" }}>
      <NavFormComponent
        title="Add Product Type"
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
