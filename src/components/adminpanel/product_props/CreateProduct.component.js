import * as React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CreateProductForm } from "./props/createForm.component";
import { useProductManagementApi } from "@/hooks/api";

export const CreateProductComponent = () => {
  const { createNewProduct, fetchProducts } = useProductManagementApi();
  const { createProductResponse, currentPage, itemPerPage } =
    useProductManagementApi().state;

  const [productData, setProductData] = React.useState({
    productStatus: "Draft",
  });

  const [productStatus, setProductStatus] = React.useState("Draft");
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const onProductStatusChange = (event) => {
    let value = event.target.value;
    setProductStatus(value);
    setProductData((prevState) => ({
      ...prevState,
      productStatus: value,
    }));
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    createNewProduct(productData);
  };

  React.useEffect(() => {
    if (createProductResponse) {
      setProductData({ productStatus: "Draft" });
      setProductStatus("Draft");
      setFormSubmitted(false);
    }
  }, [createProductResponse]);

  React.useEffect(() => {
    fetchProducts(currentPage, itemPerPage);
  }, [currentPage, fetchProducts, itemPerPage]);
  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Typography
        variant="h4"
        align="center"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        sx={{ mb: 2 }}
      >
        New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CreateProductForm
            onChange={setProductData}
            formSubmitted={formSubmitted}
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Save as</InputLabel>
            <Select
              value={productStatus}
              label="Product Status"
              onChange={onProductStatusChange}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
              <MenuItem value={"Draft"}>Draft</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Link to={"/admin-panel/product"} style={{ textDecoration: "none" }}>
            <Button variant="text" color="primary">
              Back
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
