import { Grid } from "@mui/material";
import { useEffect } from "react";
import { LoadingElementComponent } from "../../misc/LoadingElement.component";
import { ProductGridCards } from "../../allproducts/product/ProductsGridCard.component";
import { useProductApi } from "../../../hooks/api";

const LatestProduct = () => {
  const { fetchLatestProducts } = useProductApi();
  const { latestProducts } = useProductApi().state;

  useEffect(() => {
    if (!latestProducts) {
      fetchLatestProducts();
    }
  }, [fetchLatestProducts, latestProducts]);

  return (
    <Grid container spacing={2} className="g-2 g-md-4">
      {latestProducts ? (
        <>
          {latestProducts.map((item) => {
            return <ProductGridCards key={item._id} ProductData={item} />;
          })}
        </>
      ) : (
        <LoadingElementComponent />
      )}
    </Grid>
  );
};

export default LatestProduct;
