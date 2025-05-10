import React from "react";
import { useCustomSearchParams } from "../../../../hooks/useSearchParams";
import SearchDropdownComponent from "./SearchDropdown";

const SearchParamsDropdown = ({
  searchValue = "",
  isSearchOn = false,
  TextFieldProps,
}) => {
  const { setSearchParamsURLWithResetPage, removeSearchParamURL } =
    useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };

  const [searchText, setSearchText] = React.useState(searchValue);

  const onSearchChange = (value) => {
    setSearchText(value);
  };

  const handleSubmitSearch = () => {
    if (searchText.trim() === "") {
      removeSearchParamURL("search");
    } else {
      updateSearchParams({ search: searchText }, 0);
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    removeSearchParamURL("search");
  };
  React.useEffect(() => {
    setSearchText(searchValue);
  }, [searchValue]);

  return (
    <SearchDropdownComponent
      value={searchText}
      onChange={onSearchChange}
      isSearchOn={isSearchOn}
      handleSubmit={handleSubmitSearch}
      handleReset={handleResetSearch}
      TextFieldProps={TextFieldProps}
    />
  );
};
export default SearchParamsDropdown;
