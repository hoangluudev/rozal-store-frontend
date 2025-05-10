import * as React from "react";
import { Box } from "@mui/material";
import { ProductForm } from "./form/form.component";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { useProductManagementApi } from "../../../../hooks/api";

export const CreateProductAlphaComponent = () => {
  const { createProduct, fetchProductOptions } = useProductManagementApi();
  const { isCreateProductSuccess } = useProductManagementApi().state;
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
    setFormData(initialFormData);
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    createProduct(requestData);
  };

  React.useEffect(() => {
    if (isCreateProductSuccess) {
      setRequestData({});
      setFormData({
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
      });
      setFormSubmitted(false);
    }
  }, [isCreateProductSuccess]);
  React.useEffect(() => {
    fetchProductOptions();
  }, [fetchProductOptions]);
  return (
    <Box>
      <NavFormComponent
        title="Add Product"
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
