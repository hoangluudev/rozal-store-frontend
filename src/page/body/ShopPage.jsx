import React from "react";
import {
  BlockLayoutComponent,
  PageContainerLayout,
} from "../../components/common/Layout";
import { BreadcrumbsComponent } from "../../components/common/UI";
import ShopProductSection from "../../components/Product/ShopProduct";

const ProductShopPage = () => {
  const breadcrumbsList = [
    {
      title: "Home",
      path: "/",
      isActive: false,
    },
    {
      title: "All Products",
      path: "/",
      isActive: true,
    },
  ];
  return (
    <PageContainerLayout>
      <BreadcrumbsComponent breadcrumbList={breadcrumbsList} />
      <BlockLayoutComponent>
        <ShopProductSection />
      </BlockLayoutComponent>
    </PageContainerLayout>
  );
};

export default ProductShopPage;
