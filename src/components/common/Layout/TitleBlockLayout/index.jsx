import React from "react";
import { Paper, Box, Grid, Stack } from "@mui/material";
import { DividerComponent, TypographyComponent } from "../../UI";

const TitleBlockLayout = ({
  primary = "",
  secondary = "",
  rightComponent,
  children,
}) => {
  return (
    <Box
      component={Paper}
      width="100%"
      sx={{
        p: { xs: 1, sm: 1.5 },
      }}
    >
      <Grid container item rowGap={primary ? 2 : 0}>
        <Grid item xs={12}>
          {primary ? (
            <>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>
                  <TypographyComponent
                    xs={"14px"}
                    lg={"18px"}
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {primary}
                  </TypographyComponent>
                  {secondary && (
                    <TypographyComponent
                      xs={"10px"}
                      lg={"12px"}
                      sx={{
                        fontWeight: 500,
                        color: "text.secondary",
                      }}
                    >
                      {secondary}
                    </TypographyComponent>
                  )}
                </Box>

                {rightComponent ? rightComponent : <></>}
              </Stack>

              <DividerComponent />
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
  );
};

export default TitleBlockLayout;
