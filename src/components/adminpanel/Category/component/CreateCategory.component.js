import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { CategoryForm } from "./form/form.component";
import { createCategory } from "../../../../actions/admin/category.action";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";

export const CreateCategoryComponent = () => {
  const dispatch = useDispatch();
  const { isCreateCategorySuccess } = useSelector(
    (reduxData) => reduxData.CATEGORY_ADMIN_REDUCERS
  );
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
    dispatch(createCategory(requestData));
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
  }, [dispatch, isCreateCategorySuccess]);
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
