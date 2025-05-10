import { FindInPage } from "@mui/icons-material";
import { Grid, Skeleton, Typography } from "@mui/material";

export const ProductPageNotAvailable = () => {
  return (
    <Grid container item className="position-relative overflow-hidden">
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={300}
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
        <div className="position-absolute d-flex flex-column top-0 start-0 w-100 h-100 justify-content-center align-items-center">
          <FindInPage sx={{ fontSize: 100 }} />
          <Typography
            className="fw-bold text-center text-uppercase"
            component={"div"}
            fontSize={{ xs: "20px", sm: "26px" }}
          >
            This page is not available
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};
