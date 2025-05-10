import * as React from "react";
import { Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingElementComponent } from "../../misc/LoadingElement.component";
import { ProductNotFoundComponent } from "../../misc/NoProductFound.component";
import { ProductGridCards } from "../../allproducts/product/ProductsGridCard.component";
import { ProductListView } from "./ProductListView.component";
import { ViewList, ViewModule } from "@mui/icons-material";
import { ProductPageNotAvailable } from "../../misc/ProductPageNotAvailable.component";

export const AllProductsComponent = () => {
  const { productLists, fetchProductPending, isPageUnavailable } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );

  const renderProductData = productLists || [];

  const [view, setView] = React.useState("grid");

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };
  const menuTabs = [
    {
      icon: <ViewList />,
      value: "list",
    },
    {
      icon: <ViewModule />,
      value: "grid",
    },
  ];

  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 3 }}>
      <Box sx={{ my: 2, textAlign: "right" }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          size="small"
          onChange={handleViewChange}
          aria-label="view toggle"
          sx={{ mb: 2 }}
        >
          {menuTabs.map((item) => (
            <ToggleButton
              key={item.value}
              value={item.value}
              aria-label={item.value + " view"}
            >
              {item.icon}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container>
        {fetchProductPending ? (
          <LoadingElementComponent />
        ) : isPageUnavailable && renderProductData.length === 0 ? (
          <ProductPageNotAvailable />
        ) : renderProductData.length === 0 ? (
          <ProductNotFoundComponent />
        ) : (
          <Grid container spacing={2} className="g-2 g-md-4">
            {view === "grid"
              ? renderProductData.map((item) => (
                  <ProductGridCards key={item._id} ProductData={item} />
                ))
              : renderProductData.map((item) => (
                  <ProductListView key={item._id} ProductData={item} />
                ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
