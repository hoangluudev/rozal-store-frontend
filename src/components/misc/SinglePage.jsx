import { Box } from "@mui/material";

export const SinglePage = ({ childComponent }) => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {childComponent}
    </Box>
  );
};
