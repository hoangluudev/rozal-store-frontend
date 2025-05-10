import { ImageNotSupported } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

const AvatarComponent = ({ src = "", sx = {}, variant = "square" }) => {
  return (
    <React.Fragment>
      {src ? (
        <Avatar
          src={src}
          variant={variant}
          sx={sx}
          style={{
            background: "transparent",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        />
      ) : (
        <Avatar
          src={src}
          variant={variant}
          sx={sx}
          style={{
            background: "transparent",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <ImageNotSupported color="action" />
        </Avatar>
      )}
    </React.Fragment>
  );
};

export default AvatarComponent;
