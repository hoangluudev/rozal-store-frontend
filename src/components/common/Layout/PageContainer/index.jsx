import React from "react";
import { Box, Container, Stack } from "@mui/material";

const PageContainerLayout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#eeeeee", py: 4 }}>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Stack display="flex" flexDirection="column" rowGap={1}>
          {children ? children : <></>}
        </Stack>
      </Container>
    </Box>
  );
};

export default PageContainerLayout;
