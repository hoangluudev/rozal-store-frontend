import React from "react";
import { CardMedia, Stack } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";

const CardMediaComponent = ({
  image = "",
  title = "",
  sx = {},
  ...imgProps
}) => {
  return (
    <React.Fragment>
      {image ? (
        <CardMedia
          component={"img"}
          sx={sx}
          image={image}
          title={title}
          {...imgProps}
        />
      ) : (
        <Stack
          sx={sx}
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: "#f2f2f2",
          }}
        >
          <ImageNotSupported fontSize="large" />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default CardMediaComponent;
