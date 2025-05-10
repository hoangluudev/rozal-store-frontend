import * as React from "react";
import { FormControlLabel, Box, Grid } from "@mui/material";
import {
  BlockLayoutComponent,
  FormFieldComponent,
  GridLayoutComponent,
} from "../../../../common/Layout";
import { SwitchComponent } from "../../../../common/UI";
import {
  TextFieldComponent,
  UploadSingleImageComponent,
} from "../../../../common/Input";

export const CategoryForm = ({ formData, onChange, formSubmitted }) => {
  const onInputChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                    uploadFolder="category"
                  />
                }
              />
            </BlockLayoutComponent>
          </Grid>
        }
        childrenRight={
          <Grid container item rowSpacing={2}>
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
