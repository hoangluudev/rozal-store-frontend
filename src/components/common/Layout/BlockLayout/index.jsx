import React from "react";
import { Paper, Box, Grid, Divider, Stack } from "@mui/material";
import { TypographyComponent } from "../../UI";

const BlockLayoutComponent = ({
  title = "",
  icon,
  children,
  rightComponent,
  isVisible = true,
}) => {
  return (
    <Grid
      container
      item
      style={{ display: isVisible === true ? "block" : "none" }}
    >
      <Box
        component={Paper}
        width="100%"
        sx={{
          p: { xs: 1, sm: 1.5 },
        }}
      >
        <Grid container item rowGap={title ? 2 : 0}>
          <Grid item xs={12}>
            {title ? (
              <>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack flexDirection="row" alignItems="center">
                    {icon ? icon : <></>}
                    <TypographyComponent
                      xs={"1rem"}
                      lg={"1.2rem"}
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {title}
                    </TypographyComponent>
                  </Stack>

                  {rightComponent ? rightComponent : <></>}
                </Stack>

                <Divider style={{ width: "100%", opacity: 1 }} />
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid container item xs={12} rowGap={2}>
            {children ? children : <></>}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BlockLayoutComponent;
