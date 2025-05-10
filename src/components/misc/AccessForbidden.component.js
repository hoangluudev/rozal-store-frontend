import { Button, Skeleton } from "@mui/material";

export const AccessForbiddenPage = () => {
  return (
    <div className="w-100 position-relative">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"100vh"}
        animation="wave"
      />
      <div className="position-absolute d-flex flex-column top-0 start-0 w-100 h-100 justify-content-center align-items-center">
        <h1 className="fw-bold text-uppercase">403</h1>
        <h1 className="text-uppercase fw-bold">Forbidden</h1>
        <h5 className="text-uppercase text-center px-4">
          You don't have permissions to access this page.
        </h5>
        <Button
          className="px-5 py-3 mt-4"
          variant="contained"
          color="error"
          href="/"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};
