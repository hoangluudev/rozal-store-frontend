import { Grid } from "@mui/material";
import { useEffect } from "react";
import { LoadingElementComponent } from "../../misc/LoadingElement.component";
import { ProductGridCards } from "../../allproducts/product/ProductsGridCard.component";
import { useProductApi } from "../../../hooks/api";

const FeaturedProduct = () => {
  const { fetchFeaturedProducts } = useProductApi();
  const { featuredProducts } = useProductApi().state;

  useEffect(() => {
    if (!featuredProducts) {
      fetchFeaturedProducts();
    }
  }, [featuredProducts, fetchFeaturedProducts]);
  return (
    <Grid container spacing={2} className="g-2 g-md-4">
      {featuredProducts ? (
        <>
          {featuredProducts.map((item) => {
            return <ProductGridCards key={item._id} ProductData={item} />;
          })}
        </>
      ) : (
        <LoadingElementComponent />
      )}
    </Grid>
  );
};
export default FeaturedProduct;
