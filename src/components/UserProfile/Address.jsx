import React from "react";
import { TitleBlockLayout } from "../common/Layout";
import AddAddressDropdown from "./components/AddAddressDialog";
import { AddressEmpty } from "../misc/EmptyAddress.component";
import { LoadingElementComponent } from "../misc/LoadingElement.component";
import { Grid } from "@mui/material";
import AddressCard from "./components/AddressCard";
import { useCurrentUserApi } from "../../hooks/api";

const UserAddress = () => {
  const { fetchUserAddress, updateUserAddress, deleteUserAddress } =
    useCurrentUserApi();
  const {
    currentUserData,
    fetchUserAddressPending,
    createUserAddressPending,
    updateUserAddressPending,
    deleteUserAddressPending,
    userAddressData,
  } = useCurrentUserApi().state;

  const handleDefaultChange = (addressId, value) => {
    updateUserAddress(addressId, {
      isDefault: value,
    });
  };
  const handleDelete = (paramId) => {
    deleteUserAddress(paramId);
  };
  React.useEffect(() => {
    if (
      currentUserData ||
      createUserAddressPending ||
      updateUserAddressPending ||
      deleteUserAddressPending
    ) {
      fetchUserAddress();
    }
  }, [
    currentUserData,
    createUserAddressPending,
    updateUserAddressPending,
    deleteUserAddressPending,
    fetchUserAddress,
  ]);
  return (
    <React.Fragment>
      <TitleBlockLayout
        primary="My Addresses"
        rightComponent={<AddAddressDropdown />}
      >
        {fetchUserAddressPending ? (
          <LoadingElementComponent />
        ) : userAddressData.length > 0 ? (
          <Grid container rowGap={2}>
            {userAddressData.map((address, index) => (
              <Grid item xs={12} key={index}>
                <AddressCard
                  addressData={address}
                  handleSetDefault={handleDefaultChange}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <AddressEmpty />
        )}
      </TitleBlockLayout>
    </React.Fragment>
  );
};

export default UserAddress;
