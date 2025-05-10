import React from "react";
import { Button, Box, Grid, IconButton, Stack } from "@mui/material";
import { ArrowBackIosNew, DeleteForever, Save } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TypographyComponent } from "../../UI";

const NavFormComponent = ({
  title = "Loading...",
  isVisibleDiscard = false,
  isDisabledSaveButton = false,
  backTo = "#",
  onDiscard = null,
  onSubmit = null,
}) => {
  const handleDiscard = () => {
    if (onDiscard) onDiscard();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
  };
  return (
    <Box>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Grid container alignItems={"center"} padding={1}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton
              component={Link}
              to={backTo}
              style={{ border: "1px solid grey", marginRight: "5px" }}
            >
              <ArrowBackIosNew />
            </IconButton>
            <TypographyComponent
              xs={"1rem"}
              lg={"1.2rem"}
              sx={{
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              maxWidth={{ xs: "180px", sm: "300px" }}
            >
              {title}
            </TypographyComponent>
          </Stack>
        </Grid>
        <Grid container justifyContent={"flex-end"} padding={1} spacing={1}>
          {isVisibleDiscard === true ? (
            <Grid item xs={12} sm="auto">
              <Button
                variant="outlined"
                startIcon={<DeleteForever />}
                color="inherit"
                fullWidth
                onClick={() => handleDiscard()}
              >
                Discard
              </Button>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              startIcon={<Save />}
              color="success"
              fullWidth
              onClick={() => handleSubmit()}
              disabled={isDisabledSaveButton}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default NavFormComponent;
