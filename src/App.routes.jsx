import { createBrowserRouter } from "react-router-dom";
//  Layout
import { AppLayout } from "./page/Layout/AppLayout";
import { UserLayout } from "./page/Layout/UserLayout";
import { AdminLayout } from "./page/Layout/AdminLayout";
import { SinglePage } from "./components/misc/SinglePage";
import { BlankParentLayout } from "./page/Layout/BlankParentLayout";
//  User
import { HomePageSection } from "./page/body/HomePage";
import { AllProductPage } from "./page/body/AllProducts";
import UserProfilePage from "./page/body/UserProfilePage";
import { UserAccount } from "./components/UserProfile/Profile";
import { UserSecurity } from "./components/UserProfile/Security";
import { Order as UserOrder } from "./components/UserProfile";
import UserAddress from "./components/UserProfile/Address";
import { ShoppingCartPage } from "./page/body/ShoppingCart";
import { CheckoutPage } from "./page/body/CheckoutPage";
import { LoginPage } from "./page/body/Login";
import { SignUpPage } from "./page/body/SignUp";
//  Admin
import { AdminPanelPage } from "./page/body/AdminPanel";
import { AdminDashboard } from "./components/adminpanel/dashboard.component";
import { ManageOrderComponent } from "./components/adminpanel/order.component";
import { ManageProductComponent } from "./components/adminpanel/product.component";
import { ManageCustomerComponent } from "./components/adminpanel/customer.component";

import { CreateCustomerComponent } from "./components/adminpanel/customer_props/CreateCustomer.component";
import { CreateProductComponent } from "./components/adminpanel/product_props/CreateProduct.component";
//  Status
import { PageNotFound } from "./components/misc/404_NotFound.component";
import { AccessForbiddenPage } from "./components/misc/AccessForbidden.component";
//  Protected Routes
import AdminAuthentication from "./components/Auth/adminAuth";
import IsAlreadyLoggedIn from "./components/Auth/signInAuth";
import IsLoggedIn from "./components/Auth/verifySignInAuth";
import { ManageProductAlphaComponent } from "./components/adminpanel/Product/index.component";
import { ManageCategory } from "./components/adminpanel/Category/index.component";
import { CreateCategoryComponent } from "./components/adminpanel/Category/component/CreateCategory.component";
import { EditCategoryComponent } from "./components/adminpanel/Category/component/EditCategory.component";
import { ManageProductType } from "./components/adminpanel/ProductTypes/index.component";
import { CreateProductTypeComponent } from "./components/adminpanel/ProductTypes/component/CreateProductType.component";
import { EditProductTypeComponent } from "./components/adminpanel/ProductTypes/component/EditProductType.component";
import { EditProductAlphaComponent } from "./components/adminpanel/Product/component/EditProduct";
import { CreateProductAlphaComponent } from "./components/adminpanel/Product/component/CreateProduct";
import ViewProductDetail from "./components/adminpanel/Product/component/ViewProductDetail";
import ProductShopPage from "./page/body/ShopPage";
import ProductDetailAlphaPage from "./page/body/ProductDetailAlphaPage";
import OrderSuccessPage from "./page/body/OrderSuccessPage";
import OrderDetail from "./components/UserProfile/components/OrderDetail";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <HomePageSection />,
          },
          {
            path: "products",
            element: <BlankParentLayout />,
            children: [
              {
                path: "",
                element: <AllProductPage />,
              },
            ],
          },
          {
            path: "products-alpha",
            element: <BlankParentLayout />,
            children: [
              {
                path: "",
                element: <ProductShopPage />,
              },
              {
                path: ":productCode",
                element: <ProductDetailAlphaPage />,
              },
            ],
          },
          {
            path: "/shopping-cart",
            element: <IsLoggedIn childComponent={<ShoppingCartPage />} />,
          },
          {
            path: "/user",
            element: <UserProfilePage />,
            children: [
              {
                path: "profile",
                element: <UserAccount />,
              },
              {
                path: "security",
                element: <UserSecurity />,
              },
              {
                path: "order",
                element: <BlankParentLayout />,
                children: [
                  {
                    path: "",
                    element: <UserOrder />,
                  },
                  {
                    path: ":orderCode",
                    element: <OrderDetail />,
                  },
                ],
              },
              {
                path: "address",
                element: <UserAddress />,
              },
              {
                path: "*",
                element: <PageNotFound />,
              },
            ],
          },
          {
            path: "/checkout",
            element: <IsLoggedIn childComponent={<CheckoutPage />} />,
          },
          {
            path: "/order/order-success/:orderCode",
            element: <IsLoggedIn childComponent={<OrderSuccessPage />} />,
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
      {
        path: "/admin-panel",
        element: <AdminAuthentication childComponent={<AdminLayout />} />,
        children: [
          {
            path: "",
            element: <AdminPanelPage />,
            children: [
              {
                path: "dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "order",
                element: <ManageOrderComponent />,
              },
              {
                path: "product",
                element: <BlankParentLayout />,
                children: [
                  {
                    path: "",
                    element: <ManageProductComponent />,
                  },
                  {
                    path: "add-product",
                    element: <CreateProductComponent />,
                  },
                ],
              },
              {
                path: "product-alpha",
                element: <BlankParentLayout />,
                children: [
                  {
                    path: "",
                    element: <ManageProductAlphaComponent />,
                  },
                  {
                    path: "view/id/:productId",
                    element: <ViewProductDetail />,
                  },
                  {
                    path: "edit/id/:productId",
                    element: <EditProductAlphaComponent />,
                  },
                  {
                    path: "add-product-alpha",
                    element: <CreateProductAlphaComponent />,
                  },
                  {
                    path: "categories",
                    element: <BlankParentLayout />,
                    children: [
                      {
                        path: "",
                        element: <ManageCategory />,
                      },
                      {
                        path: "add-category",
                        element: <CreateCategoryComponent />,
                      },
                      {
                        path: "id/:categoryId",
                        element: <EditCategoryComponent />,
                      },
                    ],
                  },
                  {
                    path: "product-types",
                    element: <BlankParentLayout />,
                    children: [
                      {
                        path: "",
                        element: <ManageProductType />,
                      },
                      {
                        path: "add-product-types",
                        element: <CreateProductTypeComponent />,
                      },
                      {
                        path: "id/:productTypeId",
                        element: <EditProductTypeComponent />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "customer",
                element: <ManageCustomerComponent />,
              },
              {
                path: "customer/add-customer",
                element: <CreateCustomerComponent />,
              },
              {
                path: "*",
                element: <PageNotFound />,
              },
            ],
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <IsAlreadyLoggedIn
            childComponent={<SinglePage childComponent={<LoginPage />} />}
          />
        ),
      },
      {
        path: "/sign-up",
        element: (
          <IsAlreadyLoggedIn
            childComponent={<SinglePage childComponent={<SignUpPage />} />}
          />
        ),
      },
      {
        path: "/page-forbidden",
        element: <AccessForbiddenPage />,
      },
    ],
  },
]);
