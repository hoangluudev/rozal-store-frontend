import { Skeleton, CircularProgress, Grid, Typography } from "@mui/material";

export const LoadingElementComponent = () => {
  return (
    <Grid
      container
      item
      className="position-relative overflow-hidden"
      sx={{ width: "100%" }}
    >
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
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
        gap={2}
      >
        <CircularProgress color="inherit" size={40} thickness={4} />
        <Typography variant="h5" component={"div"}>
          Loading...
        </Typography>
      </Grid>
    </Grid>
  );
};
