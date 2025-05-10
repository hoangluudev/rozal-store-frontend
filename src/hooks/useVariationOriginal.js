import React from "react";

function filterVariations(variations = [], selectedVariant = {}) {
  if (Object.keys(selectedVariant).length === 0) {
    return variations;
  }

  return Object.keys(selectedVariant)?.reduce((accStateVars, currStateVar) => {
    return accStateVars.reduce((accVars, currVar) => {
      const filteredVariantsByName =
        currVar?.variants?.filter(
          (variant) => currStateVar === variant?.name
        ) || [];

      const withSelected = currVar?.variants?.findIndex(
        (variant) => variant?.value === selectedVariant?.[currStateVar]?.value
      );

      return [
        ...accVars,
        {
          variants:
            withSelected >= 0
              ? currVar?.variants || []
              : filteredVariantsByName,
        },
      ];
    }, []);
  }, variations);
}

function formatVariations(filteredVariations = [], variations = []) {
  const defaultSelects = variations?.reduce(
    (accVars, currVar) => ({
      ...accVars,
      ...currVar?.variants?.reduce(
        (accAttrs, currAttr) => ({ ...accAttrs, [currAttr.name]: {} }),
        {}
      ),
    }),
    {}
  );

  return filteredVariations.reduce((accVars, currVar) => {
    const filteredVars = currVar?.variants?.reduce((accAttrs, currAttr) => {
      const exists =
        0 <=
        accVars[currAttr.name]?.options?.findIndex(
          (option) => option.value === currAttr.value
        );

      return {
        ...accAttrs,
        [currAttr.name]: {
          label: currAttr.name,
          options: exists
            ? accVars[currAttr.name]?.options || []
            : [
                ...(accVars[currAttr.name]?.options || []),
                { label: currAttr.value, value: currAttr.value },
              ],
        },
      };
    }, {});
    return { ...accVars, ...filteredVars };
  }, defaultSelects);
}

export function useVariations(product) {
  const [selectedVariant, setSelectedVariant] = React.useState({});
  const filteredVariations = filterVariations(
    product?.variations || [],
    selectedVariant
  );

  const variationOptions = formatVariations(
    filteredVariations,
    product?.variations || []
  );

  return [variationOptions, selectedVariant, setSelectedVariant];
}
