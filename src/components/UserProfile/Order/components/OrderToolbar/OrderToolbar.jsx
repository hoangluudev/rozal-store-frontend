import React from "react";
import { Box, Stack } from "@mui/material";
import FilterTab from "./FilterTab";
import SearchBar from "./SearchBar";

const OrderToolbar = ({ data, pending = false }) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
      }}
    >
      <Stack
        flexDirection="column"
        rowGap={2}
        sx={{
          width: "100%",
        }}
      >
        <FilterTab
          selectedValue={data?.filterValue?.status}
          options={data?.tabOptions}
          tabCount={data?.tabCount}
        />
        {data?.filterValue?.status === "all" ? (
          <SearchBar
            value={data?.filterValue?.search}
            isSearchOn={data?.isSearchOn}
            pending={pending}
          />
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};

export default OrderToolbar;
