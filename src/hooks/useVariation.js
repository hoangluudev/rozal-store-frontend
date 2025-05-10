import React from "react";

const getVariantOptions = (product, selectedVariant) => {
  if (!product || !product.variantOptions) {
    return {};
  }

  const defaultVariantOptions = product.variantOptions.reduce(
    (accVarOptions, currVarOption) => {
      if (!accVarOptions[currVarOption.optionName]) {
        accVarOptions[currVarOption.optionName] = {
          label: currVarOption.optionName,
          options: [],
        };
      }

      currVarOption.optionValues?.forEach((currOption) => {
        const option = {
          label: currOption,
          value: currOption,
          disabled: false,
          disabled_reason: "",
        };

        accVarOptions[currVarOption.optionName].options.push(option);
      });

      return accVarOptions;
    },
    {}
  );

  const variantOptionKeys = Object.keys(defaultVariantOptions);
  const hasSingleVariantOption = variantOptionKeys.length === 1;
  if (hasSingleVariantOption) {
    const optionKey = variantOptionKeys[0];
    defaultVariantOptions[optionKey].options = defaultVariantOptions[
      optionKey
    ].options.map((option) => {
      let isOutOfStock = false;
      const isAvailable = product.variations?.some((variation) => {
        isOutOfStock = variation.quantity === 0;
        return variation.variants.some(
          (variant) => variant.value === option.value
        );
      });
      return {
        ...option,
        disabled: !isAvailable || isOutOfStock,
        disabled_reason: !isAvailable
          ? "This variant is unavailable"
          : isOutOfStock
          ? "This variant is out of stock"
          : "",
      };
    });
  }
  if (Object.keys(selectedVariant).length === 0) {
    return defaultVariantOptions;
  }

  Object.keys(selectedVariant).forEach((selectedKey) => {
    const selectedValue = selectedVariant[selectedKey]?.value;

    Object.keys(defaultVariantOptions).forEach((optionKey) => {
      if (optionKey !== selectedKey) {
        defaultVariantOptions[optionKey].options = defaultVariantOptions[
          optionKey
        ].options.map((option) => {
          let isOutOfStock = false;
          const isAvailable = product.variations?.some((variation) => {
            isOutOfStock = variation.quantity === 0;
            return variation.variants.some((variant) => {
              return (
                variant.value === option.value &&
                variation.variants.some((v) => v.value === selectedValue)
              );
            });
          });
          return {
            ...option,
            disabled: !isAvailable || isOutOfStock,
            disabled_reason: !isAvailable
              ? "This variant is unavailable"
              : isOutOfStock
              ? "This variant is out of stock"
              : "",
          };
        });
      }
    });
  });

  return defaultVariantOptions;
};

export function useVariations(product) {
  const [selectedVariant, setSelectedVariant] = React.useState({});

  const variationOptions = getVariantOptions(product, selectedVariant);

  return [variationOptions, selectedVariant, setSelectedVariant];
}
