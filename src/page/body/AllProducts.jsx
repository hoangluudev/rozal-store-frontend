import { Breadcrumb } from "react-bootstrap";
import AllProductSection from "../../components/allproducts/allproductsection.component";

export const AllProductPage = () => {
  return (
    <div className="products-page">
      <div className="container py-5">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>All Products</Breadcrumb.Item>
        </Breadcrumb>
        <div className="products">
          <AllProductSection />
        </div>
      </div>
    </div>
  );
};
