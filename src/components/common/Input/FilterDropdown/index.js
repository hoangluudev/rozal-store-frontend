import React from "react";
import { FilterDropdownComponent } from "./FilterDropdown";
import { useCustomSearchParams } from "../../../../hooks/useSearchParams";

const FilterParamsDropdown = ({
  value = {},
  isFilterOn = false,
  children = null,
}) => {
  const { setSearchParamsURLWithResetPage, resetSearchParamURL } =
    useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };
  const [filterValue, setFilterValue] = React.useState(value);

  const onFilterChange = (value) => {
    setFilterValue(value);
  };
  const handleSubmitFilter = () => {
    updateSearchParams(filterValue, 0);
  };
  const handleResetFilter = () => {
    setFilterValue({});
    resetSearchParamURL();
  };
  return (
    <FilterDropdownComponent
      value={filterValue}
      onChange={onFilterChange}
      isFilterOn={isFilterOn}
      handleSubmit={handleSubmitFilter}
      handleReset={handleResetFilter}
    >
      {children}
    </FilterDropdownComponent>
  );
};
export default FilterParamsDropdown;
