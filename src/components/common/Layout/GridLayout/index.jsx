import { Box, Grid } from "@mui/material";

const GridLayoutComponent = ({
  childrenLeft,
  childrenRight,
  isMainContentRight = false,
}) => {
  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} sm={isMainContentRight === true ? 4 : 8}>
        <Box>{childrenLeft ? childrenLeft : <></>}</Box>
      </Grid>
      <Grid item xs={12} sm={isMainContentRight === true ? 8 : 4}>
        <Box>{childrenRight ? childrenRight : <></>}</Box>
      </Grid>
    </Grid>
  );
};

export default GridLayoutComponent;
