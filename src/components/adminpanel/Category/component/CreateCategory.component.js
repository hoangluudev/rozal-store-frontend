import * as React from "react";
import { Box } from "@mui/material";
import { CategoryForm } from "./form/form.component";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { useCategoryApi } from "@/hooks/api";

export const CreateCategoryComponent = () => {
  const { createCategory } = useCategoryApi();
  const { isCreateCategorySuccess } = useCategoryApi().state;

  const initialFormData = {
    name: "",
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
    setFormData({
      name: "",
      description: "",
      avatarImage: null,
      isPublished: false,
    });
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    createCategory(requestData);
  };

  React.useEffect(() => {
    if (isCreateCategorySuccess) {
      setRequestData({});
      setFormData({
        name: "",
        description: "",
        avatarImage: null,
        isPublished: false,
      });
      setFormSubmitted(false);
    }
  }, [isCreateCategorySuccess]);
  return (
    <Box style={{ padding: "1rem" }}>
      <NavFormComponent
        title="Add Category"
        backTo={"/admin-panel/product-alpha/categories"}
        isVisibleDiscard={!isEmptyObj(requestData)}
        isDisabledSaveButton={isEmptyObj(requestData)}
        onDiscard={() => handleReset()}
        onSubmit={() => handleSubmit()}
      />
      <CategoryForm
        formData={formData}
        formSubmitted={formSubmitted}
        onChange={onFormInputChange}
      />
    </Box>
  );
};
