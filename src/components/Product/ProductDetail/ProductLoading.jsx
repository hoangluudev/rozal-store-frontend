import React from "react";
import { Skeleton, Box, Grid, Stack } from "@mui/material";

const ProductLoading = () => {
  return (
    <Box width="100%" padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Skeleton variant="rounded" width="100%" height={300} />
        </Grid>
        <Grid item xs={12} md={6} lg={8} rowGap={1}>
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="rectangular" width="60%" height={30} />
            <Skeleton variant="rectangular" width="20%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={70} />   
            <Skeleton variant="rounded" width="50%" height={40} />     
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductLoading;
