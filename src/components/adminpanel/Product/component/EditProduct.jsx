import * as React from "react";
import { Box } from "@mui/material";
import { ProductForm } from "./form/form.component";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { useParams } from "react-router-dom";
import { useProductManagementApi } from "../../../../hooks/api";

export const EditProductAlphaComponent = () => {
  const { productId } = useParams();

  const { updateProductByID, fetchProductOptions, fetchProductByID } =
    useProductManagementApi();
  const { selectedProductData, isUpdateProductSuccess } =
    useProductManagementApi().state;
  const initialFormData = {
    name: "",
    description: "",
    avatarImage: "",
    images: [],
    productType: "",
    brand: "",
    gender: "",
    prices: {
      price: 0,
      comparePrice: 0,
    },
    stock: 0,
    status: "",
    tags: [],
    isPublished: false,
    hasVariation: false,
    variantOptions: [],
    variations: [],
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
    setFormData(selectedProductData || initialFormData);
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    updateProductByID(requestData, selectedProductData._id);
  };

  React.useEffect(() => {
    if (!isEmptyObj(selectedProductData)) {
      setFormData(selectedProductData);
    }
  }, [selectedProductData]);
  React.useEffect(() => {
    if (isUpdateProductSuccess) {
      setRequestData({});
      setFormSubmitted(false);
    }
  }, [isUpdateProductSuccess]);
  React.useEffect(() => {
    fetchProductOptions();
  }, [fetchProductOptions]);
  React.useEffect(() => {
    fetchProductByID(productId);
  }, [fetchProductByID, productId]);
  return (
    <Box>
      <NavFormComponent
        title={selectedProductData ? selectedProductData?.name : "N/A"}
        backTo={"/admin-panel/product-alpha"}
        isVisibleDiscard={!isEmptyObj(requestData)}
        isDisabledSaveButton={isEmptyObj(requestData)}
        onDiscard={() => handleReset()}
        onSubmit={() => handleSubmit()}
      />
      <ProductForm
        formData={formData}
        formSubmitted={formSubmitted}
        onChange={onFormInputChange}
      />
    </Box>
  );
};
