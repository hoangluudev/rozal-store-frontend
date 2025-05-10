import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateProductByID } from "../../../actions/admin/productManagement.action";
import { EditProductForm } from "./props/editForm.component";

export const EditProductModal = ({ selectedProductData }) => {
  const dispatch = useDispatch();
  const { updateProductPending } = useSelector(
    (reduxData) => reduxData.PRODUCTS_ADMIN_REDUCERS
  );
  const gSelectedProduct = selectedProductData || {};
  const [openModal, setOpenModal] = React.useState(false);
  const [productData, setProductData] = React.useState({});

  const [productStatus, setProductStatus] = React.useState("Draft");
  const onProductStatusChange = (event) => {
    let value = event.target.value;
    setProductStatus(value);
    setProductData((prevState) => ({
      ...prevState,
      productStatus: value,
    }));
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    dispatch(updateProductByID(productData, gSelectedProduct.id));
  };

  React.useEffect(() => {
    if (updateProductPending) {
      handleCloseModal();
    }
  }, [dispatch, updateProductPending]);

  React.useEffect(() => {
    if (selectedProductData) {
      setProductStatus(gSelectedProduct.productStatus);
      setProductData((prevState) => ({
        ...prevState,
        productStatus: gSelectedProduct.productStatus,
      }));
    }
  }, [gSelectedProduct.productStatus, selectedProductData]);
  return (
    <React.Fragment>
      <Button variant="contained" color="info" onClick={handleClickOpenModal}>
        <EditNote />
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle className="text-center">
          <Typography variant="h5" component={"div"}>
            Edit Product
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EditProductForm
                onChange={setProductData}
                selectedProductData={gSelectedProduct}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <FormControl size="small">
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
          <Button variant="text" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
