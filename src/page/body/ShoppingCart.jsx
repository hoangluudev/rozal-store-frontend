import * as React from "react";
import {
  BlockLayoutComponent,
  PageContainerLayout,
} from "../../components/common/Layout";
import {
  BreadcrumbsComponent,
  PaginationComponent,
} from "../../components/common/UI";
import ShoppingCartSection from "../../components/ShoppingCart";
import CartToolbar from "../../components/ShoppingCart/CartToolbar";
import InactiveCart from "../../components/ShoppingCart/InactiveCart";
import { useShoppingCartApi } from "../../hooks/api";

export const ShoppingCartPage = () => {
  const { selectAllCartItem } = useShoppingCartApi();
  const {
    userCartItems,
    userInactiveCartItems,
    fetchCartItemPending,
    updateCartItemPending,
    deleteCartItemPending,
    totalItemCount,
    itemsPerPage,
    totalPage,
    currentPage,
    selectedCount,
    cartBillings,
  } = useShoppingCartApi().state;

  const breadcrumbsList = [
    {
      title: "Home",
      path: "/",
      isDisabled: false,
    },
    {
      title: "Shopping Cart",
      path: "",
      isDisabled: true,
    },
  ];
  const handleSelectAllChange = (event) => {
    let newValue = event.target.checked;
    selectAllCartItem({ selectAll: newValue });
  };

  return (
    <PageContainerLayout>
      <BreadcrumbsComponent breadcrumbList={breadcrumbsList} />
      <BlockLayoutComponent title="My Shopping Cart">
        <ShoppingCartSection
          cartData={userCartItems}
          totalItemCount={totalItemCount}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectedCount={selectedCount}
          productDetailUrl={"/products-alpha/"}
          pending={
            fetchCartItemPending ||
            updateCartItemPending ||
            deleteCartItemPending
          }
          onSelectAll={handleSelectAllChange}
        />
      </BlockLayoutComponent>
      {!fetchCartItemPending &&
        !updateCartItemPending &&
        !deleteCartItemPending && (
          <>
            <PaginationComponent
              currentPage={currentPage}
              totalPage={totalPage}
              pending={fetchCartItemPending}
              sx={{
                margin: 0,
                p: 2,
              }}
            />
            <BlockLayoutComponent title="Inactive Items">
              <InactiveCart
                cartData={userInactiveCartItems}
                productDetailUrl={"/products-alpha/"}
                pending={fetchCartItemPending}
              />
            </BlockLayoutComponent>
          </>
        )}

      <CartToolbar
        totalItemCount={totalItemCount}
        selectedItemsCount={selectedCount}
        cartBillings={cartBillings}
        onSelectAll={handleSelectAllChange}
        checkOutUrl="/checkout"
      />
    </PageContainerLayout>
  );
};
