import * as React from "react";
import {
  Grid,
  FormControlLabel,
  FormControl,
  InputLabel,
  createFilterOptions,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import useToast from "../../../../../hooks/useNotifications";
import { SwitchComponent } from "../../../../common/UI";
import {
  TextFieldComponent,
  UploadMultipleImagesComponent,
  UploadSingleImageComponent,
  SelectComponent,
  AutocompleteComponent,
  NumbericTextFieldComponent,
  RichTextEditorComponent,
  GroupedSelectComponent,
} from "../../../../common/Input";
import VariantsTableComponent from "./Variants";
import VariantOptionsComponent from "./VariantOptions";
import {
  BlockLayoutComponent,
  FormFieldComponent,
  GridLayoutComponent,
} from "../../../../common/Layout";

export const ProductForm = ({ formData, onChange, formSubmitted }) => {
  const { sendMsgInfo } = useToast();
  const filter = createFilterOptions();
  const { productTypeOptions, brandLists, genderOptions, statusOptions } =
    useSelector((reduxData) => reduxData.PRODUCT_ALPHA_ADMIN_REDUCERS);
  const [selectedVariants, setSelectedVariants] = React.useState([]);
  const onInputChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [editMode, setEditMode] = React.useState({});

  const generateVariants = (variantOptions) => {
    let updatedVariations = [];

    const combineVariants = (options, index = 0, current = []) => {
      if (index === options.length) {
        updatedVariations.push({
          image: "",
          price: formData?.prices?.price || 0,
          comparePrice: formData?.prices?.comparePrice || 0,
          quantity: 0,
          sku: "",
          variants: current,
        });
        return;
      }

      const option = options[index];
      option.optionValues.forEach((value) => {
        combineVariants(
          options,
          index + 1,
          current.concat({ name: option.optionName, value: value })
        );
      });
    };

    if (variantOptions.length > 0) {
      combineVariants(variantOptions);
    }
    onChange((prevState) => ({
      ...prevState,
      variations: updatedVariations,
    }));
  };

  const handleAddVariantOption = (index) => {
    onChange((prevState) => ({
      ...prevState,
      variantOptions: [
        ...(prevState.variantOptions || []),
        { optionName: "", optionValues: [] },
      ],
    }));
    setEditMode((prev) => ({ ...prev, [index]: true }));
  };
  const handleUpdateVariantOption = (index, field, value) => {
    const updatedVariantOptions = (formData.variantOptions || []).map(
      (option, i) => (i === index ? { ...option, [field]: value } : option)
    );
    onChange((prevState) => ({
      ...prevState,
      variantOptions: updatedVariantOptions,
    }));
  };
  const handleDeleteVariantOption = (index) => {
    const updatedVariantOptions = [...formData.variantOptions];
    updatedVariantOptions.splice(index, 1);
    onChange((prevState) => ({
      ...prevState,
      variantOptions: updatedVariantOptions,
    }));
    generateVariants(updatedVariantOptions);
    const updatedEditMode = {};
    Object.keys(editMode).forEach((key) => {
      const keyIndex = parseInt(key, 10);
      if (keyIndex < index) {
        updatedEditMode[keyIndex] = editMode[keyIndex];
      } else if (keyIndex > index) {
        updatedEditMode[keyIndex - 1] = editMode[keyIndex];
      }
    });
    setEditMode(updatedEditMode);
    setSelectedVariants([]);
  };

  const handleVariantOptionEditMode = (index) => {
    if (editMode[index] === true) {
      if (formData.variantOptions[index].optionName === "") {
        sendMsgInfo("Please name the option before clicking Done.");
        return;
      } else if (formData.variantOptions[index].optionValues.length === 0) {
        sendMsgInfo("Please add option values before clicking Done.");
        return;
      }
    }
    setEditMode((prev) => ({ ...prev, [index]: !prev[index] }));
    generateVariants(formData.variantOptions);
    setSelectedVariants([]);
  };
  return (
    <GridLayoutComponent
      childrenLeft={
        <Grid container item rowSpacing={2}>
          <BlockLayoutComponent>
            <FormFieldComponent
              label="Name"
              id="product-name"
              isColumn={true}
              children={
                <TextFieldComponent
                  fullWidth
                  id="product-name"
                  name="product-name"
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
                <RichTextEditorComponent
                  value={formData.description}
                  onChange={(value) => onInputChange("description", value)}
                  limit={1000}
                />
              }
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent title="Media">
            <FormFieldComponent
              label="Avatar Image"
              isColumn={true}
              children={
                <UploadSingleImageComponent
                  onChange={(file) => onInputChange("avatarImage", file)}
                  value={formData.avatarImage}
                  uploadFolder="product"
                />
              }
            />
            <FormFieldComponent
              label="Gallery"
              isColumn={true}
              children={
                <UploadMultipleImagesComponent
                  onChange={(file) => onInputChange("images", file)}
                  value={formData.images}
                  uploadFolder="product"
                  maxFiles={6}
                />
              }
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent title="Pricing">
            <FormFieldComponent
              label="Price"
              id="product-price"
              isColumn={true}
              children={
                <NumbericTextFieldComponent
                  value={formData.prices.price}
                  onChange={(value) =>
                    onInputChange("prices", {
                      ...formData.prices,
                      price: value,
                    })
                  }
                  fullWidth
                  isCurrency={true}
                  id="product-price"
                  name="product-price"
                  disabled={formData.hasVariation === true}
                  error={
                    !formData.prices.price &&
                    !formData.hasVariation &&
                    formSubmitted
                  }
                  helperText={
                    !formData.prices.price &&
                    !formData.hasVariation &&
                    formSubmitted
                      ? "*required"
                      : ""
                  }
                />
              }
            />
            <FormFieldComponent
              label="Compare Price"
              id="comparePrice"
              isColumn={true}
              children={
                <NumbericTextFieldComponent
                  value={formData.prices.comparePrice}
                  onChange={(value) =>
                    onInputChange("prices", {
                      ...formData.prices,
                      comparePrice: value,
                    })
                  }
                  fullWidth
                  isCurrency={true}
                  disabled={formData.hasVariation === true}
                  id="comparePrice"
                  name="comparePrice"
                />
              }
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent title="Inventory">
            <FormFieldComponent
              label="Quantity"
              id="product-stock"
              isColumn={true}
              children={
                <NumbericTextFieldComponent
                  value={formData.stock}
                  onChange={(value) => onInputChange("stock", value)}
                  fullWidth
                  id="product-stock"
                  label="Available"
                  name="product-stock"
                  disabled={formData.hasVariation === true}
                  error={
                    !formData.stock && !formData.hasVariation && formSubmitted
                  }
                  helperText={
                    !formData.stock && !formData.hasVariation && formSubmitted
                      ? "*required"
                      : ""
                  }
                />
              }
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent title="Options">
            <VariantOptionsComponent
              formData={formData}
              editMode={editMode}
              handleAddOption={handleAddVariantOption}
              handleUpdateOption={handleUpdateVariantOption}
              handleDeleteOption={handleDeleteVariantOption}
              handleVariantOptionEditMode={handleVariantOptionEditMode}
              onInputChange={onInputChange}
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent
            title="Variants"
            isVisible={formData.variations.length > 0 ? true : false}
          >
            <VariantsTableComponent
              variations={formData.variations}
              onChange={(variantValues) =>
                onInputChange("variations", variantValues)
              }
              uploadedImages={[formData.avatarImage, ...formData.images]}
              formSubmitted={formSubmitted}
              selectedCell={selectedVariants}
              setSelectedCell={setSelectedVariants}
            />
          </BlockLayoutComponent>
        </Grid>
      }
      childrenRight={
        <Grid container item rowSpacing={2}>
          <BlockLayoutComponent title="Product Status">
            <FormFieldComponent
              label="Status"
              isColumn={true}
              children={
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <SelectComponent
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={(value) => onInputChange("status", value)}
                    options={statusOptions}
                  />
                </FormControl>
              }
            />
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
                      onChange={(value) => onInputChange("isPublished", value)}
                    />
                  }
                />
              }
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent title="Organization">
            <FormFieldComponent
              label="Product Type"
              isColumn={true}
              children={
                <FormControl fullWidth>
                  <InputLabel>Product Type</InputLabel>
                  <GroupedSelectComponent
                    label="Product Type"
                    name="productType"
                    value={formData.productType}
                    onChange={(value) => onInputChange("productType", value)}
                    options={productTypeOptions}
                    error={!formData.productType && formSubmitted}
                    helpertext={
                      !formData.productType && formSubmitted ? "*required" : ""
                    }
                  />
                </FormControl>
              }
            />
            <FormFieldComponent
              label="Brand"
              isColumn={true}
              children={
                <AutocompleteComponent
                  value={formData.brand}
                  onChange={(event, value) => onInputChange("brand", value)}
                  options={brandLists}
                  inputprops={{
                    label: "Brand",
                    variant: "outlined",
                    error: !formData.brand && formSubmitted,
                    helperText:
                      !formData.brand && formSubmitted ? "*required" : "",
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
              label="Gender"
              isColumn={true}
              children={
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <SelectComponent
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(value) => onInputChange("gender", value)}
                    options={genderOptions}
                    error={!formData.gender && formSubmitted}
                    helpertext={
                      !formData.gender && formSubmitted ? "*required" : ""
                    }
                  />
                </FormControl>
              }
            />
            <FormFieldComponent
              label="Tags"
              isColumn={true}
              children={
                <AutocompleteComponent
                  multiple
                  options={[]}
                  value={formData.tags}
                  onChange={(event, value) =>
                    onInputChange("tags", value ? value : "")
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
                    label: "Enter to submit a tag...",
                    variant: "outlined",
                  }}
                />
              }
            />
          </BlockLayoutComponent>
        </Grid>
      }
    />
  );
};
