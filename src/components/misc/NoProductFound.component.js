import { Grid, Skeleton, Typography } from "@mui/material";

export const ProductNotFoundComponent = () => {
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
          <img
            width="150"
            height="150"
            src={require("../../assets/images/noproductfound.png")}
            alt="nothing-found"
          />
          <Typography
            className="fw-bold text-center text-uppercase"
            component={"div"}
            fontSize={{ xs: "20px", sm: "24px" }}
          >
            No products found
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};
