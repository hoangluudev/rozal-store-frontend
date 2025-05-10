import { Box, Chip, Grid } from "@mui/material";
import React from "react";

import { AccordionComponent } from "../../../common/UI";
import { CurrencyRangeSlider, RadioButtonSelect } from "../../../common/Input";
import { convertToCurrency } from "../../../../utils/formatting";

const DrawerFilterForm = ({
  filterValue = {},
  onChange = null,
  filterOptionsData,
  handleDeleteFilter,
}) => {
  const onFormChange = (name, value) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Box>
      <AccordionComponent title="Applied Filter" defaultExpanded={true}>
        {filterValue ? (
          <Grid container spacing={1}>
            {Object.keys(filterValue).map((key) => {
              const value = filterValue[key];
              const label = `${
                key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
              }: ${Array.isArray(value) ? value.join(", ") : value}`;
              return (
                <Grid item key={key}>
                  <Chip label={label} onDelete={handleDeleteFilter(key)} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <></>
        )}
      </AccordionComponent>
      <AccordionComponent
        title="Category"
        secondaryTitle={filterValue.category || ""}
      >
        <RadioButtonSelect
          value={filterValue.category || ""}
          onChange={(value) => onFormChange("category", value)}
          options={filterOptionsData.categoryOptions || []}
        />
      </AccordionComponent>
      <AccordionComponent
        title="Brand"
        secondaryTitle={filterValue.brand || ""}
      >
        <RadioButtonSelect
          value={filterValue.brand || ""}
          onChange={(value) => onFormChange("brand", value)}
          options={filterOptionsData?.brandOptions || []}
        />
      </AccordionComponent>
      <AccordionComponent
        title="Gender"
        secondaryTitle={filterValue.gender || ""}
      >
        <RadioButtonSelect
          value={filterValue.gender || ""}
          onChange={(value) => onFormChange("gender", value)}
          options={filterOptionsData?.genderOptions || []}
        />
      </AccordionComponent>
      <AccordionComponent
        title="Price"
        secondaryTitle={
          filterValue.priceFrom && filterValue.priceTo
            ? `${convertToCurrency(
                filterValue.priceFrom
              )} - ${convertToCurrency(filterValue.priceTo)}`
            : filterValue.priceFrom && !filterValue.priceTo
            ? convertToCurrency(filterValue.priceFrom)
            : !filterValue.priceFrom && filterValue.priceTo
            ? convertToCurrency(filterValue.priceTo)
            : ""
        }
      >
        <CurrencyRangeSlider
          valueFrom={filterValue.priceFrom}
          valueTo={filterValue.priceTo}
          min={filterOptionsData?.priceRange?.min || 0}
          max={filterOptionsData?.priceRange?.max || 0}
          onChange={(value) => {
            onFormChange("priceFrom", value[0]);
            onFormChange("priceTo", value[1]);
          }}
        />
      </AccordionComponent>
    </Box>
  );
};

export default DrawerFilterForm;
