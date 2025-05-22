import * as React from "react";
import { Box } from "@mui/material";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { useParams } from "react-router-dom";
import { ProductTypeForm } from "./form/form.component";
import { useCategoryApi } from "@/hooks/api";

export const EditProductTypeComponent = () => {
  const { fetchProductTypeByID, updateProductTypeByID } = useCategoryApi();
  const { selectedProductTypeData, isUpdateCategorySuccess } =
    useCategoryApi().state;
  const { productTypeId } = useParams();

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
    updateProductTypeByID(requestData, selectedProductTypeData._id);
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
    fetchProductTypeByID(productTypeId);
  }, [fetchProductTypeByID, productTypeId]);
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
