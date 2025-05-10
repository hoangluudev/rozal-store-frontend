import { Grid, Skeleton, Typography } from "@mui/material";

export const NoDataComponent = () => {
  return (
    <Grid container item className="position-relative overflow-hidden">
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={100}
          animation="wave"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        className="position-absolute h-100"
      >
        <Typography
          className="fw-bold text-center text-uppercase"
          component={"div"}
          fontSize={"16px"}
        >
          No data
        </Typography>
      </Grid>
    </Grid>
  );
};
