import React from "react";
import { Tabs, Tab, useTheme } from "@mui/material";
import { useCustomSearchParams } from "../../../../../hooks/useSearchParams";

const FilterTab = ({ selectedValue = "all", options = [], tabCount = {} }) => {
  const theme = useTheme();
  const { setSearchParamsURLWithResetPage } = useCustomSearchParams();

  const handleTabChange = (event, newValue) => {
    setSearchParamsURLWithResetPage({ status: newValue }, 1);
  };

  return (
    <Tabs
      value={selectedValue}
      onChange={handleTabChange}
      TabIndicatorProps={{
        sx: {
          backgroundColor: theme.palette.error.main,
        },
      }}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        display: options.length === 0 ? "none" : "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {options.map((tab) => (
        <Tab
          key={tab.value}
          label={`${tab.label}${
            tabCount[tab.value] !== 0 ? ` (${tabCount[tab.value]})` : ""
          }`}
          value={tab.value}
          sx={{
            color: theme.palette.text.primary,
            "&:hover": {
              color: theme.palette.error.main,
            },
            "&.Mui-selected": {
              color: theme.palette.error.main,
              borderBottom: "none",
            },
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
            minWidth: { xs: "max-content", sm: "120px" },
            flex: 1,
            textTransform: "capitalize",
          }}
        />
      ))}
    </Tabs>
  );
};

export default FilterTab;
