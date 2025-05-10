import { Button, Skeleton, Stack, Typography } from "@mui/material";

export const RequireLoginComponent = () => {
  return (
    <div className="w-100 position-relative">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={300}
        animation="wave"
      />
      <div className="position-absolute d-flex flex-column top-0 start-0 w-100 h-100 justify-content-center align-items-center">
        <Stack flexDirection={"column"} alignItems={"center"} rowGap={1}>
          <Typography
            fontSize={{ xs: "12px", sm: "14px" }}
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Please login to use this feature
          </Typography>
          <Button
            href="/login"
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
            }}
          >
            <Typography color={"white"} fontSize={{ xs: "12px", sm: "14px" }}>
              Go to Login
            </Typography>
          </Button>
        </Stack>
      </div>
    </div>
  );
};
