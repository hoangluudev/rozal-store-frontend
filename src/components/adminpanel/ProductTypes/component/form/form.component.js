import * as React from "react";
import { FormControlLabel, Box, Grid, FormControl } from "@mui/material";
import {
  BlockLayoutComponent,
  FormFieldComponent,
  GridLayoutComponent,
} from "../../../../common/Layout";
import { SwitchComponent } from "../../../../common/UI";
import {
  TextFieldComponent,
  UploadSingleImageComponent,
  SelectComponent,
} from "../../../../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryOptions } from "../../../../../actions/admin/category.action";

export const ProductTypeForm = ({ formData, onChange, formSubmitted }) => {
  const dispatch = useDispatch();
  const { categoryOptionsList } = useSelector(
    (reduxData) => reduxData.CATEGORY_ADMIN_REDUCERS
  );
  const onInputChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  React.useEffect(() => {
    dispatch(fetchCategoryOptions());
  }, [dispatch]);
  return (
    <Box>
      <GridLayoutComponent
        childrenLeft={
          <Grid container item rowSpacing={2}>
            <BlockLayoutComponent>
              <FormFieldComponent
                label="Name"
                id="category-name"
                isColumn={true}
                children={
                  <TextFieldComponent
                    fullWidth
                    id="category-name"
                    name="category-name"
                    error={!formData.name && formSubmitted}
                    helperText={
                      !formData.name && formSubmitted ? "*required" : ""
                    }
                    value={formData.name}
                    onChange={(value) => onInputChange("name", value)}
                  />
                }
              />
              <FormFieldComponent
                label="Description"
                isColumn={true}
                children={
                  <TextFieldComponent
                    name="description"
                    value={formData.description}
                    onChange={(value) => onInputChange("description", value)}
                    fullWidth
                    multiline
                    rows={4}
                  />
                }
              />
            </BlockLayoutComponent>
            <BlockLayoutComponent title="Media">
              <FormFieldComponent
                isColumn={true}
                children={
                  <UploadSingleImageComponent
                    value={formData.avatarImage}
                    onChange={(file) => onInputChange("avatarImage", file)}
                    uploadFolder="producttype"
                  />
                }
              />
            </BlockLayoutComponent>
          </Grid>
        }
        childrenRight={
          <Grid container item rowSpacing={2}>
            <BlockLayoutComponent title="Organization">
              <FormFieldComponent
                label="Category"
                isColumn={true}
                children={
                  <FormControl fullWidth>
                    <SelectComponent
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={(value) => onInputChange("categoryId", value)}
                      options={categoryOptionsList}
                      error={!formData.categoryId && formSubmitted}
                      helpertext={
                        !formData.categoryId && formSubmitted ? "*required" : ""
                      }
                    />
                  </FormControl>
                }
              />
            </BlockLayoutComponent>
            <BlockLayoutComponent title="Status">
              <FormFieldComponent
                label="Is Published"
                id="isPublished"
                isColumn={true}
                children={
                  <FormControlLabel
                    control={
                      <SwitchComponent
                        id="isPublished"
                        name="isPublished"
                        value={formData.isPublished}
                        onChange={(value) =>
                          onInputChange("isPublished", value)
                        }
                      />
                    }
                  />
                }
              />
            </BlockLayoutComponent>
          </Grid>
        }
      />
    </Box>
  );
};
