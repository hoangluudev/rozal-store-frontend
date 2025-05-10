import * as React from "react";
import { styled } from "@mui/material/styles";
import { InputBase, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Search as SearchIcon, Cancel } from "@mui/icons-material";
import { useCustomSearchParams } from "../../../../../hooks/useSearchParams";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#eeeeee",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "0.85rem",
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    "&::placeholder": {
      fontSize: "0.75rem",
      color: theme.palette.text.secondary,
    },
  },
}));

const SearchBar = ({ value = "", isSearchOn = false, pending = false }) => {
  const { setSearchParamsURLWithResetPage, removeSearchParamURL } =
    useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };

  const [searchData, setSearchData] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);

  const onSearchTextChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitSearch();
    }
  };

  const handleSubmitSearch = () => {
    if (searchData.trim() === "") {
      removeSearchParamURL("search");
    } else {
      updateSearchParams({ search: searchData }, 1);
    }
  };

  const handleClearSearch = () => {
    setSearchData("");
    removeSearchParamURL("search");
  };

  React.useEffect(() => {
    setSearchData(value);
  }, [value]);

  return (
    <Search>
      <StyledInputBase
        placeholder="You can search by Order ID or product name"
        onChange={onSearchTextChange}
        onKeyPress={handleKeyPress}
        value={searchData}
        inputProps={{ "aria-label": "search" }}
        disabled={pending}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        startAdornment={
          <InputAdornment position="end">
            <Tooltip title="Search">
              <IconButton onClick={handleSubmitSearch}>
                <SearchIcon
                  color={isFocused || searchData ? "action" : "disabled"}
                />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ display: isSearchOn || searchData ? "flex" : "none" }}
          >
            <IconButton
              aria-label="clear search"
              onClick={handleClearSearch}
              edge="start"
            >
              <Cancel color="error" />
            </IconButton>
          </InputAdornment>
        }
      />
    </Search>
  );
};

export default SearchBar;
