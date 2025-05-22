import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";
import useOrderManagementApi from "@/hooks/api/useOrderManagementApi";

export const EditOrderModal = ({ selectedOrderData }) => {
  const { updateOrderByID, fetchOrders } = useOrderManagementApi();
  const { currentPage, itemPerPage, updateOrderPending } =
    useOrderManagementApi().state;

  const orderStatusOptions = ["pending", "completed", "canceled"];
  const progressStatusOptions = [
    { status: "Order Confirmed" },
    { status: "Order Packed" },
    { status: "On the Way" },
    { status: "Out for Delivery" },
    { status: "Delivered" },
  ];
  const defaultProgress =
    selectedOrderData.progress &&
    selectedOrderData.progress.map((progress) => progress.status);

  const [openModal, setOpenModal] = React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState("");
  const [progressStatus, setProgressStatus] = React.useState([]);

  const [orderForm, setOrderForm] = React.useState({});

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOrderStatusChange = (event) => {
    const gValue = event.target.value;
    setOrderStatus(gValue);
    setOrderForm((preState) => ({
      ...preState,
      status: gValue,
    }));
  };
  const handleProgressStatusChange = (event) => {
    const gValue = event.target.value;
    setProgressStatus(gValue);
    setOrderForm((preState) => ({
      ...preState,
      progress: gValue,
    }));
  };

  const handleSubmitOrder = () => {
    updateOrderByID(orderForm, selectedOrderData.id);
  };

  React.useEffect(() => {
    if (updateOrderPending) {
      fetchOrders(currentPage, itemPerPage);
      handleCloseModal();
    }
  }, [currentPage, fetchOrders, itemPerPage, updateOrderPending]);
  React.useEffect(() => {
    if (selectedOrderData) {
      setOrderStatus(selectedOrderData.status);
      const gProgressList = selectedOrderData.progress.map(
        (progress) => progress.status
      );
      setProgressStatus(gProgressList);
    }
  }, [selectedOrderData]);
  return (
    <React.Fragment>
      <Button variant="contained" color="info" onClick={handleOpenModal}>
        <EditNote />
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle className="text-center">
          <Typography variant="h5" component={"div"}>
            Edit Order Status
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="order-status">Order Status</InputLabel>
                <Select
                  labelId="order-status"
                  id="order-status-select"
                  value={orderStatus}
                  label="Order Status"
                  onChange={handleOrderStatusChange}
                >
                  {orderStatusOptions.map((status, index) => (
                    <MenuItem key={index} value={status}>
                      <Typography className="text-capitalize">
                        {status}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="progress-status">Progress Status</InputLabel>
                <Select
                  labelId="progress-status"
                  id="progress-status-select"
                  multiple={true}
                  value={progressStatus}
                  label="Progress Status"
                  onChange={handleProgressStatusChange}
                >
                  {progressStatusOptions.map((progress, index) => (
                    <MenuItem
                      disabled={defaultProgress.includes(progress.status)}
                      key={index}
                      value={progress.status}
                    >
                      {progress.status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmitOrder}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
