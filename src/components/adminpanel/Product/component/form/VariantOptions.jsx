import React from "react";
import {
  Grid,
  FormControlLabel,
  Button,
  Chip,
  createFilterOptions,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  ButtonComponent,
  DividerComponent,
  SwitchComponent,
  TypographyComponent,
} from "../../../../common/UI";
import { AutocompleteComponent } from "../../../../common/Input";
import { DeleteOneConfirmComponent } from "../../../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";
import { FormFieldComponent } from "../../../../common/Layout";

const VariantOptionsComponent = ({
  formData,
  editMode,
  handleAddOption,
  handleUpdateOption,
  handleDeleteOption,
  handleVariantOptionEditMode,
  onInputChange,
}) => {
  const filter = createFilterOptions();
  return (
    <React.Fragment>
      <FormFieldComponent
        label="This product has options, like size or color"
        id="hasVariation"
        isColumn
        children={
          <FormControlLabel
            control={
              <SwitchComponent
                id="hasVariation"
                name="hasVariation"
                value={formData.hasVariation}
                onChange={(value) => {
                  onInputChange("hasVariation", value);
                  if (value === false) {
                    onInputChange("variantOptions", []);
                    onInputChange("variations", []);
                  }
                }}
                isConfirm={formData.variantOptions.length > 0}
                confirmMessage="This action will be delete all your variants!"
              />
            }
          />
        }
      />
      {formData.hasVariation === true &&
        formData.variantOptions.map((option, index) => (
          <Grid
            key={index}
            container
            item
            xs={12}
            alignItems="flex-start"
            rowGap={1}
            p={2}
            style={{ border: "1px solid black" }}
          >
            {editMode[index] ? (
              <>
                <FormFieldComponent
                  label="Option Name"
                  isColumn={true}
                  children={
                    <AutocompleteComponent
                      value={option.optionName}
                      onChange={(event, value) =>
                        handleUpdateOption(index, "optionName", value)
                      }
                      options={["Sizes", "Colours", "Materials", "Styles"]}
                      inputprops={{
                        label: "Option Name",
                        variant: "outlined",
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        if (inputValue !== "" && filtered.length === 0) {
                          return [inputValue];
                        }
                        return filtered;
                      }}
                    />
                  }
                />
                <FormFieldComponent
                  label="Option Values"
                  isColumn={true}
                  children={
                    <AutocompleteComponent
                      multiple
                      options={[]}
                      value={option.optionValues}
                      onChange={(event, value) =>
                        handleUpdateOption(index, "optionValues", value)
                      }
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      inputprops={{
                        label: "Enter to submit a value...",
                        variant: "outlined",
                      }}
                    />
                  }
                />
              </>
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <TypographyComponent style={{ fontWeight: 700 }}>
                    {option.optionName}
                  </TypographyComponent>
                </Grid>
                <Grid container item xs={12}>
                  {option.optionValues.map((val, i) => (
                    <Grid item xs={"auto"} key={i}>
                      <Chip label={val} style={{ margin: "2px" }} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            <DividerComponent />
            <Grid container item alignItems={"center"} gap={1}>
              <Button
                variant="contained"
                color="inherit"
                style={{ fontWeight: 700, textTransform: "capitalize" }}
                size="medium"
                onClick={() => handleVariantOptionEditMode(index)}
              >
                {editMode[index] ? "Done" : "Edit"}
              </Button>
              <DeleteOneConfirmComponent
                handleSubmit={() => handleDeleteOption(index)}
              />
            </Grid>
          </Grid>
        ))}
      {formData.hasVariation === true && (
        <Grid container item xs={12} alignItems="flex-start" rowGap={1}>
          <DividerComponent />
          <ButtonComponent
            variant="text"
            startIcon={<Add />}            
            style={{ alignSelf: "flex-start" }}
            disabled={formData.variantOptions.length === 2}
            disabledMessage={"Maxium variations limit reached."}
            onClick={() => {
              handleAddOption(formData.variantOptions.length);
            }}
          >
            {formData.variantOptions.length === 0
              ? "Add an option"
              : "Add another option"}
          </ButtonComponent>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default VariantOptionsComponent;
