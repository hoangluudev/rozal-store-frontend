import * as React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CreateFormInput } from "./props/createForm.component";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../../actions/admin/userManagement.action";
import { Link } from "react-router-dom";

export const CreateCustomerComponent = () => {
  const dispatch = useDispatch();
  const { createCustomerPending } = useSelector(
    (reduxData) => reduxData.USERS_ADMIN_REDUCERS
  );

  const [userFormData, setUserFormData] = React.useState({});
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
    dispatch(createCustomer(userFormData));
  };

  React.useEffect(() => {
    if (createCustomerPending) {
      setUserFormData({});
      setFormSubmitted(false);
    }
  }, [createCustomerPending]);

  return (
    <Paper sx={{ mb: 2 }}>
      <Box style={{ padding: "1rem" }}>
        <Typography
          variant="h4"
          align="center"
          fontSize={{ xs: "1.5rem", md: "2rem" }}
        >
          Create Account
        </Typography>
        <CreateFormInput
          onChange={setUserFormData}
          formSubmitted={formSubmitted}
        />
        <Grid container item xs={12} justifyContent="flex-end" className="mt-5">
          <Link to={"/admin-panel/customer"} style={{ marginRight: "1rem" }}>
            <Button variant="text" color="primary">
              Cancel
            </Button>
          </Link>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};
