import { useSearchParams } from "react-router-dom";
import { searchParamsToObject } from "../utils/helperFunctions";

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamURL = (filterData) => {
    const currentSearch = searchParamsToObject(searchParams);
    const newFilterData = new URLSearchParams({
      ...currentSearch,
      ...filterData,
    });
    setSearchParams(newFilterData);
  };

  const resetSearchParamURL = () => {
    setSearchParams({});
  };
  const resetPageParamURL = (newPage) => {
    const currentSearch = searchParamsToObject(searchParams);
    setSearchParams({ ...currentSearch, page: newPage });
  };

  const removeSearchParamURL = (key) => {
    const currentSearch = searchParamsToObject(searchParams);
    delete currentSearch[key];
    const newSearchParams = new URLSearchParams(currentSearch);
    setSearchParams(newSearchParams);
  };
  const setSearchParamsURLWithResetPage = (newParams, newPage) => {
    const currentSearch = searchParamsToObject(searchParams);
    const newFilterData = new URLSearchParams({
      ...currentSearch,
      ...newParams,
      page: newPage,
    });
    setSearchParams(newFilterData);
  };

  return {
    setSearchParamURL,
    resetSearchParamURL,
    resetPageParamURL,
    removeSearchParamURL,
    setSearchParamsURLWithResetPage,
  };
};
