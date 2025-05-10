import React from "react";
import {
  BlockLayoutComponent,
  PageContainerLayout,
} from "../../components/common/Layout";
import { BreadcrumbsComponent } from "../../components/common/UI";
import ProductDetailSection from "../../components/Product/ProductDetail";
import { useParams } from "react-router-dom";
import ProductDescriptionInfo from "../../components/Product/ProductDetail/ProductDescriptionInfo";
import RelatedProducts from "../../components/Product/components/RelatedProducts";
import { Link, Stack, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { LoadingElementComponent } from "../../components/misc/LoadingElement.component";
import { isEmptyObj } from "../../utils/formatting";
import ProductNotFound from "../../components/misc/ProductNotFound";
import { useProductApi } from "../../hooks/api";

const ProductDetailAlphaPage = () => {
  const { fetchProductByCode, fetchRelatedProductsByCode } = useProductApi();
  const { fetchSelectProductPending, selectedProductData, relatedProductList } =
    useProductApi().state;
  const { productCode } = useParams();

  const breadcrumbsList = [
    {
      title: "Home",
      path: "/",
      isDisabled: false,
    },
    {
      title: "All Products",
      path: "/products-alpha",
      isDisabled: false,
    },
    {
      title: selectedProductData?.name ? selectedProductData.name : "N/A",
      path: "/",
      isDisabled: true,
    },
  ];
  React.useEffect(() => {
    fetchProductByCode(productCode);
  }, [fetchProductByCode, productCode]);
  React.useEffect(() => {
    fetchRelatedProductsByCode(productCode);
  }, [fetchRelatedProductsByCode, productCode]);
  return (
    <PageContainerLayout>
      <BreadcrumbsComponent breadcrumbList={breadcrumbsList} />

      {fetchSelectProductPending ? (
        <BlockLayoutComponent>
          <LoadingElementComponent />
        </BlockLayoutComponent>
      ) : isEmptyObj(selectedProductData) ? (
        <BlockLayoutComponent>
          <ProductNotFound />
        </BlockLayoutComponent>
      ) : (
        <>
          <BlockLayoutComponent>
            <ProductDetailSection
              selectedProductData={selectedProductData}
              shoppingCartUrl="/shopping-cart"
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent>
            <ProductDescriptionInfo
              product={selectedProductData}
              shopUrl="/products-alpha"
              browseUrl="/browse-product/search?q="
            />
          </BlockLayoutComponent>
          <BlockLayoutComponent
            title="Related Products"
            rightComponent={
              <Link
                href={`/products-alpha?category=${selectedProductData?.category?.slug}`}
                underline="none"
              >
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Typography
                    fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
                    sx={{ color: "black" }}
                  >
                    See All
                  </Typography>
                  <ArrowForwardIos sx={{ fontSize: "small" }} color="action" />
                </Stack>
              </Link>
            }
          >
            <RelatedProducts
              productList={relatedProductList}
              productDetailUrl={"/products-alpha/"}
            />
          </BlockLayoutComponent>
        </>
      )}
    </PageContainerLayout>
  );
};

export default ProductDetailAlphaPage;
