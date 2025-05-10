import { Skeleton, CircularProgress, Typography } from "@mui/material";

export const LoadingElementSmallComponent = () => {
  return (
    <div className="w-100 position-relative">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={100}
        animation="wave"
      />
      <div className="position-absolute d-flex top-0 start-0 w-100 h-100 justify-content-center align-items-center gap-3">
        <CircularProgress color="inherit" size={40} thickness={4} />
        <Typography variant="h5" component={"div"}>
          Loading...
        </Typography>
      </div>
    </div>
  );
};
