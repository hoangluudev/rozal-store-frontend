import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  fetchCategoryByID,
  updateCategoryByID,
} from "../../../../actions/admin/category.action";
import { NavFormComponent } from "../../../common/Layout";
import { isEmptyObj } from "../../../../utils/formatting";
import { CategoryForm } from "./form/form.component";

export const EditCategoryComponent = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { selectedCategoryData, isUpdateCategorySuccess } = useSelector(
    (reduxData) => reduxData.CATEGORY_ADMIN_REDUCERS
  );

  const initialFormData = {
    name: "",
    description: "",
    avatarImage: null,
    isPublished: false,
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [requestData, setRequestData] = React.useState({});
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const onFormInputChange = (data) => {
    setRequestData(data);
    setFormData(data);
  };

  const handleReset = () => {
    setRequestData({});
    setFormData(selectedCategoryData || initialFormData);
    setFormSubmitted(false);
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    dispatch(updateCategoryByID(requestData, selectedCategoryData._id));
  };

  React.useEffect(() => {
    dispatch(fetchCategoryByID(categoryId));
  }, [dispatch, categoryId]);
  React.useEffect(() => {
    if (!isEmptyObj(selectedCategoryData)) {
      setFormData(selectedCategoryData);
    }
  }, [selectedCategoryData]);
  React.useEffect(() => {
    if (isUpdateCategorySuccess) {
      setRequestData({});
      setFormSubmitted(false);
    }
  }, [isUpdateCategorySuccess]);
  return (
    <Box style={{ padding: "1rem" }}>
      <NavFormComponent
        title={selectedCategoryData ? selectedCategoryData?.name : "N/A"}
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
