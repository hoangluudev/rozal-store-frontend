import { Button, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { AvatarComponent, LinkComponent } from "../../common/UI";
import { DeleteOneConfirmComponent } from "../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";

const InactiveCartItemMobile = ({
  cartData = [],
  productDetailUrl,
  onDelete = null,
  pending = false,
}) => {
  return (
    <React.Fragment>
      <Stack flexDirection="column" rowGap={2}>
        {cartData &&
          cartData.map((item) => (
            <Stack
              key={item._id}
              flexDirection="row"
              alignItems="flex-start"
              columnGap={1}
              sx={{
                border: "1px solid #ddd",
                p: { xs: 1, sm: 2 },
              }}
            >
              <Box
                position="relative"
                sx={{ width: "min-content", height: "auto" }}
              >
                <AvatarComponent
                  src={item.image}
                  sx={{ width: 80, height: 80 }}
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  alignItems="flex-end"
                >
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      fontSize: "10px",
                      p: "4px",
                    }}
                  >
                    {item.status}
                  </Typography>
                </Box>
              </Box>

              <Stack
                width="100%"
                flexDirection="column"
                sx={{
                  opacity: 0.3,
                }}
              >
                <LinkComponent to={productDetailUrl + item?.productCode}>
                  <Typography
                    fontSize={{ xs: "12px", sm: "16px" }}
                    fontWeight={600}
                  >
                    {item.name}
                  </Typography>
                </LinkComponent>
                {item.variants.length > 0 ? (
                  <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    sx={{
                      minWidth: "auto",
                      width: "max-content",
                      padding: 0,
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        textAlign: "left",
                        color: "text.secondary",
                        textTransform: "none",
                      }}
                      fontSize="10px"
                    >
                      {item.variants.map((variant) => variant.value).join(", ")}
                    </Typography>
                  </Button>
                ) : (
                  <></>
                )}

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "text.secondary",
                  }}
                >
                  Unavailable
                </Typography>
              </Stack>
              <DeleteOneConfirmComponent
                handleSubmit={() => onDelete(item._id)}
                pending={pending}
              />
            </Stack>
          ))}
      </Stack>
    </React.Fragment>
  );
};

export default InactiveCartItemMobile;
