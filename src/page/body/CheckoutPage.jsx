import * as React from "react";
import {
  BlockLayoutComponent,
  GridLayoutComponent,
  PageContainerLayout,
} from "../../components/common/Layout";
import { BreadcrumbsComponent } from "../../components/common/UI";
import { Button, Grid } from "@mui/material";
import DeliveryAddress from "../../components/CheckOut/DeliveryAddress";
import {
  LocalMall,
  LocalShippingOutlined,
  PaymentOutlined,
  Place,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import ChangeDeliveryAddress from "../../components/CheckOut/ChangeDeliveryAddress";
import { isEmptyObj } from "../../utils/formatting";
import CartReview from "../../components/CheckOut/CartReview";
import PaymentMethodSelect from "../../components/CheckOut/SelectPaymentMethod";
import ChangeShippingOption from "../../components/CheckOut/ChangeShippingOption";
import BillReview from "../../components/CheckOut/BillReview";
import { useLocation } from "react-router-dom";
import NoteToSeller from "../../components/CheckOut/NoteToSeller";
import useToast from "../../hooks/useNotifications";
import { useCurrentUserApi, useOrderApi } from "../../hooks/api";

const breadcrumbsList = [
  { title: "Home", path: "/", isDisabled: false },
  { title: "Shopping Cart", path: "/shopping-cart", isDisabled: false },
  { title: "Checkout", path: "", isDisabled: true },
];

export const CheckoutPage = () => {
  const { sendMsgInfo } = useToast();
  const location = useLocation();
  const filterValue = location.search;
  let orderStatusUrl = "/order/order-success";

  const { fetchUserAddress } = useCurrentUserApi();
  const {
    currentUserData,
    userAddressData,
    userDefaultAddressData,
    createUserAddressSuccess,
    updateUserAddressSuccess,
    fetchUserAddressPending,
  } = useCurrentUserApi().state;
  const { createOrder, fetchOrderCheckoutInfo } = useOrderApi();
  const {
    fetchCheckoutInfoPending,
    selectedCartData,
    shippingOptions,
    createOrderSuccess,
    createdOrderCode,
    paymentUrl,
    orderBillings,
    selectedShippingOption,
  } = useOrderApi().state;

  const [requestDataObj, setRequestDataObj] = React.useState({
    paymentMethod: "cash-on-delivery",
    shippingOption: null,
    note: "",
  });
  const [selectedFormData, setSelectedFormData] = React.useState({
    selectedDeliveryAddressId: null,
    shippingOption: null,
    note: "",
  });

  const onFormChange = (name, value) => {
    setSelectedFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onDataSubmitChange = (name, value) => {
    setRequestDataObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitPlaceOrder = () => {
    const { selectedDeliveryAddressId, shippingOption, paymentMethod } =
      requestDataObj;
    if (!selectedDeliveryAddressId || !shippingOption || !paymentMethod) {
      sendMsgInfo("Data is loading. Try again!");
      return;
    }
    createOrder(requestDataObj);
  };

  React.useEffect(() => {
    if (userDefaultAddressData) {
      setSelectedFormData((prevState) => ({
        ...prevState,
        selectedDeliveryAddressId: userDefaultAddressData._id,
      }));
      setRequestDataObj((prevState) => ({
        ...prevState,
        selectedDeliveryAddressId: userDefaultAddressData._id,
      }));
    }
  }, [userDefaultAddressData]);
  React.useEffect(() => {
    if (selectedShippingOption) {
      setSelectedFormData((prevState) => ({
        ...prevState,
        shippingOption: selectedShippingOption,
      }));
      setRequestDataObj((prevState) => ({
        ...prevState,
        shippingOption: selectedShippingOption,
      }));
    }
  }, [selectedShippingOption]);
  React.useEffect(() => {
    if (
      currentUserData ||
      createUserAddressSuccess ||
      updateUserAddressSuccess
    ) {
      fetchUserAddress();
    }
  }, [
    currentUserData,
    createUserAddressSuccess,
    updateUserAddressSuccess,
    fetchUserAddress,
  ]);
  React.useEffect(() => {
    if (currentUserData) {
      fetchOrderCheckoutInfo(filterValue);
    }
  }, [currentUserData, filterValue, fetchOrderCheckoutInfo]);
  React.useEffect(() => {
    if (createOrderSuccess && createdOrderCode) {
      if (paymentUrl) {
        window.open(paymentUrl);
      }
      window.location.href = `${orderStatusUrl}/${createdOrderCode}`;
    }
  }, [createOrderSuccess, createdOrderCode, orderStatusUrl, paymentUrl]);

  return (
    <PageContainerLayout>
      <BreadcrumbsComponent breadcrumbList={breadcrumbsList} />
      <GridLayoutComponent
        childrenLeft={
          <Grid container item rowSpacing={2}>
            <BlockLayoutComponent
              title="Delivery Address"
              icon={<Place fontSize="medium" color="error" />}
              rightComponent={
                <ChangeDeliveryAddress
                  options={userAddressData}
                  value={selectedFormData.selectedDeliveryAddressId}
                  onChange={(value) =>
                    onFormChange("selectedDeliveryAddressId", value)
                  }
                  onSubmitChange={(value) =>
                    onDataSubmitChange("selectedDeliveryAddressId", value)
                  }
                  pending={
                    fetchUserAddressPending ||
                    createUserAddressSuccess ||
                    updateUserAddressSuccess
                  }
                />
              }
            >
              <DeliveryAddress
                addressDataList={userAddressData}
                selectedAddressId={requestDataObj?.selectedDeliveryAddressId}
                isDataAvailable={!!requestDataObj.selectedDeliveryAddressId}
                isDefaltAddressUnavailable={isEmptyObj(userDefaultAddressData)}
                isNoAddressAvailable={
                  userAddressData.length === 0 && fetchUserAddressPending
                }
                pending={fetchUserAddressPending}
              />
            </BlockLayoutComponent>
            <BlockLayoutComponent
              title="Shipping Option"
              icon={<LocalShippingOutlined fontSize="medium" color="error" />}
            >
              <ChangeShippingOption
                value={requestDataObj.shippingOption}
                options={shippingOptions}
                selectedValue={selectedFormData.shippingOption}
                onChange={(value) => onFormChange("shippingOption", value)}
                onSubmitChange={(value) =>
                  onDataSubmitChange("shippingOption", value)
                }
                pending={fetchCheckoutInfoPending}
              />
            </BlockLayoutComponent>
            <BlockLayoutComponent
              title="Cart Review"
              icon={<ShoppingBagOutlined fontSize="medium" color="error" />}
            >
              <CartReview
                cartData={selectedCartData}
                pending={fetchCheckoutInfoPending}
              />
            </BlockLayoutComponent>
            <BlockLayoutComponent>
              <NoteToSeller
                value={requestDataObj.note}
                onChange={(value) => onDataSubmitChange("note", value)}
              />
            </BlockLayoutComponent>
          </Grid>
        }
        childrenRight={
          <Grid container item rowSpacing={2}>
            <BlockLayoutComponent
              title="Payment Method"
              icon={<PaymentOutlined fontSize="medium" color="error" />}
            >
              <PaymentMethodSelect
                value={requestDataObj.paymentMethod}
                onChange={(value) => onDataSubmitChange("paymentMethod", value)}
              />
              <BillReview orderBillings={orderBillings} />
            </BlockLayoutComponent>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LocalMall />}
              sx={{
                mt: 3,
                py: 2,
              }}
              onClick={handleSubmitPlaceOrder}
            >
              Submit my order
            </Button>
          </Grid>
        }
      />
    </PageContainerLayout>
  );
};
