import { Skeleton } from "@mui/material";

export const PageNotFound = () => {
  return (
    <div className="w-100 position-relative">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={600}
        animation="wave"
      />
      <div className="position-absolute text-center d-flex flex-column top-0 start-0 w-100 h-100 justify-content-center align-items-center">
        <h1 className="fw-bold text-uppercase">404</h1>
        <h2 className="text-uppercase">Page not found</h2>
      </div>
    </div>
  );
};
